import { Component, inject }        from '@angular/core'        ;
import { CommonModule }             from '@angular/common'      ;
import { Observable, of }           from "rxjs"                 ;
import { HttpClient, HttpHeaders }  from "@angular/common/http" ;
import { Qualification }            from "../Qualification"     ;
import Keycloak                     from "keycloak-js"          ;
import { Router }                   from "@angular/router"      ;

@Component({
    selector:                   'app-qualification-list',
    imports:                              [CommonModule],
    templateUrl:   './qualification-list.component.html',
    styleUrl:       './qualification-list.component.css'
})
export class QualificationListComponent {
  qualifications$: Observable<Qualification[]>;
  private readonly keycloak = inject(Keycloak);

  constructor(private http: HttpClient, private router: Router) {
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

  BackToMainPage() {
    this.router.navigate(['/app-menu'])
  }
}
