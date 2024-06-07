import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndexClientComponent } from './components/cliente/index-client/index-client.component';
import { CreateClientComponent } from './components/cliente/create-client/create-client.component';
import { EditClientComponent } from './components/cliente/edit-client/edit-client.component';
import { IndexProductComponent } from './components/producto/index-product/index-product.component';
import { CreateProductComponent } from './components/producto/create-product/create-product.component';
import { EditProductComponent } from './components/producto/edit-product/edit-product.component';
import { IndexInvoiceComponent } from './components/factura/index-invoice/index-invoice.component';
import { CreateInvoiceComponent } from './components/factura/create-invoice/create-invoice.component';
import { LoginComponent } from './components/login/login.component';


const appRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: '', component: LoginComponent },
    { path: 'cliente', component: IndexClientComponent },
    { path: 'cliente/create', component: CreateClientComponent},
    { path: 'cliente/:id', component: EditClientComponent },
    { path: 'producto', component: IndexProductComponent },
    { path: 'producto/create', component: CreateProductComponent},
    { path: 'producto/:id', component: EditProductComponent },
    { path: 'factura', component: IndexInvoiceComponent },
    { path: 'generatefactura/create', component: CreateInvoiceComponent},
    {path:'**',redirectTo:'/', pathMatch:'full'}
];

export const AppRoutingProviders : any[] = [];
export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);