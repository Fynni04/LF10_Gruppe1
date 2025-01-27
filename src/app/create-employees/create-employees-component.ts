import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import {FormsModule} from "@angular/forms";
import {Qualification} from "../Qualification";
import Keycloak from "keycloak-js";

@Component({
    selector: 'create-employees',
    imports: [CommonModule, FormsModule],
    templateUrl: './create-employees-component.html',
    styleUrl: './create-employees-component.css'
})

export class CreateEmployeesComponent {
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzgwMTQ4MTEsImlhdCI6MTczODAxMTIxMSwianRpIjoiY2RlMDNlMDctZTgwMC00ZmVmLWE3YjUtYzY3ZmMyNDcwZDEzIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiIwZDNjZDczZi0wZTkzLTQ3YjYtOTFhNy1mZDgyNzQ4NWQyYzUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.TxtJmvYI0DOYRNnrQWFHhmBu_Mhi9pXHNnlFl29LTk4V1mKnFSp4josX-g69jIDpmqFKReqYtNm9s9j7lJs17sYCAh0okSF3xB_EU4z6b4JjQiaLO7wIpLM8uwb8Cu_qXCIDI450x_p3EGG9R4JvlYvis-6yMQfW_h2_LzT3uHuq0WmTe8KMBG_DvYzhQvJn8hMBDxd4gibNhU5dxPCacByO0SMO8yI587woalQEHsJc8MXNWfueFATWxYh6-d_yGkQpvlMmBjYlfcVhrMHiQOJXbxeCO2GEDcpw8LpS5KoHX--jTxnBoCSMVk_P1SCIMstrpTsZ8bc_sR6wr2p2eQ';
  employeeName = '';
  employeeSurname = '';
  employeeStreet = '';
  employeePostcode = '';
  employeeCity = '';
  employeePhone = '';
  qualSkill = '';
  qualifications: Qualification[] = [];

  constructor(private http: HttpClient) {}

  private readonly keycloak = inject(Keycloak);


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

    if (this.keycloak.authenticated) {
      console.log('Keycloak is authenticated!')
    }

    console.log('New Employee: ', newEmployee);

    if(!this.bearer) {
      console.log('Authorization token is missing!');
      return;
    } else {
      console.log('Bearer: ' + this.bearer);
    }

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
