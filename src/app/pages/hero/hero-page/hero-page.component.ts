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

  persons = signal<Person[]>([]);

  constructor(private personService: PersonService) {}

  ngOnInit(): void {

    let localPersons: Person[] = [];

    const data = localStorage.getItem('personas');
    if (data) {
      localPersons = JSON.parse(data);
    }

    this.personService.getPersons().subscribe((apiPersons: Person[]) => {

      const allPersons = [...localPersons, ...apiPersons];

      this.persons.set(allPersons);

    });

  }

}