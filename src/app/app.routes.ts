import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MenuComponent} from "./menu-component/menu-component";
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';

export const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    canActivate: [KeycloakAuthGuard],
  }
];
