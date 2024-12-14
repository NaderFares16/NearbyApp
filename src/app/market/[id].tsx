import { useEffect, useState } from "react";
import { View, Alert, Modal } from "react-native";
import { router, useLocalSearchParams, Redirect } from "expo-router"

import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";
import { Button } from "@/components/button";

import { api } from "@/services/api";

type DataProps = PropsDetails & {
  cover: string
}

export default function Market() {

  const [data, setData] = useState<DataProps>()
  const [coupon, setCoupon] = useState<string | null>(null)
  const [isloading, setIsLoading] = useState(true)
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)

  const params = useLocalSearchParams<{ id: string }>()

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

  function handleOpenCamera() {
    try {
      setIsVisibleCameraModal(true)
    } catch (error) {
      console.log(error)
      Alert.alert("Camera", "Unable to scan QR Code")
    }
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id])

  if (isloading) {
    return <Loading />
  }

  if (!data) {
    return <Redirect href="/home" />
  }

  return (
    <View style={{ flex: 1 }}>
      <Cover uri={data.cover} />
      <Details data={data} />
      {coupon && <Coupon code={coupon} />}

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>
            Scan QR Code
          </Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Button onPress={() => setIsVisibleCameraModal(false)}>
            <Button.Title>Back</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}