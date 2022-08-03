import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto';
import { elementAt, Observable } from 'rxjs';
import { ProductoSimple } from '../interfaces/producto-simple';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [];
  productosSimples: ProductoSimple[] = [];
  productosSimplesAux: ProductoSimple[] = [];
  arbolProductos: Producto[] = [];
  primeraEjecucion: boolean;
  arbolProductosObs: Observable<Producto[]> = new Observable();
  constructor(
    private http: HttpClient
  ) { 
    this.primeraEjecucion = true;
    this.obtenerProductos();
    this.obtenerProductosSimples();
    
  }

  public obtenerProductos(): Observable<Producto[]>{
    return this.http.get('assets/productos.json') as Observable<Producto[]>;
  }

  private obtenerProductosSimples(): void{
    this.http.get('assets/productos-simples.json').subscribe(
      (response: any) => {
        this.productosSimples = response;
        this.productosSimplesAux = response;
        this.generarArbol();
      }
    )
  }

  private generarArbol(): void{
    // this.primeraEjecucion();
    if(this.primeraEjecucion){
      this.arbolProductos.push(
        {
          name: "Productos",
          id: 0,
          children: []
        }
      )
      this.productosSimples.forEach( element => {
        if(!(element.parentId)){
          this.arbolProductos[0].children.push(
            {
              name: element.name,
              id: element.id,
              children: []
            }
          )
        }
      })
      this.primeraEjecucion = false;
      this.generarArbol();
    }

    else{
      console.log("ingreso a segunda ejecucion");
      
      this.productosSimples.forEach(element => {
        if(element.parentId){
          //agregar producto a Arbol
          this.agregarProducto(element, this.arbolProductos)
        }
      })
    }
    console.log("arbol generado",this.arbolProductos);
    
  }

  private cargaNodosPadres(): void{
    
  }
  private agregarProducto(productoAgregar: ProductoSimple, array: Producto[]): void {
  
    array.forEach(element => {
      if(element.children.length != 0){
        if(element.id == productoAgregar.parentId){
          console.log("ingreso a if de agregar productos");
          element.children.push({
            name: productoAgregar.name,
            id: productoAgregar.id,
            children: []
          })
        }
        else{
          this.agregarProducto(productoAgregar, element.children);
        }
      }
      else{
        if(element.id == productoAgregar.parentId){
          element.children.push({
            name: productoAgregar.name,
            id: productoAgregar.id,
            children: []
          })
        }
      }
    });
  }

  public getArbol(): Producto[]{
    return this.arbolProductos;
  }
}
