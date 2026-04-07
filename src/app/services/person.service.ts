import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Person {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
}
@Injectable({
  providedIn: 'root',
})
export class PersonService {

  private apiUrl = 'http://localhost:8080/sistema/api/v1/personas';
  constructor(private http: HttpClient) {}
  // Obtener todas las personas
  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }
  // Obtener una persona por nombre
  getPerson(nombre: string): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${nombre}`);
  }
  // Crear una nueva persona
  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }
  // Actualizar todos los datos de una persona
  updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(this.apiUrl, person);
  }
  // Eliminar una persona por id
  deletePerson(id: number): Observable<Person> {
    return this.http.delete<Person>(`${this.apiUrl}/${id}`);
  }
  // Actualizar parcialmente una persona
  patchPerson(person: Partial<Person>): Observable<Person> {
    return this.http.patch<Person>(this.apiUrl, person);
  }
}