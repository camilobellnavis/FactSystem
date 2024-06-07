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

  getAll(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.get<any>(`${this.url}DetalleFacturas/GetAll`,{headers:headers})
  }

  getById(id:number,token:any){
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.get<any>(`${this.url}DetalleFacturas/Get/${id}`,{headers:headers})
  }

  update(id:number,cab:DetFactura,token:any){
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.put<any>(`${this.url}DetalleFacturas/Update/${id}`,cab,{headers:headers})
  }

  create(detail:DetFactura,token:any){
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.post<any>(`${this.url}DetalleFacturas/Create`,detail,{headers:headers})
  }

  delete(id:number,token:any){
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.delete<any>(`${this.url}DetalleFacturas/Delete/${id}`,{headers:headers})
  }

  getLastId(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.get<any>(`${this.url}DetalleFacturas/getLastId`,{headers:headers})
  }

}