import { Component, inject } from '@angular/core';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'menu-component',
  standalone: true,
  templateUrl: './menu-component.html',
  styleUrls: ['./menu-component.css']
})

export class MenuComponent {
  private readonly keycloak = inject(Keycloak);

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }
}
