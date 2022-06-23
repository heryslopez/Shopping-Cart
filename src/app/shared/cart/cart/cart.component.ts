import { Component } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  // templateUrl: './cart.component.html',
  template: `
  <ng-container *ngIf="{total : total$ | async, quantity: quantity$ | async} as dataCart">
  <ng-container *ngIf="dataCart.total">
    <mat-icon matBadge="{{dataCart.quantity}}" matBadgeColor="accent">add_shopping_cart</mat-icon>
    {{dataCart.total | currency}}
    
  </ng-container>
  </ng-container>
  `
})
export class CartComponent{
  quantity$ = this.shoppingCartSvc.quantityAction$;
  total$ = this.shoppingCartSvc.totalAction$;
  constructor(private shoppingCartSvc: ShoppingCartService){}

}
