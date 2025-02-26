import { Component, effect, inject, OnInit } from '@angular/core';
import Keycloak from 'keycloak-js';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs } from 'keycloak-angular';
import { RouterLink, Router } from "@angular/router";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-menu',
  templateUrl: './menu-component.html',
  standalone: true,
  imports: [NgIf],
  styleUrls: ['./menu-component.css']
})
export class MenuComponent {

  authenticated = false;
  private readonly keycloak = inject(Keycloak);
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

  constructor(private router: Router) {

    /**
     * Überwacht Keycloak-Ereignisse und aktualisiert den Authentifizierungsstatus.
     * Wenn Keycloak bereit ist, wird der Authentifizierungsstatus gesetzt.
     * Wenn eine Abmeldung erfolgt, wird der Authentifizierungsstatus auf false gesetzt.
     */
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

  navigateTo(route: string) {
    if (route) {
        this.router.navigate([route]);
      }
    }
}
