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
  public token = localStorage.getItem('token');

  constructor(private _productoService: ProductService,private  _router: Router) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this.getInfo();
  }

  getInfo(){
    this._productoService.getAll(this.token).subscribe(productos => {
      this.productos = productos.data;
      this.productosConstantes = this.productos;

    }); 
  }

  routeEdit(id:any){
    this._router.navigate(['/producto/'+id]);
  }

  delete(id:any){
    this._productoService.delete(id,this.token).subscribe(
      response =>{
      this.initData();
    });
  }

  filtrarProductos(){
    if (this.filtro) {
      var term = new RegExp(this.filtro, 'i');
      this.productos = this.productosConstantes.filter(item=> term.test(item.nombre));
    } else {
      this.productos = this.productosConstantes;
    }

  }
}
