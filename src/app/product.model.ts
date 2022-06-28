export class Product {
    public name: string;
    public imported: boolean;
    public id: number;
    public unadjustedPrice: number;
    public adjustedPrice: number;
    public quantity: number;

    constructor( name: string,  imported: boolean,  id: number,  unadjustedPrice: number, quantity: number){
        this.name = name;
        this.imported = imported;
        this.id = id;
        this.unadjustedPrice = unadjustedPrice;
        this.quantity = quantity;        
        this.adjustedPrice = this.imported ? this.unadjustedPrice * 1.15 : this.unadjustedPrice * 1.1;
        this.adjustedPrice = Math.round(this.adjustedPrice * 100) /100;
    }

    setQuantity(q: number){
        this.quantity = q;
    }
}