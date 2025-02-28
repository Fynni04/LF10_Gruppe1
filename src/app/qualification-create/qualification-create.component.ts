import {Component, inject} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import Keycloak from "keycloak-js";
import {CommonModule} from "@angular/common";
import {Employee} from "../Employee";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {Qualification} from "../Qualification";

@Component({
  selector: 'app-qualification-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './qualification-create.component.html',
  styleUrl: './qualification-create.component.css'
})
export class QualificationCreateComponent {
  skill             = '' ;
  employees: Employee[] = []; // Liste der Mitarbeiter
  selectedEmployees: Employee[] = []; // Ausgewählte Mitarbeiter (gesamtes Objekt)

  constructor(private http: HttpClient, private router: Router) {
    this.fetchEmployees();
  }
  private readonly keycloak = inject(Keycloak);

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

  saveQualification() {
    const newQualification: Qualification = new Qualification(
      undefined             ,
      this.skill
    );

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.keycloak.token}`);

    this.http.post<Qualification>( 'http://localhost:8089/qualifications', newQualification, { headers } )
      .subscribe
      (
        {
          next: (response) =>
          {
            console.log('Qualification successfully created:', response);
            alert('Qualifikation erfolgreich mit der ID: "'+ response.id +'" erstellt!');

            if(response.id) {
              alert('Wird hinzugefügt'+ response);
              this.linkEmployeesToQualification(response);
            }

            this.resetForm();
          },
          error: (error) =>
          {
            console.error('Error creating Qualification:', error);
            alert('Fehler beim Erstellen des Qualifikation!');
          }
        }
      );
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
    this.skill = '';
    this.selectedEmployees = [];
  }

  BackToMainPage() {
    this.router.navigate(['/app-menu'])
  }
}
