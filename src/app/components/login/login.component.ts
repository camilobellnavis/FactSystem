import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario :Usuario = {
    nombreUsuario: '',
    contrasena: ''
  };
  public token:any = localStorage.getItem('token');
  public btn_loguear = false;


  constructor(private _userService: UserService, private _router:Router) { }

  ngOnInit(): void {
  }

  login(){
    const usuarioParaEnviar = {
      ...this.usuario,
      contraseña: this.usuario.contrasena
    };
    delete usuarioParaEnviar.contrasena;

    if (!this.usuario.nombreUsuario) {
      $.notify('Debes ingresar el correo electronico', { 
        type: 'danger',
        spacing: 10,                    
        timer: 2000,
        placement: {
            from: 'top', 
            align: 'right'
        },
        delay: 1000,
        animate: {
            enter: 'animated ' + 'bounce',
            exit: 'animated ' + 'bounce'
        }
      });
    } else if(!this.usuario.contrasena) {
      $.notify('Debes ingresar la contraseña', { 
        type: 'danger',
        spacing: 10,                    
        timer: 2000,
        placement: {
            from: 'top', 
            align: 'right'
        },
        delay: 1000,
        animate: {
            enter: 'animated ' + 'bounce',
            exit: 'animated ' + 'bounce'
        }
      });
    }
    else{
      this.btn_loguear = true;
      this._userService.login_admin(usuarioParaEnviar).subscribe(
        response =>{
          console.log(response);
          if(response.data == undefined){
            $.notify(response , { 
              type: 'danger',
              spacing: 10,                    
              timer: 2000,
              placement: {
                  from: 'top', 
                  align: 'right'
              },
              delay: 1000,
              animate: {
                  enter: 'animated ' + 'bounce',
                  exit: 'animated ' + 'bounce'
              }
            });
            this.btn_loguear = false;
          }
          else{

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('_id', response.data._id);
            setTimeout(() => {
              this.btn_loguear = false;
              this._router.navigate(['/dashboard']);
            }, 2000);



          
            
          }

      });
      
    }
    
  }

}
