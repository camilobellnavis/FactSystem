import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DetFactura } from '../interfaces/detfactura';


@Injectable({
  providedIn: 'root'
})
export class DetFacturaService {

  public url = environment.urlApi;

  constructor(private _http:HttpClient) {

  }

  getAll():Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.get<any>(`${this.url}DetalleFacturas/GetAll`,{headers:headers})
  }

  getById(id:number){
    return this._http.get<any>(`${this.url}DetalleFacturas/Get/${id}`)
  }

  update(id:number,cab:DetFactura){
    return this._http.put<any>(`${this.url}DetalleFacturas/Update/${id}`,cab)
  }

  create(detail:DetFactura){
    return this._http.post<any>(`${this.url}DetalleFacturas/Create`,detail)
  }

  delete(id:number){
    return this._http.delete<any>(`${this.url}DetalleFacturas/Delete/${id}`)
  }

  getLastId():Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.get<any>(`${this.url}DetalleFacturas/getLastId`,{headers:headers})
  }

}