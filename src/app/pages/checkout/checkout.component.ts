import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../products/interfaces/product.interface';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city:''
  }
  isDelivery = true;
  cart: Product[] = [];
  stores: Store[] = []
  constructor(
     private dataSvc: DataService,
     private shoopingCartSvc: ShoppingCartService,
     private router: Router,
     private productSvc : ProductsService,
     ) { 
      this.checkIfCartEmpty();
     }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }
  onPickupOrDelivery(value: boolean): void{
    this.isDelivery = value;
  }
  onSubtmit({value: formData}: NgForm): void{
    console.log('Guardar', formData);
    const data: Order = {
      ...formData,
      date: this.getCurrencyDay(),
      isDelivery: this.isDelivery
    }
    this.dataSvc.saveOrder(data).pipe(
      tap(res => console.log('order =>',res)),
      switchMap(({id: orderId}) =>{
        const details = this.prepareDetails();
        return this.dataSvc.saveDetailsOrder({details, orderId});
      }),
      tap(() => this.router.navigate(['/checkout/thanks-page'])),
      delay(2000),
      tap(() => this.shoopingCartSvc.resetCart()),
    )
    .subscribe();
  }
  private getStores(): void{
    this.dataSvc.getStores().pipe(
      tap((stores:Store[]) => this.stores = stores))
    .subscribe()
  }

  private getCurrencyDay(): string{
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[] {
    const details : Details[] = [];
    this.cart.forEach((product: Product) =>{
      const {id: productId, name: productName, qty: quantity, stock} = product;
      const updateStock = (stock - quantity);
      this.productSvc.updateStock(productId, updateStock)
      .pipe(
        tap(() => details.push({productId, productName, quantity}))
      )
      .subscribe()
      
    })
    return details;
  }
  private getDataCart(): void {
   this.shoopingCartSvc.cartAction$.pipe(
    tap((products : Product[]) => this.cart = products)
   )
   .subscribe()
  }

  private checkIfCartEmpty(): void{
    this.shoopingCartSvc.cartAction$
    .pipe(
      tap((products : Product[]) => {
        if(Array.isArray(products) && !products.length){
          this.router.navigate(['/products']);
        }
      })
    )
    .subscribe()
  }

}
