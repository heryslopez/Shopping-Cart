import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  //este se comunica de padre a hijo
  @Input() product!: Product;
  //este se comunica de hijo a padre
  @Output() addToCartClick = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  
  }
  onClick(): void {
    this.addToCartClick.emit(this.product);
  }

}
