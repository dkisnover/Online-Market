export class Product {
    public name: string;
    public imported: boolean;
    public id: number;
    public unadjustedPrice: number;
    public adjustedPrice: number;
    public quantity: number;
    public exempt: boolean;
    public totalPrice: number;

    constructor( name: string,  imported: boolean, unadjustedPrice: number, quantity: number, exempt: boolean){
        this.name = name;
        this.imported = imported;
        this.unadjustedPrice = unadjustedPrice;
        this.quantity = quantity;
        this.exempt = exempt;
        this.adjustPrice();
    }

    setQuantity(q: number){
        this.quantity = q;
        this.adjustPrice();
    }

    adjustPrice(){
        if(this.imported === true){
            this.adjustedPrice = 1.15 * this.unadjustedPrice;
        }else{
            this.adjustedPrice = this.exempt ? this.unadjustedPrice : this.unadjustedPrice * 1.1;
        }
        this.adjustedPrice *= 100;
        this.adjustedPrice = Math.round(this.adjustedPrice / 5) * 5
        this.adjustedPrice /=100;
        this.totalPrice = Math.round(this.adjustedPrice * this.quantity * 100)/100
    }
}