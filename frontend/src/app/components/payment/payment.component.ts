import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  total: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.total = this.cartService.getTotalPrice();
  }

}
