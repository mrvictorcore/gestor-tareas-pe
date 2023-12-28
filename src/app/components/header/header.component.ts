import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router, private appService: AppService) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.appService.clearUserSession();
    this.navigateTo('/login');
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('usuarioSesion');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (
      !target.closest(".navbar-collapse") &&
      !target.closest(".navbar-toggler")
    ) {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse?.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
      }
    }
  }
}
