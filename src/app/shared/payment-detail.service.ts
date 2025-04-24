import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { PaymentDetail } from './payment-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  url: string = environment.apiBaseUrl + 'payment'; // becomes https://localhost:7071/api/payment


  // ✅ Holds all payment details fetched from the API
  paymentList: PaymentDetail[] = [];

  // ✅ Bound to the form
  formData: PaymentDetail = new PaymentDetail();

  constructor(private http: HttpClient) {}

  // 🔁 Fetch and update the local payment list
  refreshList() {
    this.http.get<PaymentDetail[]>(this.url).subscribe({
      next: (data) => {
        this.paymentList = data;
        console.log('Data stored in array:', this.paymentList);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }

  // ➕ POST: Create a new payment detail
  postPaymentDetail() {
    return this.http.post(this.url, this.formData);
  }

  // ✏️ PUT: Update an existing payment detail
  putPaymentDetail() {
    return this.http.put(`${this.url}/${this.formData.paymentDetailId}`, this.formData);
  }
  deletePaymentDetail(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
