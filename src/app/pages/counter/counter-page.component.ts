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
  <footer class="footer-ine">
  <div class="container-fluid">
    <div class="row footer-row">
      <!-- Columna 1 -->
      <div class="col-md-4 footer-col">
        <h5>INE</h5>
        <p>
          <strong>©</strong> Derechos Reservados, Instituto Nacional Electoral, México.
        </p>
      </div>
      <!-- Columna 2 -->
      <div class="col-md-4 footer-col">
        <h5>Oficinas Centrales</h5>
        <p>
          Viaducto Tlalpan No. 100 Col. Arenal Tepepan,
          demarcación territorial Tlalpan,
          C.P. 14610, Ciudad de México.
        </p>
      </div>
      <!-- Columna 3 -->
      <div class="col-md-4 footer-col">
        <h5>Llámanos</h5>
        <p>
          Desde cualquier parte del país sin costo:
          <strong>800 433 2000</strong>
        </p>
        <p>
          Desde Estados Unidos sin costo:
          <strong>1 (866) 986 8306</strong>
        </p>
        <p>
          Desde otros países con cargo:
          <strong>+52 (55) 5481 9897</strong>
        </p>
        <p>
          o también a través de correo electrónico: 
          <strong>inetelmx@ine.mx</strong>
        </p>
      </div>
    </div>
  </div>
</footer>
  `
})
export class CounterPageComponent { }