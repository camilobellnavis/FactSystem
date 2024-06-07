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

  
  getAll(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.get<any>(`${this.url}CabeceraFacturas/GetAll`,{headers:headers})
  }

  getById(id:number,token:any){
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.get<any>(`${this.url}CabeceraFacturas/Get/${id}`,{headers:headers})
  }

  update(id:number,cab:CabFactura,token:any){
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.put<any>(`${this.url}CabeceraFacturas/Update/${id}`,cab,{headers:headers})
  }

  create(invoice:CabFactura,token:any){
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.post<any>(`${this.url}CabeceraFacturas/Create`,invoice,{headers:headers})
  }

  delete(id:number,token:any){
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.delete<any>(`${this.url}CabeceraFacturas/Delete/${id}`,{headers:headers})
  }

  getLastId(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.get<any>(`${this.url}CabeceraFacturas/getLastId`,{headers:headers})
  }

}
