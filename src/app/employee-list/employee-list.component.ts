import {Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import Keycloak from "keycloak-js";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-employee-list',
  imports: [CommonModule, RouterLink],
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
  deleteEmployee(employeeID:any){
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.keycloak.token}`);

    this.http.delete<Employee>( 'http://localhost:8089/employees/'+employeeID, { headers } )
      .subscribe
      (
        {
          next: (response) =>
          {
            console.log('Employee deleted:', response);
            alert('Mitarbeiter erfolgreich gelöscht!');

          },
          error: (error) =>
          {
            console.error('Error deleting employee:', error);
            alert('Fehler beim Löschen des Mitarbeiters: '+employeeID+' !: ' + error);
          }
        }
      );
  }
}
