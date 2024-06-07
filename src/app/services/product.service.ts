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

  
  getAll(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.get<any>(`${this.url}Productos/GetAll`,{headers:headers})
  }

  getById(id:number,token:any){
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.get<any>(`${this.url}Productos/Get/${id}`,{headers:headers})
  }

  update(id:number,customer:Producto,token:any){
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.put<any>(`${this.url}Productos/Update/${id}`,customer,{headers:headers})
  }

  create(customer:Producto,token:any){
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.post<any>(`${this.url}Productos/Create`,customer,{headers:headers})
  }

  delete(id:number,token:any){
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this._http.delete<any>(`${this.url}Productos/Delete/${id}`,{headers:headers})
  }
}
