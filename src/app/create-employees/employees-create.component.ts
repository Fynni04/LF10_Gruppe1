import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import {FormsModule} from "@angular/forms";
import {Qualification} from "../Qualification";
import Keycloak from "keycloak-js";

@Component({
    selector:                   'app-employee-create',
    imports:              [CommonModule, FormsModule],
    templateUrl:  './employees-create.component.html',
    styleUrl:      './employees-create.component.css'
})

export class EmployeesCreateComponent {
  employeeName             = '' ;
  employeeSurname          = '' ;
  employeeStreet           = '' ;
  employeePostcode         = '' ;
  employeeCity             = '' ;
  employeePhone            = '' ;
  qualifications: Qualification[] = [] ;

  constructor(private http: HttpClient, private router: Router) {}
  private readonly keycloak = inject(Keycloak);

   /**
   * Speichert einen neuen Mitarbeiter.
   * Erstellt ein neues Employee-Objekt mit den eingegebenen Daten und sendet eine POST-Anfrage an den Server.
   * Die Anfrage enthält den Bearer-Token zur Authentifizierung.
   * Bei Erfolg wird eine Erfolgsmeldung angezeigt und das Formular zurückgesetzt.
   * Bei Fehler wird eine Fehlermeldung angezeigt.
   */

  saveEmployee() {
    const newEmployee: Employee = new Employee(
      undefined             ,
      this.employeeSurname  ,
      this.employeeName     ,
      this.employeeStreet   ,
      this.employeePostcode ,
      this.employeeCity     ,
      this.employeePhone    ,
      this.qualifications
    );

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.keycloak.token}`);

    this.http.post<Employee>( 'http://localhost:8089/employees', newEmployee, { headers } )
      .subscribe
      (
        {
        next: (response) =>
          {
            console.log('Employee successfully created:', response);
            alert('Mitarbeiter erfolgreich erstellt!');
            this.resetForm();
          },
          error: (error) =>
          {
            console.error('Error creating employee:', error);
            alert('Fehler beim Erstellen des Mitarbeiters!');
          }
        }
      );
  }

   /**
   * Setzt das Formular zurück.
   * Alle Eingabefelder und die Liste der Qualifikationen werden geleert.
   */

  resetForm() {
    this.employeeName       = '';
    this.employeeSurname    = '';
    this.employeeStreet     = '';
    this.employeePostcode   = '';
    this.employeeCity       = '';
    this.employeePhone      = '';
  }

  BackToMainPage() {
      this.router.navigate(['/app-menu'])
    }
}
