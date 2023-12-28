import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      numeroUsuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userSession = localStorage.getItem('usuarioSesion');
    if(userSession) {
      this.router.navigate(['/tareas']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = {
        numeroUsuario: this.loginForm.value.numeroUsuario,
        contrasena: this.loginForm.value.contrasena
      };

      const userSession = localStorage.getItem('usuarioSesion') || localStorage.getItem('usuarioRegistrado');
      if (userSession) {
        const storedUser = JSON.parse(userSession);
        if (loginData.numeroUsuario === storedUser.numeroUsuario.toString() && loginData.contrasena === storedUser.contrasena) {
          this.LoginSuccess(storedUser);
          return;
        }
      }

      this.appService.login(loginData).subscribe(user => {
        if (user) {
          this.LoginSuccess(user);
        } else {
          console.log('Credenciales incorrectas o usuario no encontrado');
        }
      });
    }
  }

  LoginSuccess(user: any): void {
    localStorage.setItem('usuarioSesion', JSON.stringify(user));
    this.appService.setSessionCookie(user);
    switch (user.tipoUsuario) {
      case 'superAdmin':
        this.router.navigate(['/register']);
        console.log('superAdmin');
        break;
      case 'auxiliar':
        this.router.navigate(['/tareas']);
        console.log('auxiliar');
        break;
      case 'operario':
        this.router.navigate(['/tareas']);
        console.log('operario');
        break;
      default:
        console.log('Tipo de usuario no reconocido');
        break;
    }
  }
  
}

