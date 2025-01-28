import { NgModule } from '@angular/core';
import {RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { createAuthGuard, AuthGuardData } from 'keycloak-angular';
import { MenuComponent} from "./menu-component/menu-component";
import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import {CreateEmployeesComponent} from "./create-employees/create-employees-component";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {QualificationEditComponent} from "./qualification-edit/qualification-edit.component";


 /**
 * Prüft, ob der Benutzer auf die angeforderte Route zugreifen darf.
 * Überprüft die Authentifizierung und die erforderlichen Rollen.
 * Wenn der Benutzer authentifiziert ist und die erforderliche Rolle hat, wird der Zugriff gewährt.
 * Andernfalls wird der Benutzer zur "/forbidden"-Seite umgeleitet.
 */

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;

  console.log('Authenticated:', authenticated);
  console.log('grantedRoles:', grantedRoles);

  const requiredRole = route.data['role'];
  if (!requiredRole) {
    return false;
  }

  const hasUserRole = () : any => {
    if (grantedRoles.realmRoles && grantedRoles.realmRoles.includes(requiredRole)) {
      return true;
    }
    Object.values(grantedRoles.resourceRoles).some((roles) => roles.includes(requiredRole));
  };

  console.log('User has required role:', hasUserRole());

  if (authenticated && hasUserRole()) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/forbidden');
};

 /**
 * Erstellt eine AuthGuard-Funktion, die die Zugriffserlaubnis überprüft.
 */

export const canActivateAuthRole = createAuthGuard(isAccessAllowed);

 /**
 * Definiert die Routen für die Anwendung.
 * Jede Route hat eine zugeordnete Komponente und eine AuthGuard-Funktion, die den Zugriff basierend auf der Rolle des Benutzers überprüft.
 */

export const routes: Routes =
  [
  { path: 'app-menu',                 component: MenuComponent,               canActivate: [canActivateAuthRole]                         },
  { path: 'create-employees',         component: CreateEmployeesComponent,    canActivate: [canActivateAuthRole], data: { role: 'user' } },
  { path: 'app-employee-list',        component: EmployeeListComponent,       canActivate: [canActivateAuthRole], data: { role: 'user' } },
  { path: 'app-qualification-edit',   component: QualificationEditComponent,  canActivate: [canActivateAuthRole], data: { role: 'user' } },
  { path: '**',                       redirectTo: '/forbidden'                                                                           }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
