import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {Employee} from "../models/Employee";
import {EmployeeCreateDto} from "../models/EmployeeCreateDto";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = 'http://localhost:8089/employees'; // Example API URL

  constructor(private http: HttpClient) {
  }

  selectAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  select(id: number): Observable<Employee> {
    return this.selectAll()
      .pipe(map(employees => {
        const employee = employees.find(employee => employee.id === id);
        if (!employee) {
          throw new Error(`Employee with ID ${id} not found`);
        }
        return employee;
      }));
  }

  insert(employee: EmployeeCreateDto): Observable<Employee> {
    return this.http.post<Employee>(this.url, employee, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  update(employee: Employee): Observable<Employee> {
    //Where should Verification happens?
    let postUrl = `${this.url}/${employee.id}`;
    return this.http.put(postUrl, employee, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  delete(id: number) {
    const deleteUrl = `${this.url}/${id}`;
    this.http.delete(deleteUrl).subscribe({
      next: (response) => {
        console.log('Delete successful');
      },
      error: (err) => {
        console.error('Error deleting employee:', err.message);
      },
    });
  }

}
