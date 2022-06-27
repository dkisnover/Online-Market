export class Product {
    public name: string;
    public imported: boolean;
    public id: number;
    public unadjustedPrice: number;
    public adjustedPrice: number;
    public quantity: number;

    constructor( name: string,  imported: boolean,  id: number,  unadjustedPrice: number){
        this.name = name;
        this.imported = imported;
        this.id = id;
        this.unadjustedPrice = unadjustedPrice;
        this.quantity = 0;        
        this.adjustedPrice = this.imported ? this.unadjustedPrice * 1.15 : this.unadjustedPrice * 1.1;
    }
}