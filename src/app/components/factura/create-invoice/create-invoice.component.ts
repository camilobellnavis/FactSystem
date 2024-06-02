import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CabFactura } from 'src/app/interfaces/cabfactura';
import { Cliente } from 'src/app/interfaces/cliente';
import { DetFactura } from 'src/app/interfaces/detfactura';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoCarrito } from 'src/app/interfaces/productoCarrito';
import { ValoresCarrito } from 'src/app/interfaces/valorescarrito';
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
  public isEmptyCart = true;
  public precioTransform = '';
  public cantidadProducto = 1;
  public ultimoIdProducto = 0;
  public ultimoIdDetalle = 0;
  public productosCarrito = Array<ProductoCarrito>();
  public detallesFacturas = Array<DetFactura>();


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

  public productoCarrito: ProductoCarrito = {  
    idProductoCarrito: 0,
    codigo: '',
    cantidad:0,
    nombre: '',
    precio: 0
  };

  public valorCarrito: ValoresCarrito = {
    impuesto: 12,
    subTotal: 0,
    total: 0,
  };

  public detalleFactura: DetFactura = {
    codigoProducto: '',
    cantidad: 0,
    cabFactura: 0
  }

  public factura: CabFactura = {
    numFactura: 0,
    impuesto: 0,
    dniCliente: '',
    subtotal: 0,
    total: 0
  };


  constructor(private _clienteService: CustomerService, private _productoService: ProductService,private _currencyPipe : CurrencyPipe) { }

  ngOnInit(): void {
    this.getCustomers();
    this.getProducts();
    console.log("Productos",this.productosCarrito);
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

  agregarCarrito(producto: Producto){
    this.ultimoIdProducto++;
    this.ultimoIdDetalle++;
    this.productoCarrito = {
      idProductoCarrito: this.ultimoIdProducto,
      codigo:producto.codigo,
      cantidad: this.cantidadProducto,
      nombre: producto.nombre,
      precio: producto.precio ?? 0
    };
    this.isEmptyCart = false,
    this.valorCarrito.subTotal += this.productoCarrito.precio * this.productoCarrito.cantidad;
    this.valorCarrito.total = this.valorCarrito.subTotal + ((this.valorCarrito.subTotal*this.valorCarrito.impuesto)/100);
    this.productosCarrito.push(this.productoCarrito); 
    this.detalleFactura = {
      id: this.ultimoIdProducto,
      cabFactura: 1,
      cantidad: this.productoCarrito.cantidad,
      codigoProducto: this.productoCarrito.codigo
    };
    this.detallesFacturas.push(this.detalleFactura); 
  }

  quitarCarrito(producto: ProductoCarrito){
    this.valorCarrito.subTotal -= producto.precio * producto.cantidad;
    this.valorCarrito.total = this.valorCarrito.subTotal + ((this.valorCarrito.subTotal*this.valorCarrito.impuesto)/100);
    this.productosCarrito = this.productosCarrito.filter(productoc => productoc.idProductoCarrito != producto.idProductoCarrito);
    this.detallesFacturas = this.detallesFacturas.filter(productoc => productoc.id != producto.idProductoCarrito);
   

    console.log("Facturas",this.detallesFacturas);
  }

  // getDetalleFactura(){
  //   this._productoService.getById().subscribe(
  //     response => this.ultimoIdDetalle = response.idProducto
  //   )
  // }

  generarFactura(){
    
  }
  

}
