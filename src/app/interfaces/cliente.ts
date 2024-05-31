export interface Cliente {
    idCliente?:number;
    nombre:string;
    identificacion:string;
    correo:string;
    direccion:string;
    fechaCreacion:string;
    activo?: number;
}