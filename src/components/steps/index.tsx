import { View, Text } from "react-native"
import { styles } from "./styles"

import { Step } from "../step"
import { IconMapPin, IconQrcode, IconTicket } from "@tabler/icons-react-native"

export function Steps() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How it works:</Text>
      <Step icon={IconMapPin} title="Find establishments" description="See places near you that are Nearby partners" />
      <Step icon={IconQrcode} title="Activate the coupon with QR Code" description="Scan the code at the establishment to use the benefit" />
      <Step icon={IconTicket} title="Get benefits near you" description="Activate coupons wherever you are, in different types of establishments"/>
    </View>
  )
}