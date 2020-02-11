import { Product } from './product.model';

export class Item {
    product: Product;
    quantity: number;
    taxes: number;
    amount: number;

    /**
     * Optional parameters are just for testing, do not introduce them unless you are in a test function
     * @param product 
     * @param quantity 
     * @param taxes Optional parameter
     * @param amount Optional parameter
     */
    constructor(product: Product, quantity: number, taxes?: number, amount?: number) {
        if(quantity < 0) throw new RangeError('Quantity must be positive');

        this.product = product;
        this.quantity = quantity;
        this.taxes = taxes || product.calculateTaxes();
        this.amount = amount || product.calculateAmount();
    }
}