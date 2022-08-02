import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  productos: Producto[] = [];
  constructor(
    public productoService: ProductosService
  ) { }

  ngOnInit(): void {
    // this.productos = this.productoService.obtenerProductos();
    this.productoService.obtenerProductos().subscribe(
      (response: Producto[]) => {
        this.productos = response;
      }
    );
  }

}
