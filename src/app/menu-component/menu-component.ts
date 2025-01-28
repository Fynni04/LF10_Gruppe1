import { Component, effect, inject, OnInit } from '@angular/core';
import Keycloak from 'keycloak-js';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs } from 'keycloak-angular';
import { RouterLink } from "@angular/router";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-menu',
  templateUrl: './menu-component.html',
  imports: [RouterLink, NgIf],
  styleUrls: ['./menu-component.css']
})
export class MenuComponent implements OnInit
{

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

   /**
   * Gibt den Authentifizierungsstatus und das Token von Keycloak in der Konsole aus.
   */
  ngOnInit() {
    console.log(this.keycloak.authenticated);
    console.log(this.keycloak.token);
    console.log(this.keycloak);
  }
}
