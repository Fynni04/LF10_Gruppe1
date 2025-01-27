/**import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { QualificationEditComponent } from "./qualification-edit/qualification-edit.component";
import { CreateEmployeesComponent } from "./create-employees/create-employees-component";
import { MenuComponent} from "./menu-component/menu-component";
import {AppRoutingModule} from "./app.routes";

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterOutlet,
        RouterModule,
        EmployeeListComponent,
        QualificationEditComponent,
        CreateEmployeesComponent,
        MenuComponent,
      AppRoutingModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lf10StarterNew';
}**/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { QualificationEditComponent } from './qualification-edit/qualification-edit.component';
import { CreateEmployeesComponent } from './create-employees/create-employees-component';
import { MenuComponent } from './menu-component/menu-component';
import {Router, RouterLink, RouterOutlet} from '@angular/router';  // Only need this for routed components

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, // Just this one for displaying routed components
    MenuComponent,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lf10StarterNew';
}
