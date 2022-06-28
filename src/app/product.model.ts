export class Product {
    public name: string;
    public imported: boolean;
    public id: number;
    public unadjustedPrice: number;
    public adjustedPrice: number;
    public quantity: number;
    public exempt: boolean;

    constructor( name: string,  imported: boolean,  id: number,  unadjustedPrice: number, quantity: number, exempt: boolean){
        this.name = name;
        this.imported = imported;
        this.id = id;
        this.unadjustedPrice = unadjustedPrice;
        this.quantity = quantity;
        if(this.imported === true){
            this.adjustedPrice = 1.15 * unadjustedPrice;
        }else{
            this.adjustedPrice = this.exempt ? this.unadjustedPrice : this.unadjustedPrice * 1.1;
        }
        this.adjustedPrice *= 100;
        this.adjustedPrice = Math.round(this.adjustedPrice / 5) * 5
        this.adjustedPrice /=100;
    }

    setQuantity(q: number){
        this.quantity = q;
    }
}