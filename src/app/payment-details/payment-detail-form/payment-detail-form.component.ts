import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms'; // ✅ Import FormsModule + NgForm
import { PaymentDetailService } from '../../shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  standalone: true,
  imports: [FormsModule], // ✅ Required for [(ngModel)]
  templateUrl: './payment-detail-form.component.html',
  styles: ``
})
export class PaymentDetailFormComponent {
  constructor(public service: PaymentDetailService) {}

  // 🔁 Handle form submission
  onSubmit(form: NgForm) {
    if (this.service.formData.paymentDetailID === 0) {
      this.insertRecord(form);  // ➕ POST
    } else {
      this.updateRecord(form);  // ✏️ PUT
    }
  }
  

  // ➕ Insert New Record
  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe({
      next: res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      error: err => {
        console.error('Insert failed:', err);
      }
    });
  }

  // ✏️ Update Existing Record
  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe({
      next: () => {
        alert('✅ Updated successfully');
        this.resetForm(form);
        this.service.refreshList();
      },
      error: err => {
        console.error('Update failed:', err);
      }
    });
  }
  
  // ♻️ Reset the Form
  resetForm(form: NgForm) {
    form.resetForm();
    this.service.formData = {
      paymentDetailID: 0,
      cardOwnerName: '',
      cardNumber: '',
      expirationDate: '',
      securityCode: ''
    };
  }
 
}
