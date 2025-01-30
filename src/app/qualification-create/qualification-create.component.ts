import {Component, inject} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import Keycloak from "keycloak-js";
import {CommonModule} from "@angular/common";
import {Employee} from "../Employee";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-qualification-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './qualification-create.component.html',
  styleUrl: './qualification-create.component.css'
})
export class QualificationCreateComponent {
  newSkill: string = '';
  employees: Employee[] = []; // Liste der Mitarbeiter
  selectedEmployees: Employee[] = []; // Ausgewählte Mitarbeiter (gesamtes Objekt)
  private readonly keycloak = inject(Keycloak);
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.fetchEmployees(); // Lade die Mitarbeiter beim Initialisieren der Komponente
  }

  /**
   * Lädt die Mitarbeiterliste vom Server.
   */
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
   * Speichert die neue Qualifikation mit den ausgewählten Mitarbeitern.
   */
  saveQualification() {
    if (!this.newSkill.trim()) { // 👈 Validierung für beide Felder
      alert('Bitte fülle alle Pflichtfelder aus!');
      return;
    }

    // Korrektur 1: Extrahiere nur die IDs
    const qualificationData = {
      skill: this.newSkill.trim(), // 👈 Hinzugefügt
      employeeIds: this.selectedEmployees.map(e => e.id)
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.keycloak.token}`);

    this.http.post('http://localhost:8089/qualifications', qualificationData, { headers })
      .subscribe({
        next: () => {
          alert('Qualifikation erfolgreich erstellt!');
          this.resetForm();
        },
        error: (error) => {
          // Verbesserte Fehlermeldung mit Backend-Response
          console.error('Fehler:', error);
          const errorMsg = error.error?.message || 'Unbekannter Fehler';
          alert(`Fehler beim Speichern: ${errorMsg}`);  // 👈 Detaillierte Meldung
        }
      });
  }

  /**
   * Setzt das Formular zurück.
   */
  resetForm() {
    this.selectedEmployees = [];
    this.newSkill = '';
  }
}
