import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://testshoppingcart-e0498-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient) { }
  //nos vas a delvolver un tipo observable es un flujo de datos en este caso
  //sera productos
  getProducts():Observable<Product[]>{
    //nos va a devolver lo que nos responda la api
    return this.http.get<Product[]>(this.apiUrl + '/products.json');
  }

  updateStock(productId: number, stock: number): Observable<any>{
    const body = {"stock": stock};
    return this.http.patch<any>(`${this.apiUrl}/products/${productId - 1}.json`, body);
  }
}
