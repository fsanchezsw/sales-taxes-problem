import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/models/product.model';
import { PrimaryGood } from 'src/models/primary-good.model';
import { OtherGood } from 'src/models/other-good.model';
import { Item } from 'src/models/item.model';
import { Purchase } from 'src/models/purchase.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'sales-taxes';

  purchaseForm: FormGroup;
  items: Item[] = [];
  purchase: Purchase;

  constructor(private formBuilder: FormBuilder) {
    this.purchaseForm = this.formBuilder.group({
      name: [, Validators.required],
      quantity: [, [Validators.required, Validators.min(0)]],
      price: [, [Validators.required, Validators.min(0)]],
      exempt: [],
      imported: []
    });
  }

  /** Triggered by template event */
  onSubmit() {
    const form = this.purchaseForm.value;
    let product: Product;

    if(form.exempt) { product = new PrimaryGood(form.name, form.price, form.imported); }
    else { product = new OtherGood(form.name, form.price, form.imported); }

    this.items.push(new Item(product, form.quantity));

    this.purchaseForm.reset();
  }

  /** Triggered by template event */
  onClickBuy() { this.purchase = new Purchase(this.items); }

  /** Triggered by template event */
  onClickReset() {
    this.items = [];
    this.purchase = null;
  }
}
