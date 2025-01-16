import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
    selector: 'app-root',
    imports: [CommonModule, EmployeeListComponent, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lf10StarterNew';
}
