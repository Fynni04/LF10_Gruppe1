import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {map, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../models/Employee";
import {EmployeeService} from "../services/employee.service";
import {EmployeeCreateDto} from "../models/EmployeeCreateDto";

@Component({
    selector: 'app-employee-list',
    imports: [CommonModule],
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;
  employee?: Employee;

  constructor(private http: HttpClient, private service: EmployeeService) {
    this.employees$ = service.selectAll();
  }

}
