import { Item } from "./item.model";

export interface Receipt{
    purchases: Item[];
    totalCost: number;
    purchaseDate: Date;
    totalTaxes: number;
    totalTaxless: number;
    id?: string;
}