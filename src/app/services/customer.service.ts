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

  
  getAll():Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.get<any>(`${this.url}Clientes/GetAll`,{headers:headers})
  }

  getById(id:number){
    return this._http.get<any>(`${this.url}Clientes/Get/${id}`)
  }

  update(id:number,customer:Cliente){
    return this._http.put<any>(`${this.url}Clientes/Update/${id}`,customer)
  }

  create(customer:Cliente){
    return this._http.post<any>(`${this.url}Clientes/Create`,customer)
  }

  delete(id:number){
    return this._http.delete<any>(`${this.url}Clientes/Delete/${id}`)
  }
}
