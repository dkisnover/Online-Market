import { Item } from "./item.model";

/*
model representing a list of items, and their purchase date
*/
export class Receipt{
    purchases: Item[];
    totalCost: number;
    purchaseDate: Date;
    totalTaxes: number;
    totalTaxless: number;
}