import {Component, effect, inject, OnInit} from '@angular/core';
import Keycloak from 'keycloak-js';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs } from 'keycloak-angular';
import {Router, RouterLink} from "@angular/router";
import {CreateEmployeesComponent} from "../create-employees/create-employees-component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-menu',
  templateUrl: './menu-component.html',
  imports: [RouterLink, CreateEmployeesComponent, NgIf,],
  styleUrls: ['./menu-component.css']
})
export class MenuComponent implements OnInit
{
  authenticated = false;
  private readonly keycloak = inject(Keycloak);
  private readonly router = inject(Router);
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

  constructor() {
    effect(() => {
      const keycloakEvent = this.keycloakSignal();

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.authenticated = false;
      }
    });
  }

  login() {
    if (!this.keycloak.authenticated) {
      this.keycloak.login();
    }
  }

  logout() {
    this.keycloak.logout();
  }

  onCreateEmployeeClick(): void {
    if (this.authenticated)
    {
      this.router.navigate(['/create-employees']);
    }
    else {
      console.log('Something went wrong!');
    }
  }

  ngOnInit() {
    console.log(this.keycloak.authenticated);
    console.log(this.keycloak.token);
    console.log(this.keycloak);
  }
}
