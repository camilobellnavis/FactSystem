import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { CustomerService } from 'src/app/services/customer.service';
declare var $:any;

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  public btn_registrar = false;
  public token = localStorage.getItem('token');

  public cliente: Cliente = {
    nombre:'',
    identificacion:'',
    correo:'',
    direccion:'',
    fechaCreacion: this._datePipe.transform(new Date(), 'yyyy-MM-dd') ?? '',
    activo: undefined
  };

  constructor(private _clienteService : CustomerService,private  _router: Router, private _route: ActivatedRoute,private _datePipe: DatePipe) { }

  ngOnInit(): void {
  }
  
  registrar(registroForm : any)  {
     if (registroForm.valid) {
       this.btn_registrar = true;
       this._clienteService.create(this.cliente,this.token).subscribe(
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
             this._router.navigate(['/cliente'])
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
