import {Component, inject} from '@angular/core';
import {Qualification} from "../Qualification";
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
  newQualification: string = ''; // Qualifikationsname
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
    if (!this.newQualification.trim()) {
      alert('Bitte gib eine gültige Qualifikation ein!');
      return;
    }

    const qualificationData = {
      name: this.newQualification.trim(),
      employeeIds: Array.from(this.selectedEmployees)
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.keycloak.token}`);

    this.http.post('https://localhost:8089/qualifications', qualificationData, { headers })
      .subscribe({
        next: () => {
          alert('Qualifikation erfolgreich erstellt!');
          this.resetForm();
        },
        error: (error) => {
          console.error('Fehler beim Erstellen der Qualifikation:', error);
          alert('Speicherung fehlgeschlagen.');
        }
      });
  }

  /**
   * Setzt das Formular zurück.
   */
  resetForm() {
    this.newQualification = '';
    this.selectedEmployees = [];
  }
}
