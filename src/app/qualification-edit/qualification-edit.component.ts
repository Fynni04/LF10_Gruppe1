import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Employee } from "../Employee";
import { FormsModule } from "@angular/forms";
import { Qualification } from "../Qualification";
import { ActivatedRoute, Router } from '@angular/router';
import Keycloak from "keycloak-js";

@Component({
  selector: 'app-qualification-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './qualification-edit.component.html',
  styleUrl: './qualification-edit.component.css'
})

export class QualificationEditComponent implements OnInit {
  private readonly keycloak = inject(Keycloak);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private router = inject(Router);

  qualificationId: number | null = null;
  qualificationSkill = ''; // Skill der Qualifikation
  selectedEmployees: Employee[] = [];
  employees: Employee[] = [];


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.qualificationId = +id; // Convert string to number
      this.fetchData(this.qualificationId);
      this.fetchEmployees();
    }
  }

  fetchData(qualificationId: number): void {
    this.http.get<Qualification>(`http://localhost:8089/qualifications/${qualificationId}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.keycloak.token}`)
    }).subscribe({
      next: (qualification) => {
        this.qualificationSkill = qualification.skill || '';
      },
      error: (err) => console.error('Error fetching employee:', err)
    });
  }



  fetchEmployees() {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.keycloak.token}`);

    this.http.get<Employee[]>('http://localhost:8089/employees', { headers })
      .subscribe({
        next: (data) => { this.employees = data; },
        error: (error) => { console.error('Fehler beim Laden der Mitarbeiter:', error); }
      });
  }


  isEmployeeSelected(employee: Employee): boolean {
    return this.selectedEmployees.some(e => e.id === employee.id);
  }
  /**
   * Fügt oder entfernt Mitarbeiter aus der Auswahl.
   */
  toggleEmployeeSelection(employee: Employee) {
    const index = this.selectedEmployees.findIndex(e => e.id === employee.id);
    if (index === -1) {
      this.selectedEmployees.push(employee);
    } else {
      this.selectedEmployees.splice(index, 1);
    }
  }




    saveQualification(): void {
      if (!this.qualificationId) {
      console.error('No qualification ID available');
      return;
    }

    const updatedQualification = new Qualification(
        this.qualificationId,
        this.qualificationSkill
      );

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.keycloak.token}`);

      this.http.put(`http://localhost:8089/qualifications/${this.qualificationId}`, updatedQualification, { headers })
        .subscribe({
          next: () =>{
            this.linkEmployeesToQualification(updatedQualification)
            this.router.navigate(['/'])
          } , // Adjust the route as needed
          error: (err) => console.error('Error updating qualification:', err)
        });
    }

  linkEmployeesToQualification(newQualification: Qualification) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.keycloak.token}`);

    this.selectedEmployees.forEach(employee => {
      this.http.post(`http://localhost:8089/employees/${employee.id}/qualifications/`, newQualification, { headers })
        .subscribe({
          next: () => this.router.navigate(['/']),
          error: (err) => console.error('Error updating employee:', err)
        });
    });
  }


  /**
   * Setzt das Formular zurück.
   */
  resetForm() {
    this.qualificationSkill = '';
  }

  goBack(): void {
    this.router.navigate(['/app-qualification-list']); // Adjust the route as needed
  }

  BackToMainPage() {
    this.router.navigate(['/app-menu'])
  }
}
