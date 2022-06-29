import { Product } from "./product.model";

export class Receipt{
    public purchases: Product[];
    public totalCost: number;
    public purchaseDate: Date;
    public index: number;
    
    constructor(products: Product[], purchaseDate: Date, index: number){
        this.purchases = products.slice();
        this.purchaseDate = purchaseDate;
        this.totalCost = 0;
        for(var product of this.purchases){
            this.totalCost += product.totalPrice;
        }
        this.index = index;
    }
}