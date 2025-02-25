import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Qualification } from '../Qualification';
import Keycloak from 'keycloak-js';
import {Employee} from "../Employee";

@Component({
  selector: 'app-qualification-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './qualification-edit.component.html',
  styleUrl: './qualification-edit.component.css'
})
export class QualificationEditComponent {
  Skill = ''; // Skill der Qualifikation
  EditSkill = '';
  // qualificationId: number | undefined; // ID der Qualifikation (falls vorhanden)
  private readonly keycloak = inject(Keycloak);
  employees: Employee[] = []; // Liste der Mitarbeiter
  selectedEmployees: Employee[] = []; // Ausgewählte Mitarbeiter (gesamtes Objekt)
  qualifications: Qualification [] = [];
  selectedQualifications: Qualification[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.http = http;
    this.fetchEmployees()
    this.fetchQualifications()
  }

  fetchQualifications() {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.keycloak.token}`);

    this.http.get<Qualification[]>('http://localhost:8089/qualifications', { headers })
      .subscribe({
        next: (data) => { this.qualifications = data; },
        error: (error) => { console.error('Fehler beim Laden der Qualifikationen:', error); }
      });
  }

  /**
   * Prüft, ob eine Qualifikation bereits ausgewählt wurde.
   */
  isQualificationSelected(qualification: Qualification): boolean {
    return this.selectedQualifications.some(q => q.skill === qualification.skill);
  }

  /**
   * Fügt oder entfernt Qualifikationen aus der Auswahl.
   */
  toggleQualificationSelection(qualification: Qualification) {
    const index = this.selectedQualifications.findIndex(q => q.skill === qualification.skill);
    if (index === -1) {
      this.selectedQualifications.push(qualification);
    } else {
      this.selectedQualifications.splice(index, 1);
    }
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

  /**
   * Speichert die bearbeitete Qualifikation.
   */
  saveQualification() {
    if (!this.Skill.trim()) {
      alert('Bitte einen Skill eingeben!');
      return;
    }

    const updatedQualification = new Qualification(this.Skill);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.keycloak.token}`);

    this.http.put<Qualification>(`http://localhost:8089/qualifications`, updatedQualification, { headers })
      .subscribe({
        next: () => {
          alert('Qualifikation erfolgreich aktualisiert!');
          this.resetForm();
        },
        error: (error) => {
          console.error('Fehler beim Aktualisieren:', error);
          alert('Fehler beim Aktualisieren der Qualifikation!');
        }
      });
  }

  /**
   * Setzt das Formular zurück.
   */
  resetForm() {
    this.Skill = '';
    this.EditSkill = '';
  }

  /**
   * Navigiert zurück zur Hauptseite.
   */
  BackToMainPage() {
    this.router.navigate(['/app-menu']);
  }
}
