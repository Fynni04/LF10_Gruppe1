import {Component, effect, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet, RouterModule, Router} from '@angular/router';
import {MenuComponent} from "./menu-component/menu-component";
import Keycloak from "keycloak-js";
import {KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs} from "keycloak-angular";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lf10StarterNew';

  authenticated                                = false                          ;
  private readonly keycloak                   = inject               (Keycloak);
  private readonly keycloakSignal   = inject  (KEYCLOAK_EVENT_SIGNAL);

  constructor() {

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

  /**
   * Führt den Login-Vorgang durch.
   * Wenn der Benutzer nicht authentifiziert ist, wird die Keycloak-Login-Methode aufgerufen.
   */
  login() {
    if (!this.keycloak.authenticated) {
      this.keycloak.login();
    }
  }

  /**
   * Führt den Logout-Vorgang durch.
   * Ruft die Keycloak-Logout-Methode auf.
   */
  logout() {
    this.keycloak.logout();
  }
}
