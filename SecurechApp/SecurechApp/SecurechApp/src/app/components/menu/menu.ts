import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-menu',
  imports: [MatToolbarModule, MatButtonModule,MatIconModule,MatMenuModule,RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  role: string = '';
  usuario: string = '';

  constructor(private loginService: LoginService) {}

  cerrar() {
    sessionStorage.clear();
  }
  
 
  verificar() {
    this.role = this.loginService.showRole();

    return this.loginService.verificar();
  }
  isAdmin() {
    return this.role === 'ADMIN';
  }

  isMod() {
    return this.role === 'MODERADOR';
  }

  isUser() {
    return this.role === 'USER';
  }

  isAutoridad() {
    return this.role === 'AUTORIDAD';
  }
}
