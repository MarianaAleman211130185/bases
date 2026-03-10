import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Person {
  nombre: string;
  apellido: string;
}

@Component({
  selector: 'app-hero-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-page.html',
  styleUrl: './hero-page.css'
})
export class HeroPageComponent implements OnInit {

  // Lista de personas
  persons = signal<Person[]>([]);

  ngOnInit(): void {

    // Cargar personas guardadas en localStorage
    const data = localStorage.getItem('personas');

    if (data) {
      this.persons.set(JSON.parse(data));
    }

  }

}