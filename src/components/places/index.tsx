import { useRef } from "react"
import { Text, useWindowDimensions } from "react-native"
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet"

import { Place, PlaceProps } from "../place";

type Props = {
  data: PlaceProps[]
}

export function Places({ data }: Props) {
  const dimentions = useWindowDimensions()
  const bottomSheetRef = useRef<BottomSheet>(null)

  return (
    <BottomSheet>
      <BottomSheetFlatList 
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Place data={item} />}
      />
    </BottomSheet>
  )
}