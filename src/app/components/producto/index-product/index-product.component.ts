import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.css']
})
export class IndexProductComponent implements OnInit {

  public filtro = undefined;
  public productosConstantes: Array<any> = []; 
  public productos:  Array<any> = []; 

  constructor(private _productoService: ProductService,private  _router: Router) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this.getInfo();
  }

  getInfo(){
    this._productoService.getAll().subscribe(productos => {
      console.log(productos);
      this.productos = productos.data;
      this.productosConstantes = this.productos;

    }); 
  }

  routeEdit(id:any){
    this._router.navigate(['/producto/'+id]);
  }

  delete(id:any){
    this._productoService.delete(id).subscribe(
      response =>{
      console.log(response);
      this.initData();
    });
  }

  filtrarProductos(){
    if (this.filtro) {
      var term = new RegExp(this.filtro, 'i');
      console.log("Termino::",term);
      this.productos = this.productosConstantes.filter(item=> term.test(item.nombre));
    } else {
      this.productos = this.productosConstantes;
    }

  }
}
