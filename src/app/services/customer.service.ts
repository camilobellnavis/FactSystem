import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../interfaces/cliente';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public url = environment.urlApi;

  constructor(private _http:HttpClient) {

  }

  
  getAll(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.get<any>(`${this.url}Clientes/GetAll`,{headers:headers})
  }

  getById(id:number,token:any){
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.get<any>(`${this.url}Clientes/Get/${id}`,{headers:headers})
  }

  update(id:number,customer:Cliente,token:any){
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.put<any>(`${this.url}Clientes/Update/${id}`,customer,{headers:headers})
  }

  create(customer:Cliente,token:any){
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.post<any>(`${this.url}Clientes/Create`,customer,{headers:headers})
  }

  delete(id:number,token:any){
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.delete<any>(`${this.url}Clientes/Delete/${id}`,{headers:headers})
  }
}
