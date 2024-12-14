import { useEffect, useState, useRef } from "react";
import { View, Alert, Modal, StatusBar, ScrollView } from "react-native";
import { router, useLocalSearchParams, Redirect } from "expo-router"
import { useCameraPermissions, CameraView } from "expo-camera"

import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";
import { Button } from "@/components/button";

import { api } from "@/services/api";
import { LightSpeedInLeft } from "react-native-reanimated";

type DataProps = PropsDetails & {
  cover: string
}

export default function Market() {

  const [data, setData] = useState<DataProps>()
  const [coupon, setCoupon] = useState<string | null>(null)
  const [isloading, setIsLoading] = useState(true)
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
  const [couponIsFetching, setCouponIsFetching] = useState(false)

  const [permission, requestPermission] = useCameraPermissions()
  const params = useLocalSearchParams<{ id: string }>()

  const qrLock = useRef(false)
  console.log(params.id)

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`)
      setData(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      Alert.alert("Market", "Unable to load market data", [
        { text: "OK", onPress: () => router.back() },
      ])
    }
  }

  async function handleOpenCamera() {
    try {
      const {granted} = await requestPermission()

      if (!granted) {
        return Alert.alert("Camera Permission", "Camera access is currently restricted")
      }

      qrLock.current = false

      setIsVisibleCameraModal(true)
    } catch (error) {
      console.log(error)
      Alert.alert("Camera", "Unable to scan QR Code")
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true)

      const { data } = await api.patch("/coupons/" + id)

      Alert.alert("Coupon", data.coupon)

    } catch (error) {
      console.log(error)
      Alert.alert("Error", "Unable to use coupon")
    } finally {
      setCouponIsFetching(false)
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false)

    Alert.alert("Coupon", "Coupon already redeemed", [
      { style: "cancel", text: "Cancel" },
      { text: "Continue", onPress: () => getCoupon(id) },
    ])
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id, coupon])

  if (isloading) {
    return <Loading />
  }

  if (!data) {
    return <Redirect href="/home" />
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} hidden={isVisibleCameraModal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={data.cover} />
        <Details data={data} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>
            Scan QR Code
          </Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true
              setTimeout(() => handleUseCoupon(data), 500)
            }
          }}
        />

        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button onPress={() => setIsVisibleCameraModal(false)} isLoading={couponIsFetching}>
            <Button.Title>Back</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}