import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CabFactura } from '../interfaces/cabfactura';


@Injectable({
  providedIn: 'root'
})
export class CabFacturaService {

  public url = environment.urlApi;

  constructor(private _http:HttpClient) {

  }

  
  getAll():Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.get<any>(`${this.url}CabeceraFacturas/GetAll`,{headers:headers})
  }

  getById(id:number){
    return this._http.get<any>(`${this.url}CabeceraFacturas/Get/${id}`)
  }

  update(id:number,cab:CabFactura){
    return this._http.put<any>(`${this.url}CabeceraFacturas/Update/${id}`,cab)
  }

  create(invoice:CabFactura){
    return this._http.post<any>(`${this.url}CabeceraFacturas/Create`,invoice)
  }

  delete(id:number){
    return this._http.delete<any>(`${this.url}CabeceraFacturas/Delete/${id}`)
  }

  getLastId():Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.get<any>(`${this.url}CabeceraFacturas/getLastId`,{headers:headers})
  }

}
