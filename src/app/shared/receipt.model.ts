import { Product } from "./product.model";

export class Receipt{
    public purchases: Product[];
    public totalCost: number;
    public purchaseDate: Date;
    public index: number;
    public totalTaxes: number;
    public totalTaxless: number;
    
    constructor(products: Product[], purchaseDate: Date,){
        this.purchases = products.slice();
        this.purchaseDate = purchaseDate;
        this.totalCost = 0;
        for(var product of this.purchases){
            this.totalCost += product.totalPrice;
        }
        this.totalTaxes = 0;
        for(var product of this.purchases){
            this.totalTaxes += product.tax;
        }
        this.totalTaxless = this.totalCost - this.totalTaxes;
    }
}