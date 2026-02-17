import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hero-page',
  standalone: true,
  templateUrl: './hero-page.html',
})
export class HeroPageComponent {

  // Señales que representan los datos de una persona
  name = signal<string>('Mariana');
  age  = signal<number>(22);

  // Devuelve una descripción básica de la persona
  getHeroDescription(): string {
    return `${this.name()} - ${this.age()} años`;
  }

  // Cambia los datos de la persona
  changeHero (): void {
    this.name.set('Mariana López');
    this.age.set(27);
  }

  // Cambia únicamente la edad
  changeAge(): void {
    this.age.set(28);
  }

  // Restaura los valores originales
  resetForm(): void {
    this.name.set('Mariana');
    this.age.set(22);
  }
}
