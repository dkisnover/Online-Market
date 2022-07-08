
/*
model representing items on the market
*/
export interface Item {
    name: string;
    imported: boolean;
    unadjustedPrice: number;
    adjustedPrice: number;
    quantity: number;
    exempt: boolean;
    totalPrice: number;
    stock?: number;
    tax: number;
    totalTax: number;
}