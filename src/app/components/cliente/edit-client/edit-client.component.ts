import { DatePipe, formatDate, getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { CustomerService } from 'src/app/services/customer.service';
declare var $:any;

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  public id = 0;
  public token = localStorage.getItem('token');
  public cliente:Cliente = {
    idCliente: 0,
    nombre:'',
    identificacion:'',
    correo:'',
    direccion:'',
    fechaCreacion:'',
    activo: undefined
  };

  public btnActualizar = false;
  public load_data = false;
  public data = false;

  constructor(private _clienteService : CustomerService,private  _router: Router, private _route: ActivatedRoute, private _datePipe: DatePipe) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.load_data = true;
      this._clienteService.getById(this.id,this.token).subscribe(
        response => {
          if (response.data != undefined){
            this.cliente = response.data;
            this.cliente.fechaCreacion = this._datePipe.transform(this.cliente.fechaCreacion, 'yyyy-MM-dd') ?? '';
            this.data = true;
            this.load_data = false;
          }
          else{
            this.data = false;
            this.load_data = false;
          }
        }        
      )
    });
  }

  actualizar(actualizarForm : any)  {
    if (actualizarForm.valid) {
      this.btnActualizar = true;
      this._clienteService.update(this.id,this.cliente,this.token).subscribe(
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
            this.btnActualizar = false;
          }
          else {
            setTimeout(() => {
              this.btnActualizar = false;
            }, 10000);
            $.notify('Se ha actualizado el cliente correctamente', {
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

