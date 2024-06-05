import { DetFactura } from "./detfactura";

export interface CabFactura {
    idFactura?:number;
    numFactura:number;
    dniCliente:string;
    impuesto:number;
    subTotal:number;
    total:number;
    detFacturas: Array<DetFactura>;
}