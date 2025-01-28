import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import Keycloak from "keycloak-js";

@Component({
    selector: 'app-employee-edit',
    imports: [CommonModule],
    templateUrl: './employee-edit.component.html',
    styleUrl: './employee-edit.component.css'
})
export class EmployeeEditComponent {
  employee$: Observable<Employee>;
  private readonly keycloak = inject(Keycloak);

  constructor(private http: HttpClient) {
    this.employee$ = of();
    this.fetchData();
  }

  fetchData() {
    this.employee$ = this.http.get<Employee>('http://localhost:8089/employees/{1}', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.keycloak.token}`)
    });
  }

}
