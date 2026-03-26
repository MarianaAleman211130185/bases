import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

export interface Person {
  id: number;
  nombre: string;
  apellido: string;
}

@Injectable({
  providedIn: 'root',
})
export class PersonService {

  private apiUrl = 'https://randomuser.me/api/?results=5&nat=es';
  constructor(private http: HttpClient) {}
  getPersons(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPerson(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createPerson(person: Person): Observable<any> {
    return this.http.post<any>(this.apiUrl, person);
  }

  updatePerson(person: Person): Observable<any> {
    return this.http.put<any>(this.apiUrl, person);
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl);
  }
}