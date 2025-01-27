import {Component} from '@angular/core';
import {EmployeeListComponent} from "../employee-list/employee-list.component";
import {QualificationListComponent} from "../qualification-list/qualification-list.component";
import {FormsModule} from "@angular/forms";
import {Observable, of} from "rxjs";
import {Employee} from "../Employee";
import {Qualification} from "../Qualification";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-qualification-create',
  standalone: true,
  imports: [
    FormsModule],
  templateUrl: './qualification-create.component.html',
  styleUrl: './qualification-create.component.css'
})
export class QualificationCreateComponent {
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3Mzc5ODYxMjQsImlhdCI6MTczNzk4MjUyNCwianRpIjoiYmMyNjk4NjQtOGJiZi00MDIyLWE0NTktMmFmZTU0ODJjMGQzIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI5ZjE2YTZkNC05NTlmLTQwOTItOGIzOS03NjUzYTY5ZWIwYTEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.SAhWUKYxj15H-68FMgc76jHlJOWwVfbS9pr8i3P9cFs916pwTHPPUysZmUG1sxDsZDD8nvuVaVwOkBzuLT7vcjEuEgqZuQFCKLEIzbeKVgtrdtthILewrRmR-QI5ZIGmaXAlgSru8q5LcywKyxCqPw_78LqP7BgsazoyA5HiT_qtBe_vg2EuzEm5LhmxTM_uPSlX3XWNx7bu3RXmvA2V_1er5pwnsd1nnMhFBn4i2LtLXsG8unQE0ARdNnjwKxYV_j2iM2ur6FGhsp9D79FUcM3StboXdVqKlWC0xLObjB22x5ssRliVm1rm-Iby08tJcjXKqAaOWiEbVSG1AI_Z6A"';
qualifications: Observable<Qualification>;

  constructor(private http: HttpClient) {
    this.qualifications = of();
    this.fetchData();
  }

  fetchData() {
    this.qualifications = this.http.get<Qualification>('http://localhost:8089/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

  newqualification: string = '';

  qualificationlist = [
    {id: 1, name: 'Qualifikation 1'},
    {id: 2, name: 'Qualifikation 2'},
  ];


  addqualification() {
    if (this.newqualification.trim() !== '') {
      const newId = this.qualificationlist.length + 1;
      this.qualificationlist.push({id: newId, name: this.newqualification});
      this.newqualification = ''; // Eingabefeld leeren
    } else {
      alert('Bitte geben Sie eine gültige Qualifikation ein!');
    }
  }

  cancel() {
    alert('Abgebrochen');
    // Sie können hier auch eine Navigation oder andere Logik implementieren
  }

  save() {
    const selectedQualifikationen = this.qualificationlist.filter(qualification => {
      const checkbox = document.querySelector(`input[value="${qualification.id}"]`) as HTMLInputElement;
      return checkbox && checkbox.checked;
    });

    console.log('Ausgewählte Qualifikationen:', selectedQualifikationen);
    alert('Ausgewählte Qualifikationen wurden gespeichert!');
  }

  protected readonly EmployeeListComponent = EmployeeListComponent;
}
