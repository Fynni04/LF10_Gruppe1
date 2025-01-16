import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {map, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../models/Employee";
import {EmployeeService} from "../services/employee.service";
import {EmployeeCreateDto} from "../models/EmployeeCreateDto";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;
  employee?: Employee;

  constructor(private http: HttpClient, private service: EmployeeService) {
    /*const employee = new EmployeeCreateDto('lastname', 'name', 'some street', '12345', 'some place', '0163456789');
    this.service.insert(employee).subscribe((data )=>{
      console.log(data);
    });*/
    //this.employees$ = service.selectAll();
    service.select(6).subscribe({
      next: (employee: Employee) => {
        this.employee = employee; // Assign the retrieved employee
        //this.employee.firstName = 'newName';
        //this.employee.lastName = 'newLastName';
        //service.update(this.employee);
        console.log('Employee fetched:', this.employee);
        //service.delete(4);
        this.service.delete(6);

      },
      error: (err) => {
        console.error('Error fetching employee:', err.message);
      },
    });

    this.employees$ = service.selectAll();

  }

}
