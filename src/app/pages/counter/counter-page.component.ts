import { Component } from "@angular/core";

@Component({
  selector: 'app-counter-page',
  styleUrls: ['./counter-page.component.css'],
  template: `
  <div class="app-container">

      <div class="card-container">

          <div class="icon">
              <i class="bi bi-building-check"></i>
          </div>

          <h1 class="title">
              Sistema Preliminar
          </h1>

          <h3 class="subtitle">
              Instituto Nacional Electoral
          </h3>

          <hr>

          <p class="description">
              Plataforma desarrollada en Angular para pruebas
              de interfaz y navegación institucional.
          </p>

          <span class="badge">
              Versión inicial
          </span>

      </div>

  </div>
  `
})
export class CounterPageComponent { }