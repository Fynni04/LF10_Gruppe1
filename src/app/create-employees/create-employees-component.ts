import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import {FormsModule} from "@angular/forms";
import {Qualification} from "../Qualification";

@Component({
    selector: 'create-employees',
    imports: [CommonModule, FormsModule],
    templateUrl: './create-employees-component.html',
    styleUrl: './create-employees-component.css'
})

export class CreateEmployeesComponent {
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3Mzc1NDI2MTIsImlhdCI6MTczNzUzOTAxMiwianRpIjoiMTU4ZTBhNzgtMGQ3Zi00ZWZmLThmZmYtZGRhMzk3MDE2MzQ3IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI5ODllNjUyOS1jYjM4LTRkOWMtODE1Ni0yNjQ1MTk0Zjc4YjgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.a-FoisMDb1jON6Oue77htEYTcggZLcdDA5elGl3g1U7E1YAKhTO1GoaZCFyhKM2V3eDqGZIDqrTTZYRbdQmtqrMbQ9h_EeeF0CdUOz_bTXIsZwD7X8xvHQpKluICTSeNsJyTbPq7zWVEmRdia_Tc0el0Klg5O0Wb1LA_6z6gkw-rgOnmMQ8HsQTptgsinwP_L9yXF39IdNJPZjbQ-blwJ77piHWn8GPhWmuKRw4ewDGLAfKcM5x4AwZtBCK2GBZucpPQWxiEe4k4ynxurmpq6TEwET_ZVOg0a2CR6ct2H8wgQrU9TSnDZ-nr6kSYtEkHKkAfN08ukmbi5x0GiHC_Iw';
  employeeName = '';
  employeeSurname = '';
  employeeStreet = '';
  employeePostcode = '';
  employeeCity = '';
  employeePhone = '';
  qualSkill = '';
  qualifications: Qualification[] = [];

  constructor(private http: HttpClient) {}

  addQualification()
  {
    if (this.qualSkill)
    {
      this.qualifications.push(new Qualification(this.qualSkill));
      this.qualSkill = '';
    }
  }

  saveEmployee() {
    const newEmployee: Employee = new Employee(
      undefined,
      this.employeeSurname,
      this.employeeName,
      this.employeeStreet,
      this.employeePostcode,
      this.employeeCity,
      this.employeePhone,
      this.qualifications
    );

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.bearer}`);

    this.http.post<Employee>('http://localhost:8089/employees', newEmployee, { headers })
      .subscribe({
        next: (response) => {
          console.log('Employee successfully created:', response);
          alert('Mitarbeiter erfolgreich erstellt!');
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating employee:', error);
          alert('Fehler beim Erstellen des Mitarbeiters!');
        }
      });
  }

  resetForm() {
    this.employeeName = '';
    this.employeeSurname = '';
    this.employeeStreet = '';
    this.employeePostcode = '';
    this.employeeCity = '';
    this.employeePhone = '';
    this.qualifications = [];
  }
}
