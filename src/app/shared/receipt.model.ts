import { Item } from "./item.model";

export class Receipt{
    purchases: Item[];
    totalCost: number;
    purchaseDate: Date;
    totalTaxes: number;
    totalTaxless: number;
}