import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [];
  constructor(
    private http: HttpClient
  ) { 
    this.obtenerProductos();
  }

  public obtenerProductos(): Observable<Producto[]>{
    return this.http.get('assets/productos.json') as Observable<Producto[]>;
  }
  
}
