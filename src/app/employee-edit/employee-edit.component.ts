import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import {FormsModule} from "@angular/forms";
import {Qualification} from "../Qualification";
import Keycloak from "keycloak-js";
import { ActivatedRoute } from '@angular/router';


/*
export class EmployeeEditComponent implements OnInit {
  employee: Employee;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private myEmployee: EmployeeEditComponent
  ) {
    let employeeID = this.route.snapshot.paramMap.get("employeeID");
  }
}*/

@Component({
  selector:                      'employee-edit',
  imports:              [CommonModule, FormsModule],
  templateUrl:  './employee-edit.component.html',
  styleUrl:      './employee-edit.component.css'
})

export class EmployeeEditComponent {
  employeeId: string | null = null;


  constructor(private route: ActivatedRoute) {}
  private readonly keycloak = inject(Keycloak);
  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    console.log('Employee ID:', this.employeeId);
  }

  employeeName             = '' ;
  employeeSurname          = '' ;
  employeeStreet           = '' ;
  employeePostcode         = '' ;
  employeeCity             = '' ;
  employeePhone            = '' ;
  qualSkill                = '' ;
  qualifications: Qualification[] = [] ;
  /**
   * Fügt eine neue Qualifikation zur Liste der Qualifikationen hinzu.
   * Wenn ein qualSkill vorhanden ist, wird eine neue Qualifikation erstellt und zur Liste hinzugefügt.
   * Danach wird das qualSkill-Feld geleert.
   */
  getEmployeebyID(){

  }
  addQualification()
  {
    if (this.qualSkill)
    {
      this.qualifications.push(new Qualification(this.qualSkill));
      this.qualSkill = '';
    }
  }

  /**
   * Speichert einen neuen Mitarbeiter.
   * Erstellt ein neues Employee-Objekt mit den eingegebenen Daten und sendet eine POST-Anfrage an den Server.
   * Die Anfrage enthält den Bearer-Token zur Authentifizierung.
   * Bei Erfolg wird eine Erfolgsmeldung angezeigt und das Formular zurückgesetzt.
   * Bei Fehler wird eine Fehlermeldung angezeigt.
   */

  fetchData(employeeId : string) {
    this.employees$ = this.http.get<Employee>('http://localhost:8089/employees/' + employeeId, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.keycloak.token}`)
    });
  }
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



  }

  /**
   * Setzt das Formular zurück.
   * Alle Eingabefelder und die Liste der Qualifikationen werden geleert.
   */

  resetForm() {
    this.employeeSurname    = '';
    this.employeeStreet     = '';
    this.employeePostcode   = '';
    this.employeeCity       = '';
    this.employeePhone      = '';
    this.qualifications     = [];
  }
}
