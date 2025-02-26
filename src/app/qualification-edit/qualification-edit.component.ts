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
  Id: number | undefined;
  Skill = ''; // Skill der Qualifikation
  EditSkill = '';
  qualificationId: number | undefined; // ID der Qualifikation (falls vorhanden)
  private readonly keycloak = inject(Keycloak);
  // employees: Employee[] = []; // Liste der Mitarbeiter
  // selectedEmployees: Employee[] = []; // Ausgewählte Mitarbeiter (gesamtes Objekt)
  qualifications: Qualification [] = [];
  selectedQualifications: Qualification[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.http = http;
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
    return this.selectedQualifications.some(q => q.id === qualification.id);
  }

  /**
   * Fügt oder entfernt Qualifikationen aus der Auswahl.
   */
  toggleQualificationSelection(qualification: Qualification) {
    const index = this.selectedQualifications.findIndex(q => q.id === qualification.id);
    if (index === -1) {
      this.selectedQualifications.push(qualification);
    } else {
      this.selectedQualifications.splice(index, 1);
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

    const updatedQualification = new Qualification(this.Id, this.Skill);
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
