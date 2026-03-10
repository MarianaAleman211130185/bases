import { Component, signal } from '@angular/core';

@Component({
  templateUrl: './datos-pages.component.html',
  styleUrls: ['./datos-pages.component.css']
})
export class DatosPagesComponent {

  name = signal<string>('');
  lastname = signal<string>('');

  addPerson(): void {

    if (!this.name() || !this.lastname()) {
      alert('Por favor, completa todos los campos');
      return;
    }

    // Obtener datos actuales del localStorage
    const data = localStorage.getItem('personas');

    const persons = data ? JSON.parse(data) : [];

    // Agregar nueva persona
    persons.push({
      nombre: this.name(),
      apellido: this.lastname()
    });

    // Guardar nuevamente en localStorage
    localStorage.setItem('personas', JSON.stringify(persons));

    console.log('Persona guardada:', persons);

    // Limpiar campos
    this.name.set('');
    this.lastname.set('');

  }
}