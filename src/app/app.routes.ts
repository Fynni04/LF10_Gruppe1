import { NgModule } from '@angular/core';
import {RouterModule, Routes, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { createAuthGuard, AuthGuardData } from 'keycloak-angular';
import { MenuComponent} from "./menu-component/menu-component";
import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import {CreateEmployeesComponent} from "./create-employees/create-employees-component";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {QualificationEditComponent} from "./qualification-edit/qualification-edit.component";
import {QualificationListComponent} from "./qualification-list/qualification-list.component";

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

export const canActivateAuthRole = createAuthGuard(isAccessAllowed);


export const routes: Routes = [
  { path: 'app-menu', component: MenuComponent, canActivate: [canActivateAuthRole] },
  { path: 'create-employees', component: CreateEmployeesComponent, canActivate: [canActivateAuthRole], data: { role: 'user' } },
  { path: 'app-employee-list', component: EmployeeListComponent, canActivate: [canActivateAuthRole], data: { role: 'user' } },
  { path: 'app-qualification-edit', component: QualificationEditComponent, canActivate: [canActivateAuthRole], data: { role: 'user' } },
  { path: 'app-qualification-list', component: QualificationListComponent, canActivate: [canActivateAuthRole], data: { role: 'user' } },
  { path: '**', redirectTo: '/forbidden' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
