import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-index-client',
  templateUrl: './index-client.component.html',
  styleUrls: ['./index-client.component.css']
})
export class IndexClientComponent implements OnInit {

  public filtro = undefined;
  public clientesConstantes: Array<any> = []; 
  public clientes:  Array<any> = []; 
  public token = localStorage.getItem('token');

  constructor(private _clienteService: CustomerService,private  _router: Router) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this.getInfo();
  }

  getInfo(){
    this._clienteService.getAll(this.token).subscribe(clientes => {
      this.clientes = clientes.data;
      this.clientesConstantes = this.clientes;

    }); 
  }

  routeEdit(id:any){
    this._router.navigate(['/cliente/'+id]);
  }

  delete(id:any){
    this._clienteService.delete(id,this.token).subscribe(
      response =>{
      this.initData();
    });
  }

  filtrarClientes(){
    if (this.filtro) {
      var term = new RegExp(this.filtro, 'i');
      this.clientes = this.clientesConstantes.filter(item=> term.test(item.nombre));
    } else {
      this.clientes = this.clientesConstantes;
    }

  }

}
