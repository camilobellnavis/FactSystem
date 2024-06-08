import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CabFactura } from 'src/app/interfaces/cabfactura';
import { Cliente } from 'src/app/interfaces/cliente';
import { DetFactura } from 'src/app/interfaces/detfactura';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoCarrito } from 'src/app/interfaces/productocarrito';
import { ValoresCarrito } from 'src/app/interfaces/valorescarrito';
import { CabFacturaService } from 'src/app/services/cabfactura.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';
declare var $: any;



@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {
  public clientes: Array<any> = [];
  public productos: Array<any> = [];
  public productosCarrito = Array<ProductoCarrito>();
  public detallesFacturas = Array<DetFactura>();
  public idCliente = '';
  public idProducto = '';
  public load_data = false;
  public data = false;
  public existCustomer = false;
  public btn_registrar = false;
  public existProduct = false;
  public isEmptyCart = true;
  public precioTransform = '';
  public cantidadProducto = 1;
  public ultimoIdProducto = 0;
  public ultimoIdDetalle = 0;
  public ultimoNumFactura = 0;
  public ultimoNumDetalleFactura = 0;
  public token = localStorage.getItem('token');


  public cliente: Cliente = {
    idCliente: 0,
    nombre: '',
    identificacion: '',
    correo: '',
    direccion: '',
    fechaCreacion: '',
    activo: undefined
  };

  public clienteModal: Cliente = {
    idCliente: 0,
    nombre: '',
    identificacion: '',
    correo: '',
    direccion: '',
    fechaCreacion: this._datePipe.transform(new Date(), 'yyyy-MM-dd') ?? '',
    activo: undefined
  };

  public producto: Producto = {
    activo: undefined,
    codigo: '',
    fechaCreacion: '',
    nombre: '',
    precio: undefined,
    inventario: 1
  };

  public productoCarrito: ProductoCarrito = {
    idProductoCarrito: 0,
    codigo: '',
    cantidad: 0,
    nombre: '',
    precio: 0
  };

  public valorCarrito: ValoresCarrito = {
    impuesto: 12,
    subTotal: 0,
    total: 0,
  };

  public detalleFactura: DetFactura = {
    codigoProducto: 0,
    cantidad: 0,
    cabFactura: 0
  }

  public factura: CabFactura = {
    numFactura: 0,
    impuesto: 0,
    dniCliente: '',
    subTotal: 0,
    total: 0,
    detFacturas: []
  };
  


  constructor(private _clienteService: CustomerService,
    private _productoService: ProductService,
    private _cabfacturaService: CabFacturaService,
    private _router: Router,
    private _currencyPipe: CurrencyPipe,
    private _datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getCustomers();
    this.getProducts();
    this.getLastInvoiceId();
  }


  public async getCustomers() {

    await this._clienteService.getAll(this.token).subscribe(clientes => {
      this.clientes = clientes.data;
    });

  }

  public async getProducts() {

    await this._productoService.getAll(this.token).subscribe(productos => {
      this.productos = productos.data;
    });

  }

  public async validarCliente(id: any) {

    await this._clienteService.getById(id,this.token).subscribe(
      response => {
        if (response.data != undefined) {
          this.cliente = response.data;
          this.existCustomer = true;
        }
        else {
          this.data = false;
          this.load_data = false;
          this.existCustomer = false;
        }
      }
    );

  }

  public async validarProducto(id: any) {

    await this._productoService.getById(id,this.token).subscribe(
      response => {
        if (response.data != undefined) {
          this.producto = response.data;
          this.existProduct = true;
          this.transformAmount();
        }
        else {
          this.data = false;
          this.load_data = false;
          this.existProduct = false;
        }
      }
    );

  }

  public transformAmount() {

    this.precioTransform = this.producto.precio?.toString() ?? '';
    this.precioTransform = this._currencyPipe.transform(this.precioTransform, '$') ?? '';

  }

  public agregarCarrito(producto: Producto) {

    this.ultimoIdProducto++;
    this.productoCarrito = {
      idProducto: producto.idProducto,
      idProductoCarrito: this.ultimoIdProducto,
      codigo: producto.codigo,
      cantidad: this.cantidadProducto,
      nombre: producto.nombre,
      precio: producto.precio ?? 0
    };

    this.isEmptyCart = false,
    this.valorCarrito.subTotal += this.productoCarrito.precio * this.productoCarrito.cantidad;
    this.valorCarrito.total = this.valorCarrito.subTotal + ((this.valorCarrito.subTotal * this.valorCarrito.impuesto) / 100);
    this.productosCarrito.push(this.productoCarrito);

  }

  public quitarCarrito(producto: ProductoCarrito) {

    this.valorCarrito.subTotal -= producto.precio * producto.cantidad;
    this.valorCarrito.total = this.valorCarrito.subTotal + ((this.valorCarrito.subTotal * this.valorCarrito.impuesto) / 100);
    this.productosCarrito = this.productosCarrito.filter(productoc => productoc.idProductoCarrito != producto.idProductoCarrito);
    this.productosCarrito.length === 0 ? this.isEmptyCart = true : false

  }


  public async generarFactura() {

    this.productosCarrito.forEach(element => {
      this.detalleFactura = {
        cantidad: element.cantidad,
        codigoProducto: element.idProducto
      };
      this.detallesFacturas.push(this.detalleFactura);
    });


    this.factura = {
      numFactura: this.ultimoNumFactura,
      impuesto: this.valorCarrito.impuesto,
      dniCliente: this.cliente.identificacion,
      subTotal: this.valorCarrito.subTotal,
      total: this.valorCarrito.total,
      detFacturas: this.detallesFacturas
    }

    await this._cabfacturaService.create(this.factura,this.token).subscribe(
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
        }
        else {
          setTimeout(() => {
          }, 10000);
          $.notify('Se ha registrado la factura correctamente', {
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
          this._router.navigate(['/factura'])
        }
      });
  }

  public getLastInvoiceId() {
    this._cabfacturaService.getLastId(this.token).subscribe(response => {
      this.ultimoNumFactura = response.data + 1;
    });
  }

  registrar(registroModalForm : any)  {
    if (registroModalForm.valid) {
      this.btn_registrar = true;
      this._clienteService.create(this.clienteModal,this.token).subscribe(
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
            window.location.reload();
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
