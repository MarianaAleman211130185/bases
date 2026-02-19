import { Component, signal } from '@angular/core';

@Component({
  templateUrl: './datos-pages.component.html',
})
export class DatosPagesComponent {

  // Señal para almacenar el nombre de la persona
  name = signal<string>('');

  // Señal para almacenar el apellido
  lastname = signal<string>('');

  // Método que se ejecuta al presionar el botón "Agregar"
  addPerson(): void {

    // Validación básica para evitar campos vacíos
    if (!this.name() || !this.lastname()) {
      alert('Por favor, completa todos los campos');
      return;
    }

    // Aquí en el futuro podrías enviar los datos a un backend
    console.log('Persona registrada:', {
      nombre: this.name(),
      apellido: this.lastname()
    });

    // Limpia los campos después de agregar
    this.name.set('');
    this.lastname.set('');
  }
}
