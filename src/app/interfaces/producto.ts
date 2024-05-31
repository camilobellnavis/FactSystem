export interface Producto {
    idProducto?:number;
    activo?: number;
    codigo:string;
    fechaCreacion:string;
    nombre:string;
    precio?:number;
    inventario:number;
}