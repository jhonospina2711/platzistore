import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/poduct.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient)

  constructor() { }

  // getProducts() {
  //   return this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
  // }

  getProducts() {
    return this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products').pipe(
      map(products =>
        products.map(product => {
          const randomDays = Math.floor(Math.random() * 30); // Genera un número aleatorio de días (0-29)
          const randomHours = Math.floor(Math.random() * 24); // Genera un número aleatorio de horas (0-23)
          const randomMinutes = Math.floor(Math.random() * 60); // Genera un número aleatorio de minutos (0-59)

          const creationDate = new Date(product.creationAt); // Convierte la fecha original a un objeto Date
          creationDate.setDate(creationDate.getDate() - randomDays); // Suma los días aleatorios
          creationDate.setHours(creationDate.getHours() - randomHours); // Suma las horas aleatorias
          creationDate.setMinutes(creationDate.getMinutes() - randomMinutes); // Suma los minutos aleatorios

          return {
            ...product,
            images: product.images.map(() =>
              'https://picsum.photos/640/640?r=' + Math.random()
            ),
            creationAt: creationDate.toISOString() // Convierte la fecha modificada a formato ISO
          };
        })
      )
    );
  }

  getOne(id: string) {
    return this.http.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`).pipe(
      map(product => ({
        ...product,
        images: product.images.map(() =>
          'https://picsum.photos/640/640?r=' + Math.random()
        )
      }))
    );
  }
}
