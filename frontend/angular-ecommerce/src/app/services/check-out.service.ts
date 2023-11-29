import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentInfo } from '../common/payment-info';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  // URL to springboot backend REST endpoint
  private purchaseUrl = environment.shopApiUrl + '/checkout/purchase';

  private paymentIntentUrl = environment.shopApiUrl + '/checkout/payment-intent';


  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    // REST API call
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);    
  }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {
    // REST API call
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }
  
}