import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { QualificationEditComponent } from "./qualification-edit/qualification-edit.component";
import { CreateEmployeesComponent } from "./create-employees/create-employees-component";
import { MenuComponent} from "./menu-component/menu-component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    EmployeeListComponent,
    QualificationEditComponent,
    CreateEmployeesComponent,
    MenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lf10StarterNew';
}
