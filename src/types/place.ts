import { IRule } from "./rule";

export interface IPlace {
	id: string;
	name: string;
	description: string;
	coupons: number;
	cover: string;
	address: string;
	phone: string;
	latitude: number;
	longitude: number;
}

export interface IPlaceDetails
	extends Omit<IPlace, "id" | "latitude" | "longitude"> {
	marketId: string;
	rules: IRule[];
}
