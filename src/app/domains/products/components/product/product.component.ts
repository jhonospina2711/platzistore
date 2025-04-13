import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref} from '@angular/router';
import { Product } from '@shared/models/poduct.model';
import {ReversePipe}  from '@shared/pipes/reverse.pipe';
import {TimeAgoPipe}  from '@shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReversePipe, TimeAgoPipe, RouterLinkWithHref],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  @Input({required: true}) product!: Product;

  @Output() addToCart = new EventEmitter();

  addToCartHandler() {
    console.log('click form child');
    //this.addToCart.emit('Hola este es un msg desde el hijo ' + this.product.title)
    this.addToCart.emit(this.product);
  }

}
