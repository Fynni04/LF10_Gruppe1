import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Qualification} from "../Qualification";
import Keycloak from "keycloak-js";

@Component({
    selector: 'app-qualification-edit',
    imports: [CommonModule],
    templateUrl: './qualification-edit.component.html',
    styleUrl: './qualification-edit.component.css'
})
export class QualificationEditComponent {
  private readonly keycloak = inject(Keycloak);
  qualifications$: Observable<Qualification[]>;

  constructor(private http: HttpClient) {
    this.qualifications$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.qualifications$ = this.http.get<Qualification[]>('http://localhost:8089/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.keycloak.token}`)
    });
  }
}
