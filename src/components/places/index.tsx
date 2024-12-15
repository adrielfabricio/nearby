import { useRef } from "react";
import { Text, useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { IPlace } from "@/types/place";
import { Props } from "./types";
import Place from "../place";
import { styles } from "./styles";

export default function Places({ data }: Props) {
	const dimensions = useWindowDimensions();
	const bottomSheetRef = useRef<BottomSheet>(null);

	const snapPoints = { min: 278, max: dimensions.height - 128 };

	function _keyExtractor(item: IPlace) {
		return item.id;
	}

	function _renderItem({ item }: { item: IPlace }) {
		return <Place data={item} />;
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
