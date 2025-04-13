import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';

import { Product } from '../../models/poduct.model';
import { CartService } from '../../services/cart.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  hideSideMenu = signal(true);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;


  toogleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }



}
