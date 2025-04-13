import { Component, inject, Input, signal } from '@angular/core';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { Product } from '@shared/models/poduct.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export default class ProductDetailComponent {

  @Input() id?: string;
  product = signal<Product | null>(null);
  private ProductService = inject(ProductService);
  cover = signal('');
  private cartService = inject(CartService);

  ngOnInit() {
    if(this.id){
      this.ProductService.getOne(this.id)
      .subscribe({
        next: (product) => {
          this.product.set(product);
          if (product.images.length > 0){
            this.cover.set(product.images[0])
          }
        }
      })
    }
  }

  changeCover(newImg: string) {
    this.cover.set(newImg);
  }

  addToCart() {
    const product = this.product();
    if(product){
      this.cartService.addToCart(product)
    }
  }

}
