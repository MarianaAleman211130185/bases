import { Component, signal } from '@angular/core';

@Component({
  templateUrl: './datos-pages.component.html',
})
export class DatosPagesComponent {
    name = signal('');
    lastname = signal('');
}