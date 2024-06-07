//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { routing } from './app.routing';

//Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { TopComponent } from './components/top/top.component';
import { CreateClientComponent } from './components/cliente/create-client/create-client.component';
import { EditClientComponent } from './components/cliente/edit-client/edit-client.component';
import { IndexClientComponent } from './components/cliente/index-client/index-client.component';
import { ListClientComponent } from './components/cliente/list-client/list-client.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CreateProductComponent } from './components/producto/create-product/create-product.component';
import { EditProductComponent } from './components/producto/edit-product/edit-product.component';
import { IndexProductComponent } from './components/producto/index-product/index-product.component';
import { FacturaComponent } from './components/factura/factura.component';
import { CreateInvoiceComponent } from './components/factura/create-invoice/create-invoice.component';
import { IndexInvoiceComponent } from './components/factura/index-invoice/index-invoice.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    SidebarComponent,
    ClienteComponent,
    TopComponent,
    CreateClientComponent,
    EditClientComponent,
    IndexClientComponent,
    ListClientComponent,
    NotFoundComponent,
    ProductoComponent,
    CreateProductComponent,
    EditProductComponent,
    IndexProductComponent,
    FacturaComponent,
    CreateInvoiceComponent,
    IndexInvoiceComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [DatePipe,CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
