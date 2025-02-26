import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Employee } from "../Employee";
import { FormsModule } from "@angular/forms";
import { Qualification } from "../Qualification";
import { ActivatedRoute, Router } from '@angular/router';
import Keycloak from "keycloak-js";

@Component({
  selector: 'app-employee-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  private readonly keycloak = inject(Keycloak);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private router = inject(Router);

  employeeId: number | null = null; // Change to number | null
  employeeName = '';
  employeeSurname = '';
  employeeStreet = '';
  employeePostcode = '';
  employeeCity = '';
  employeePhone = '';
  qualSkill = '';
  qualifications: Qualification[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeId = +id; // Convert string to number
      this.fetchData(this.employeeId);
    }
  }

  fetchData(employeeId: number): void {
    this.http.get<Employee>(`http://localhost:8089/employees/${employeeId}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.keycloak.token}`)
    }).subscribe({
      next: (employee) => {
        this.employeeName = employee.firstName || '';
        this.employeeSurname = employee.lastName || '';
        this.employeeStreet = employee.street || '';
        this.employeePostcode = employee.postcode || '';
        this.employeeCity = employee.city || '';
        this.employeePhone = employee.phone || '';
        this.qualifications = employee.qualifications || [];
      },
      error: (err) => console.error('Error fetching employee:', err)
    });
  }

  addQualification(): void {
    if (this.qualSkill) {
      this.qualifications.push(new Qualification(this.qualSkill));
      this.qualSkill = '';
    }
  }

  removeQualification(qualification: Qualification): void {
    this.qualifications = this.qualifications.filter(q => q !== qualification);
  }

  saveEmployee(): void {
    if (!this.employeeId) {
      console.error('No employee ID available');
      return;
    }

    const updatedEmployee = new Employee(
      this.employeeId,
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
      .set('Authorization', `Bearer ${this.keycloak.token}`);

    this.http.put(`http://localhost:8089/employees/${this.employeeId}`, updatedEmployee, { headers })
      .subscribe({
        next: () => this.router.navigate(['/']), // Adjust the route as needed
        error: (err) => console.error('Error updating employee:', err)
      });
  }

  resetForm(): void {
    this.employeeName = '';
    this.employeeSurname = '';
    this.employeeStreet = '';
    this.employeePostcode = '';
    this.employeeCity = '';
    this.employeePhone = '';
    this.qualifications = [];
  }

  goBack(): void {
    this.router.navigate(['/']); // Adjust the route as needed
  }
}
