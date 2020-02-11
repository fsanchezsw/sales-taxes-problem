import { Product } from './product.model';

export class OtherGood extends Product {
    constructor(name: string, price: number, imported: boolean) {        
        super(name, price, imported);
    }
}