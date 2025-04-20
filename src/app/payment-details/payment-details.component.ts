import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentDetailFormComponent } from './payment-detail-form/payment-detail-form.component';
import { PaymentDetailService } from '../shared/payment-detail.service';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [CommonModule, PaymentDetailFormComponent],
  templateUrl: './payment-details.component.html',
  styles: ``
})
export class PaymentDetailsComponent implements OnInit {
  hoverIndex: number = -1;

  constructor(public service: PaymentDetailService) {}

  ngOnInit(): void {
    this.service.refreshList(); // Load list when component initializes
  }

  onDelete(id: number) {
    console.log('Attempting to delete record with ID:', id); // ✅ Debug log
    if (confirm('Are you sure you want to delete this record?')) {
      this.service.deletePaymentDetail(id).subscribe({
        next: () => {
          console.log('Delete successful. Refreshing list...');
          this.service.refreshList(); // Refresh after deletion
        },
        error: (err) => {
          console.error('Delete failed:', err); // Log backend or connection error
        }
      });
    }
  }

  populateForm(selected: any) {
    this.service.formData = Object.assign({}, selected);
  }
  
}
