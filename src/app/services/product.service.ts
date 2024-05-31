import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url = environment.urlApi;

  constructor(private _http:HttpClient) {

  }

  
  getAll():Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.get<any>(`${this.url}Productos/GetAll`,{headers:headers})
  }

  getById(id:number){
    return this._http.get<any>(`${this.url}Productos/Get/${id}`)
  }

  update(id:number,customer:Producto){
    return this._http.put<any>(`${this.url}Productos/Update/${id}`,customer)
  }

  create(customer:Producto){
    return this._http.post<any>(`${this.url}Productos/Create`,customer)
  }

  delete(id:number){
    return this._http.delete<any>(`${this.url}Productos/Delete/${id}`)
  }
}
