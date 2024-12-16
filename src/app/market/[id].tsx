import { useEffect, useRef, useState } from "react";
import { Alert, Modal, View, StatusBar, ScrollView } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Redirect, router, useLocalSearchParams } from "expo-router";

import { api } from "@/services/api";
import { IPlaceDetails } from "@/types/place";
import { Button, Cover, Details, Loading } from "@/components";

export default function Market() {
	const qrLock = useRef(false);
	const params = useLocalSearchParams<{ id: string }>();
	const [_, requestPermission] = useCameraPermissions();

	const [market, setMarket] = useState<IPlaceDetails | null>(null);
	const [coupon, setCoupon] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [couponIsFetching, setCouponIsFetching] = useState(false);
	const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);

	function handleUseCoupon(id: string) {
		setIsVisibleCameraModal(false);

		Alert.alert("Coupon", "Are you sure you want to use this coupon?", [
			{ text: "No", style: "cancel" },
			{ text: "Yes", onPress: () => getCoupon(id) },
		]);
	}

	async function fetchMarket() {
		setIsLoading(true);
		try {
			const { data } = await api.get(`/markets/${params.id}`);
			setMarket(data);
		} catch (error) {
			console.error(error);
			Alert.alert("Error", "Failed to fetch market data", [
				{ text: "OK", onPress: () => router.back() },
			]);
		} finally {
			setIsLoading(false);
		}
	}

	async function handleOnOpenCamera() {
		try {
			const { granted } = await requestPermission();

			if (!granted)
				return Alert.alert("Error", "You need to grant camera permission.");

			setIsVisibleCameraModal(true);
			qrLock.current = false;
		} catch (error) {
			console.error(error);
		}
	}

	async function getCoupon(id: string) {
		setCouponIsFetching(true);
		try {
			const { data } = await api.patch(`/coupons/${id}`);
			setCoupon(data.coupon);
		} catch (error) {
			console.error(error);
		} finally {
			setCouponIsFetching(false);
		}
	}

	useEffect(() => {
		fetchMarket();
	}, [params.id, coupon]);

	if (isLoading) return <Loading />;

	if (!market) return <Redirect href={"/home"} />;

	return (
		<View style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />

			<Cover uri={String(market?.cover)} />

			<ScrollView showsVerticalScrollIndicator={false}>
				<Details data={market} coupon={coupon} />
			</ScrollView>

			<View style={{ padding: 32 }}>
				<Button onPress={handleOnOpenCamera}>
					<Button.Title>Ler QR Code</Button.Title>
				</Button>
			</View>

			<Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
				<CameraView
					style={{ flex: 1 }}
					facing="back"
					onBarcodeScanned={({ data }) => {
						if (data && !qrLock.current) {
							qrLock.current = true;
							setTimeout(() => handleUseCoupon(data), 500);
						}
					}}
				/>
				<View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
					<Button
						onPress={() => setIsVisibleCameraModal(false)}
						isLoading={couponIsFetching}
					>
						<Button.Title>Fechar</Button.Title>
					</Button>
				</View>
			</Modal>
		</View>
	);
}
