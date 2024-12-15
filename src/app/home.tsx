import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";

import { api } from "@/services/api";
import { IPlace } from "@/types/place";
import { ICategory } from "@/types/category";
import { Categories, Places } from "@/components";
import { colors, fontFamily } from "@/styles/theme";

const currentLocation = {
	latitude: -23.561187293883442,
	longitude: -46.656451388116494,
};

export default function Home() {
	const [markets, setMarkets] = useState<IPlace[]>([]);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState("");

	function handleOnSelect(id: string) {
		setSelectedCategoryId(id);
	}

	async function fetchCategories() {
		try {
			const { data } = await api.get("/categories");
			setCategories(data);
			setSelectedCategoryId(data[0].id);
		} catch (error) {
			console.error(error);
			Alert.alert("Error fetching categories");
		}
	}

	async function fetchMarkets() {
		if (!selectedCategoryId) return;
		try {
			const { data } = await api.get(`/markets/category/${selectedCategoryId}`);
			setMarkets(data);
		} catch (error) {
			console.error(error);
			Alert.alert("Error fetching markets");
		}
	}

	async function getCurrentLocation() {
		try {
			const { granted } = await Location.requestForegroundPermissionsAsync();
			if (granted) {
				await Location.getCurrentPositionAsync();
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		fetchMarkets();
	}, [selectedCategoryId]);

	return (
		<View style={{ flex: 1 }}>
			<Categories
				data={categories}
				selectedCategoryId={selectedCategoryId}
				onSelect={handleOnSelect}
			/>

			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude: currentLocation.latitude,
					longitude: currentLocation.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
			>
				<Marker
					identifier="current"
					coordinate={{
						latitude: currentLocation.latitude,
						longitude: currentLocation.longitude,
					}}
					image={require("@/assets/location.png")}
				/>
				{markets.map((m) => (
					<Marker
						key={m.id}
						identifier={m.id}
						coordinate={{ latitude: m.latitude, longitude: m.longitude }}
						image={require("@/assets/pin.png")}
					>
						<Callout>
							<View>
								<Text
									style={{
										fontSize: 14,
										color: colors.gray[600],
										fontFamily: fontFamily.medium,
									}}
								>
									{m.name}
								</Text>
								<Text
									style={{
										fontSize: 12,
										color: colors.gray[600],
										fontFamily: fontFamily.regular,
									}}
								>
									{m.address}
								</Text>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>

			<Places data={markets} />
		</View>
	);
}
