import { useRef } from "react";
import { Text, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { IPlace } from "@/types/place";

import Place from "../place";
import { Props } from "./types";
import { styles } from "./styles";

export default function Places({ data }: Props) {
	const dimensions = useWindowDimensions();
	const bottomSheetRef = useRef<BottomSheet>(null);

	const snapPoints = { min: 278, max: dimensions.height - 128 };

	function _keyExtractor(item: IPlace) {
		return item.id;
	}

	function _renderItem({ item }: { item: IPlace }) {
		return (
			<Place
				data={item}
				onPress={() => router.navigate(`/market/${item.id}`)}
			/>
		);
	}

	function _renderHeader() {
		return <Text style={styles.title}>Explore locais perto de você</Text>;
	}

	return (
		<BottomSheet
			ref={bottomSheetRef}
			snapPoints={[snapPoints.min, snapPoints.max]}
			handleIndicatorStyle={styles.indicator}
			backgroundStyle={styles.container}
			enableOverDrag={false}
		>
			<BottomSheetFlatList
				data={data}
				keyExtractor={_keyExtractor}
				renderItem={_renderItem}
				ListHeaderComponent={_renderHeader}
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
			/>
		</BottomSheet>
	);
}
