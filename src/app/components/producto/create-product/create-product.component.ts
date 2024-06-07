import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto';
import { ProductService } from 'src/app/services/product.service';
declare var $:any;


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public btn_registrar = false;
  public token = localStorage.getItem('token');

  public producto: Producto = {
    activo: undefined,
    codigo:'',
    fechaCreacion: this._datePipe.transform(new Date(), 'yyyy-MM-dd') ?? '',
    nombre:'',
    precio: undefined,
    inventario: 0
  };

  constructor(private _productoService : ProductService,private  _router: Router, private _route: ActivatedRoute,private _datePipe: DatePipe) { }

  ngOnInit(): void {
  }
  
  registrar(registroForm : any)  {
     if (registroForm.valid) {
       this.btn_registrar = true;
       this._productoService.create(this.producto,this.token).subscribe(
         response => {
           if (response.data == undefined) {
             $.notify(response.message, {
               type: 'danger',
               spacing: 10,
               timer: 2000,
               placement: {
                 from: 'top',
                 align: 'right'
               },
               delay: 1000,
               animate: {
                 enter: 'animated ' + 'bounce',
                 exit: 'animated ' + 'bounce'
               }
             });
             this.btn_registrar = false;
           }
           else {
             setTimeout(() => {
               this.btn_registrar = false;
             }, 10000);
             $.notify('Se ha registrado el colaborador correctamente', {
               type: 'success',
               spacing: 10,
               timer: 2000,
               placement: {
                 from: 'top',
                 align: 'right'
               },
               delay: 1000,
               animate: {
                 enter: 'animated ' + 'bounce',
                 exit: 'animated ' + 'bounce'
               }
             });
             this._router.navigate(['/producto'])
           }
         });
 
     }
     else {
       $.notify('Debes diligenciar los campos obligatorios', {
         type: 'danger',
         spacing: 10,
         timer: 2000,
         placement: {
           from: 'top',
           align: 'right'
         },
         delay: 1000,
         animate: {
           enter: 'animated ' + 'bounce',
           exit: 'animated ' + 'bounce'
         }
       });
     }
   }
}
