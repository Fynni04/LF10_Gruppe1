import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
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

    insert(employee: EmployeeCreateDto) {
        let subscription = this.http.post<Employee>(this.url, employee).subscribe();
    }

    update(employee: Employee) {
        let postUrl = `${this.url}/${employee.id}`;
        let subscription = this.http.put(postUrl, employee).pipe(
            catchError((error) => {
                console.error('update failed:', error); // Log the error
                throw new Error(`Failed to update resource with ID ${employee.id}`);
            })
        ).subscribe();
    }

    delete(id: number) {
        const deleteUrl = `${this.url}/${id}`;
        let subscription = this.http.delete(deleteUrl).pipe(
            catchError((error) => {
                console.error('Delete failed:', error); // Log the error
                throw new Error(`Failed to delete resource with ID ${id}`);
            })
        ).subscribe();
    }

}
