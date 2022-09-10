import { CartItems } from './../models/cartItems';
import { CartItem } from './../models/cartItem';
import { Product } from './../models/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(product: Product) {
    let item = CartItems.find(c => c.product.id == product.id);

    if (item) {
      item.quantity += 1;
    } else {
      let newCartItem = new CartItem();
      newCartItem.product = product;
      newCartItem.quantity = 1;
      CartItems.push(newCartItem);
    }
  }

  removeFromCart(product: Product) {
    let itemToRemove: CartItem = CartItems.find(c => c.product.id == product.id);
    CartItems.splice(CartItems.indexOf(itemToRemove), 1);
  }

  getTotalPrice(): number {
    let totalPrice: number = 0;

    CartItems.forEach(item => {
      totalPrice += item.quantity * (item.product.unitPrice - (item.product.unitPrice * item.product.discount / 100))
    });
    return totalPrice;
  }

  list(): CartItem[] {
    return CartItems;
  }
}
