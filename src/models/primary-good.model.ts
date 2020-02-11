import { Product } from './product.model';
import { roundUpTo5Cents } from 'src/util/round.util';

export class PrimaryGood extends Product {
    constructor(name: string, price: number, imported: boolean) {
        super(name, price, imported);
    }

    /** @override */
    calculateTaxes(): number {
        return this.imported ? roundUpTo5Cents(this.price * (this.IMPORT_TAX)) : 0;
    }

    /** @override */
    calculateAmount(): number {
        // "+" symbol and "toFixed(2)" to solve the Javascript's floating points issue
        return +(this.price + this.calculateTaxes()).toFixed(2);
    }
}