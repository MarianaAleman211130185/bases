import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService, Person } from '../../services/person.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datos-pages.component.html',
  styleUrls: ['./datos-pages.component.css']
})
export class DatosPagesComponent implements OnInit {
  constructor(private personService: PersonService) {}
  name = signal<string>('');
  lastnamePat = signal<string>('');
  lastnameMat = signal<string>('');
  email = signal<string>('');
  emailValido = signal<boolean | null>(null);
  birthdate = signal<string>('');
  genero = signal<string>('');
  fechaMaxima = signal<string>('');
  esMayorDeEdad = signal<boolean | null>(null);
  phone = signal<string>('');
  phoneValido = signal<boolean | null>(null);
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
      'Acolman', 'Almoloya de Juárez','Atizapan de Zaragoza','Atlacomulco','Chalco',
      'Chimalhuacán', 'Chicoloapan', 'Chimalhuacán', 'Coacalco de Berriozábal','Cuautitlán', 'Cuautitlán Izcalli',
      'Ecatepec de Morelos', 'Huehuetoca','Huixquilucan','Ixtapaluca','Ixtlahuaca','Jaltenco','Jilotepec','La Paz',
      'Lerma','Metepec','Naucalpan de Juárez','Nezahualcóyotl','Nicolás Romero','San Felipe del Progreso','San Jose del Rincon','San Mateo Atenco',
      'Tecámac','Tejupilco','Temoaya','Tenancingo','Tenango del Valle','Teoloyucan','Teotihuacán','Texcoco','Tlalnepantla de Baz','Toluca',
      'Tultepec','Tultitlán','Valle de Bravo','Valle de Chalco Solidaridad','Villa de Victoria','Xonacatlán','Zinatepec','Zumpango'
    ]
  };

  guardarCache() {
    const data = {
      name: this.name(),
      lastnamePat: this.lastnamePat(),
      lastnameMat: this.lastnameMat(),
      email: this.email(),
      phone: this.phone(),
      estado: this.estado(),
      municipio: this.municipio(),
      birthdate: this.birthdate(),
      genero: this.genero()
    };

    localStorage.setItem('formCache', JSON.stringify(data));
  }

  ngOnInit() {
    const today = new Date();
    const year = today.getFullYear() - 18;
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.fechaMaxima.set(`${year}-${month}-${day}`);

    const cache = localStorage.getItem('formCache');

    if (cache) {
      const data = JSON.parse(cache);

      this.name.set(data.name || '');
      this.lastnamePat.set(data.lastnamePat || '');
      this.lastnameMat.set(data.lastnameMat || '');
      this.email.set(data.email || '');
      this.phone.set(data.phone || '');
      this.estado.set(data.estado || '');
      this.municipio.set(data.municipio || '');
      this.birthdate.set(data.birthdate || '');
      this.genero.set(data.genero || '');


      if (data.birthdate) {
        const edad = this.calcularEdad(data.birthdate);
        this.esMayorDeEdad.set(edad >= 18);
      }

      if (data.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.emailValido.set(emailRegex.test(data.email));
      }

      if (data.phone) {
        const phoneRegex = /^[0-9]{10}$/;
        this.phoneValido.set(phoneRegex.test(data.phone));
      }

      if (data.estado) {
        this.municipios.set(this.catalogo[data.estado] || []);
      }
    }
  }

  calcularEdad(fecha: string): number {
    const nacimiento = new Date(fecha);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  onFechaChange(fecha: string) {
    this.birthdate.set(fecha);

    if (!fecha) {
      this.esMayorDeEdad.set(null);
      this.guardarCache();
      return;
    }

    const edad = this.calcularEdad(fecha);
    this.esMayorDeEdad.set(edad >= 18);

    this.guardarCache();
  }

  onEmailChange(valor: string) {
    this.email.set(valor);

    if (!valor) {
      this.emailValido.set(null);
      this.guardarCache();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailValido.set(emailRegex.test(valor));

    this.guardarCache();
  }

  onPhoneChange(valor: string) {
    this.phone.set(valor);

    if (!valor) {
      this.phoneValido.set(null);
      this.guardarCache();
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    this.phoneValido.set(phoneRegex.test(valor));

    this.guardarCache();
  }

  onEstadoChange(event: any) {
    const value = event.target.value;
    console.log('Estado seleccionado:', value);

    this.estado.set(value);
    this.municipios.set(this.catalogo[value] || []);

    this.guardarCache();
  }

  addPerson(): void {
    if (!this.name() || !this.lastnamePat() || !this.lastnameMat() || !this.genero() || !this.email() || !this.birthdate() || !this.phone() || !this.estado() || !this.municipio()) {
      alert('Por favor, completa todos los campos requeridos');
      return;
    }

    if (this.esMayorDeEdad() !== true) {
      alert('Debes ser mayor de edad para registrarte');
      return;
    }

    if (this.emailValido() !== true) {
      alert('Por favor, ingresa un correo electrónico válido');
      return;
    }

    if (this.phoneValido() !== true) {
      alert('Por favor, ingresa un número de teléfono válido');
      return;
    }

    const data = localStorage.getItem('personas');
    const persons = data ? JSON.parse(data) : [];

    const exists = persons.some(
      (p: any) => 
        p.nombre.toLowerCase() === this.name().toLowerCase() &&
        p.apellidoPaterno.toLowerCase() === this.lastnamePat().toLowerCase() &&
        p.apellidoMaterno.toLowerCase() === this.lastnameMat().toLowerCase() &&
        p.birthdate === this.birthdate() &&
        p.genero === this.genero() &&
        p.estado === this.estado() &&
        p.municipio === this.municipio() &&
        p.email.toLowerCase() === this.email().toLowerCase() &&
        p.phone === this.phone()
    );

    if (exists) {
      alert('La persona ya se encuentra registrada');
      return;
    }

  const nuevaPersona: Person = {
    id: persons.length > 0 ? persons[persons.length - 1].id + 1 : 1,
    nombre: this.name(),
    apellidoPaterno: this.lastnamePat(),
    apellidoMaterno: this.lastnameMat(),
    birthdate: this.birthdate(),
    genero: this.genero(),
    estado: this.estado(),
    municipio: this.municipio(),
    email: this.email(),
    phone: this.phone()
  };
  console.log('Nueva persona a registrar:', nuevaPersona);
  this.personService.createPerson(nuevaPersona).subscribe({
    next: (response:Person) => {
    persons.push(nuevaPersona);
    localStorage.setItem('personas', JSON.stringify(persons));
    alert('Persona registrada exitosamente');
    this.name.set('');
    this.lastnamePat.set('');
    this.lastnameMat.set('');
    this.birthdate.set('');
    this.genero.set('');
    this.email.set('');
    this.phone.set('');
    this.estado.set('');
    this.municipio.set('');
  },
  error: (error: any) => {
    console.error('Error al registrar persona:', error);
    alert('Ocurrió un error al registrar la persona. Por favor, intenta nuevamente.');
  }
  });
  }
  paso1Completo(): boolean {
    return this.name() !== '' && this.lastnamePat() !== '' && this.lastnameMat() !== '';
  }

  paso2Completo(): boolean {
    return this.emailValido() === true && this.birthdate() !== '' && this.esMayorDeEdad() === true;
  }

  esPaso3Completo(): boolean { 
    return this.phoneValido() === true && this.estado() !== '' && this.municipio() !== '';
  }
}