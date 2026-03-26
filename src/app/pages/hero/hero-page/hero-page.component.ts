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
    const data = localStorage.getItem('personas');
    let localPersons: Person[] = [];
    if (data) {
      localPersons = JSON.parse(data);
    }
    this.personService.getPersons().subscribe((resp: any) => {
      const personsApi: Person[] = resp.results.map((p: any, index: number) => ({
        id: index,
        nombre: p.name.first,
        apellido: p.name.last
      }));
      this.persons.set([...localPersons, ...personsApi]);
    });
    const allPersons = [...localPersons, ...this.persons()];
    this.persons.set(allPersons);
  }
  }