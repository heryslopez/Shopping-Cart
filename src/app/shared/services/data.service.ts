import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailsOrder, Order } from '../interfaces/order.interface';
import { Store } from '../interfaces/stores.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL ='https://testshoppingcart-e0498-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient) { }
  getStores(): Observable<Store[]>{
    return this.http.get<Store[]>(`${this.apiURL}/stores.json`);
  }

  saveOrder(order : Order): Observable<Order>{
    return this.http.post<any>(`${this.apiURL}/orders.json`, order);
  }
  saveDetailsOrder(details : DetailsOrder): Observable<DetailsOrder>{
    return this.http.post<DetailsOrder>(`${this.apiURL}/detailsOrders.json`, details);
  }


}
