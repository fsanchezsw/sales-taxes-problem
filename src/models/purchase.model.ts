import { Item } from './item.model';

export class Purchase {
    items: Item[];
    totalTaxes: number;
    totalAmount: number;

    /**
     * Optional parameters are just for testing, do not introduce them unless you are in a test function
     * @param items 
     * @param totalTaxes Optional parameter
     * @param totalAmount Optional parameter
     */
    constructor(items: Item[], totalTaxes?: number, totalAmount?: number) {
        this.items = items;
        // "+" symbol and "toFixed(2)" to solve the Javascript's floating points issue
        this.totalTaxes = totalTaxes || +items.reduce((acc, item) => item.quantity * (acc + item.taxes), 0).toFixed(2);
        this.totalAmount = totalAmount || +items.reduce((acc, item) => item.quantity * (acc + item.amount), 0).toFixed(2);
    }
}