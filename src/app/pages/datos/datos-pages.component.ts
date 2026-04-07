import { Component, signal } from '@angular/core';

@Component({
  templateUrl: './datos-pages.component.html',
  styleUrls: ['./datos-pages.component.css']
})
export class DatosPagesComponent {

  name = signal<string>('');
  lastname = signal<string>('');
  email = signal<string>('');

  addPerson(): void {

    if (!this.name() || !this.lastname() || !this.email()) {
      alert('Por favor, completa todos los campos');
      return;
    }
    const data = localStorage.getItem('personas');
    const persons = data ? JSON.parse(data) : [];

    const exists = persons.some(
      (p: any) => 
        p.nombre.toLowerCase() === this.name().toLowerCase() &&
        p.apellido.toLowerCase() === this.lastname().toLowerCase() &&
        p.email.toLowerCase() === `${this.name().toLowerCase()}.${this.lastname().toLowerCase()}@example.com` 
    );

    if (exists) {
      alert('La persona ya se encuentra registrada');
      return;
    }

    persons.push({
      nombre: this.name(),
      apellido: this.lastname(),
      email: `${this.name().toLowerCase()}.${this.lastname().toLowerCase()}@example.com`
    });

    localStorage.setItem('personas', JSON.stringify(persons));
    alert('Persona registrada exitosamente');

    this.name.set('');
    this.lastname.set('');
    this.email.set('');

  }
}