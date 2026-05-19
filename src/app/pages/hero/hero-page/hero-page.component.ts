import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService, Person } from '../../../services/person.service';

@Component({
  selector: 'app-hero-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-page.html',
  styleUrl: './hero-page.css'
})

export class HeroPageComponent implements OnInit {

  currentPerson = signal<Person | null>(null);

  folio = signal<number>(1);

  constructor(private personService: PersonService) {}

  ngOnInit(): void {

    const data = localStorage.getItem('personas');

    if (data) {

      const persons: Person[] = JSON.parse(data);

      if (persons.length > 0) {

        /* =========================
           Última persona registrada
        ========================= */

        const lastPerson = persons[persons.length - 1];

        this.currentPerson.set(lastPerson);

        /* =========================
           Folio consecutivo
        ========================= */

        this.folio.set(persons.length);

      }

    }

  }

}