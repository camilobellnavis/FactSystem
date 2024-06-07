import { Component, OnInit } from '@angular/core';
import { CabFactura } from 'src/app/interfaces/cabfactura';
import { CabFacturaService } from 'src/app/services/cabfactura.service';

@Component({
  selector: 'app-index-invoice',
  templateUrl: './index-invoice.component.html',
  styleUrls: ['./index-invoice.component.css']
})
export class IndexInvoiceComponent implements OnInit {
  public filtro = undefined;
  public facturasConstantes: Array<any> = []; 
  public facturas:  Array<CabFactura> = []; 
  public token = localStorage.getItem('token');

  constructor(private _cabfacturaService: CabFacturaService) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this.getInfo();
  }

  getInfo(){
    this._cabfacturaService.getAll(this.token).subscribe(invoice => {
      this.facturas = invoice.data;
      this.facturasConstantes = this.facturas;

    }); 
  }

  filtrarFacturas(){
    if (this.filtro) {
      var term = new RegExp(this.filtro, 'i');
      this.facturas = this.facturasConstantes.filter(item=> term.test(item.numFactura));
    } else {
      this.facturas = this.facturasConstantes;
    }

  }

}
