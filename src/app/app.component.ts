import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private appService: AppService) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('usuarioSesion');
  }

  logout(): void {
    this.appService.clearUserSession();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  navigateToTareas(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/tareas']);
    } else {
      console.log('El usuario ya está logueado');
    }
  }

  borrarCoockies(): void {
    this.appService.pruebasBorrarCoockies();
  }

  borrarSesionLocalStorage(): void {
    this.appService.clearUserSession();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
