import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url = environment.urlApi;

  constructor(private _http:HttpClient) {

  }

  login_admin(data:Usuario):Observable<any>{
    return this._http.post(`${this.url}Usuarios/Authenticate`,data);
  } 

  getAll():Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.get<any>(`${this.url}Usuarios/GetAll`,{headers:headers})
  }

  getById(id:number){
    return this._http.get<any>(`${this.url}Usuarios/Get/${id}`)
  }

  update(id:number,customer:Usuario){
    return this._http.put<any>(`${this.url}Usuarios/Update/${id}`,customer)
  }

  create(customer:Usuario){
    return this._http.post<any>(`${this.url}Usuarios/Create`,customer)
  }

  delete(id:number){
    return this._http.delete<any>(`${this.url}Usuarios/Delete/${id}`)
  }
}
