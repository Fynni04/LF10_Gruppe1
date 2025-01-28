import {Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import Keycloak from "keycloak-js";

@Component({
    selector: 'app-employee-list',
    imports: [CommonModule],
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;
  private readonly keycloak = inject(Keycloak);

  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    this.fetchData();
  }


  fetchData() {
    this.employees$ = this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.keycloak.token}`)
    });
  }
}
