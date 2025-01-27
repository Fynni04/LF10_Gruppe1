import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeeEditComponent} from "./employee-edit/employee-edit.component";
import {QualificationListComponent} from "./qualification-list/qualification-list.component";
import {QualificationCreateComponent} from "./qualification-create/qualification-create.component";
import {QualificationEditComponent} from "./qualification-edit/qualification-edit.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, EmployeeEditComponent, QualificationListComponent, QualificationCreateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lf10StarterNew';
}
