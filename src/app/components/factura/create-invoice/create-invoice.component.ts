import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { Producto } from 'src/app/interfaces/producto';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {
  public clientes:  Array<any> = []; 
  public productos:  Array<any> = []; 
  idCliente: string = '';
  idProducto:string = '';
  public load_data = false;
  public data = false;
  public existCustomer = false;
  public existProduct = false;
  public precioTransform = '';
  public cantidadProducto = 0;

  public cliente:Cliente = {
    idCliente: 0,
    nombre:'',
    identificacion:'',
    correo:'',
    direccion:'',
    fechaCreacion:'',
    activo: undefined
  };

  public producto: Producto = {
    activo: undefined,
    codigo:'',
    fechaCreacion: '',
    nombre:'',
    precio: undefined,
    inventario: 1
  };


  constructor(private _clienteService: CustomerService, private _productoService: ProductService,private _currencyPipe : CurrencyPipe) { }

  ngOnInit(): void {
    this.getCustomers();
    this.getProducts();
  }
  

  getCustomers(){
    this._clienteService.getAll().subscribe(clientes => {
      console.log(clientes);
      this.clientes = clientes.data;
    }); 
  }
  
  getProducts(){
    this._productoService.getAll().subscribe(productos => {
      console.log(productos);
      this.productos = productos.data;
    }); 
  }

  validarCliente(id: any){
    console.log(id);
    this._clienteService.getById(id).subscribe(
      response => {
        if (response.data != undefined){
          this.cliente = response.data;
          this.existCustomer = true;
        }
        else{
          this.data = false;
          this.load_data = false;
          this.existCustomer = false;
        }
      }        
    );
  
  }

  validarProducto(id: any){
    console.log(id);
    this._productoService.getById(id).subscribe(
      response => {
        if (response.data != undefined){
          this.producto = response.data;
          this.existProduct = true;
          this.transformAmount();
        }
        else{
          this.data = false;
          this.load_data = false;
          this.existProduct = false;
        }
      }        
    );
    
  }
  
  transformAmount(){
    this.precioTransform = this.producto.precio?.toString() ?? '';
    this.precioTransform = this._currencyPipe.transform(this.precioTransform, '$') ?? '';
}
  

}
