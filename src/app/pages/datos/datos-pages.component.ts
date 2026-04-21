import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datos-pages.component.html',
  styleUrls: ['./datos-pages.component.css']
})
export class DatosPagesComponent {

  name = signal<string>('');
  lastname = signal<string>('');
  email = signal<string>('');
  birthdate = signal<string>('');
  phone = signal<string>('');
  estado = signal<string>('');
  municipio = signal<string>('');
  municipios = signal<string[]>([]);
   catalogo: any = {
    'CDMX': [
      'Álvaro Obregón', 'Azcapotzalco', 'Benito Juárez', 'Coyoacán',
      'Cuajimalpa', 'Cuauhtémoc', 'Gustavo A. Madero', 'Iztacalco',
      'Iztapalapa', 'Magdalena Contreras', 'Miguel Hidalgo',
      'Milpa Alta', 'Tláhuac', 'Tlalpan',
      'Venustiano Carranza', 'Xochimilco'
    ],
    'Estado de México': [
      'Ecatepec', 'Nezahualcóyotl', 'Toluca', 'Naucalpan',
      'Tlalnepantla', 'Chimalhuacán', 'Atizapán',
      'Cuautitlán Izcalli', 'Ixtapaluca', 'Texcoco'
    ]
  };
  onEstadoChange(event: any) {
    const value = event.target.value;
    this.estado.set(value);
    this.municipios.set(this.catalogo[value] || []);
    this.municipio.set('');
  }

  addPerson(): void {

    if (!this.name() || !this.lastname() || !this.email() || !this.birthdate() || !this.phone()) {
      alert('Por favor, completa todos los campos');
      return;
    }
    const data = localStorage.getItem('personas');
    const persons = data ? JSON.parse(data) : [];

    const exists = persons.some(
      (p: any) => 
        p.nombre.toLowerCase() === this.name().toLowerCase() &&
        p.apellido.toLowerCase() === this.lastname().toLowerCase() &&
        p.birthdate === this.birthdate() &&
        p.email.toLowerCase() === `${this.name().toLowerCase()}.${this.lastname().toLowerCase()}@example.com` &&
        p.phone === this.phone()
    );

    if (exists) {
      alert('La persona ya se encuentra registrada');
      return;
    }

    persons.push({
      nombre: this.name(),
      apellido: this.lastname(),
      birthdate: this.birthdate(),
      email: `${this.name().toLowerCase()}.${this.lastname().toLowerCase()}@example.com`,
      phone: this.phone(),
      estado: this.estado(),
      municipio: this.municipio()
    });

    localStorage.setItem('personas', JSON.stringify(persons));
    alert('Persona registrada exitosamente');

    this.name.set('');
    this.lastname.set('');
    this.birthdate.set('');
    this.email.set('');
    this.phone.set('');
    this.estado.set('');
    this.municipio.set('');
  }
}