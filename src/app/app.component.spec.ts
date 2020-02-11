import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Item } from 'src/models/item.model';
import { PrimaryGood } from 'src/models/primary-good.model';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatListModule } from '@angular/material';
import { OtherGood } from 'src/models/other-good.model';
import { Purchase } from 'src/models/purchase.model';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
    
        ReactiveFormsModule,
    
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatListModule
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  //INPUT_1 TESTS

  it('INPUT_1: items should have the correct name, quantity, taxes and taxed price', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.purchaseForm.setValue({ name: 'book', quantity: 1, price: 12.49, exempt: true, imported: false });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'music CD', quantity: 1, price: 14.99, exempt: false, imported: false });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'chocolate bar', quantity: 1, price: 0.85, exempt: true, imported: false });
    app.onSubmit();
    app.onClickBuy();

    const mockedItems = [
      new Item(new PrimaryGood('book', 12.49, false), 1, 0, 12.49),
      new Item(new OtherGood('music CD', 14.99, false), 1, 1.50, 16.49),
      new Item(new PrimaryGood('chocolate bar', 0.85, false), 1, 0, 0.85)
    ];

    expect(app.purchase.items).toEqual(mockedItems);
  });

  it('INPUT_1: purchase should have the correct total taxes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.purchaseForm.setValue({ name: 'book', quantity: 1, price: 12.49, exempt: true, imported: false });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'music CD', quantity: 1, price: 14.99, exempt: false, imported: false });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'chocolate bar', quantity: 1, price: 0.85, exempt: true, imported: false });
    app.onSubmit();
    app.onClickBuy();

    expect(app.purchase.totalTaxes).toEqual(1.50);
  });

  it('INPUT_1: purchase should have the correct total amount', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.purchaseForm.setValue({ name: 'book', quantity: 1, price: 12.49, exempt: true, imported: false });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'music CD', quantity: 1, price: 14.99, exempt: false, imported: false });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'chocolate bar', quantity: 1, price: 0.85, exempt: true, imported: false });
    app.onSubmit();
    app.onClickBuy();

    expect(app.purchase.totalAmount).toEqual(29.83);
  });


  //INPUT_2 TESTS

  it('INPUT_2: items should have the correct name, quantity, taxes and taxed price', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.purchaseForm.setValue({ name: 'imported box of chocolates', quantity: 1, price: 10.00, exempt: true, imported: true });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'imported bottle of perfume', quantity: 1, price: 47.50, exempt: false, imported: true });
    app.onSubmit();
    app.onClickBuy();

    const mockedItems = [
      new Item(new PrimaryGood('imported box of chocolates', 10.00, true), 1, 0.50, 10.50),
      new Item(new OtherGood('imported bottle of perfume', 47.50, true), 1, 7.15, 54.65)
    ];

    expect(app.purchase.items).toEqual(mockedItems);
  });

  it('INPUT_2: purchase should have the correct total taxes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.purchaseForm.setValue({ name: 'imported box of chocolates', quantity: 1, price: 10.00, exempt: true, imported: true });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'imported bottle of perfume', quantity: 1, price: 47.50, exempt: false, imported: true });
    app.onSubmit();
    app.onClickBuy();

    expect(app.purchase.totalTaxes).toEqual(7.65);
  });

  it('INPUT_2: purchase should have the correct total amount', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.purchaseForm.setValue({ name: 'imported box of chocolates', quantity: 1, price: 10.00, exempt: true, imported: true });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'imported bottle of perfume', quantity: 1, price: 47.50, exempt: false, imported: true });
    app.onSubmit();
    app.onClickBuy();

    expect(app.purchase.totalAmount).toEqual(65.15);
  });


  //INPUT_3 TESTS

  it('INPUT_3: items should have the correct name, quantity, taxes and taxed price', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.purchaseForm.setValue({ name: 'imported bottle of perfume', quantity: 1, price: 27.99, exempt: false, imported: true });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'bottle of perfume', quantity: 1, price: 18.99, exempt: false, imported: false });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'packet of headache pills', quantity: 1, price: 9.75, exempt: true, imported: false });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'box of imported chocolates', quantity: 1, price: 11.25, exempt: true, imported: true });
    app.onSubmit();
    app.onClickBuy();

    const mockedItems = [
      new Item(new OtherGood('imported bottle of perfume', 27.99, true), 1, 4.20, 32.19),
      new Item(new OtherGood('bottle of perfume', 18.99, false), 1, 1.90, 20.89),
      new Item(new PrimaryGood('packet of headache pills', 9.75, false), 1, 0, 9.75),
      new Item(new PrimaryGood('box of imported chocolates', 11.25, true), 1, 0.60, 11.85)
    ];

    expect(app.purchase.items).toEqual(mockedItems);
  });

  it('INPUT_3: purchase should have the correct total taxes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.purchaseForm.setValue({ name: 'imported bottle of perfume', quantity: 1, price: 27.99, exempt: false, imported: true });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'bottle of perfume', quantity: 1, price: 18.99, exempt: false, imported: false });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'packet of headache pills', quantity: 1, price: 9.75, exempt: true, imported: false });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'box of imported chocolates', quantity: 1, price: 11.25, exempt: true, imported: true });
    app.onSubmit();
    app.onClickBuy();

    expect(app.purchase.totalTaxes).toEqual(6.70);
  });

  it('INPUT_3: purchase should have the correct total amount', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.purchaseForm.setValue({ name: 'imported bottle of perfume', quantity: 1, price: 27.99, exempt: false, imported: true });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'bottle of perfume', quantity: 1, price: 18.99, exempt: false, imported: false });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'packet of headache pills', quantity: 1, price: 9.75, exempt: true, imported: false });
    app.onSubmit();
    app.purchaseForm.setValue({ name: 'box of imported chocolates', quantity: 1, price: 11.25, exempt: true, imported: true });
    app.onSubmit();
    app.onClickBuy();

    expect(app.purchase.totalAmount).toEqual(74.68);
  });
});
