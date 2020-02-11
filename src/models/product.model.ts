import { roundUpTo5Cents } from 'src/util/round.util';

export abstract class Product {
    readonly BASIC_TAX: number = 0.10;
    readonly IMPORT_TAX: number = 0.05;

    name: string;
    price: number;
    imported: boolean;

    constructor(name: string, price: number, imported: boolean) {
        if(price < 0) throw new RangeError('Price must be positive');

        this.name = name;
        this.price = price;
        this.imported = imported;
    }

    calculateTaxes(): number {
        return this.imported ? roundUpTo5Cents(this.price * (this.BASIC_TAX + this.IMPORT_TAX)) : roundUpTo5Cents(this.price * (this.BASIC_TAX));
    }

    calculateAmount(): number {
        // "+" symbol and "toFixed(2)" to solve the Javascript's floating points issue
        return +(this.price + this.calculateTaxes()).toFixed(2);
    }
}