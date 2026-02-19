import { Component } from "@angular/core";

@Component({
  template: `
    <div class="container mt-5 d-flex justify-content-center">
      
      <div class="card shadow-lg border-0 p-4 text-center" style="max-width: 500px;">
        
        <!-- Ícono principal -->
        <i class="bi bi-building-check fs-1 text-success mb-3"></i>

        <!-- Título -->
        <h1 class="fw-semibold text-uppercase" style="letter-spacing: 2px;">
          Sistema Preliminar
        </h1>

        <!-- Subtítulo -->
        <h5 class="text-secondary mt-2">
          Instituto Nacional Electoral
        </h5>

        <hr class="my-4">

        <!-- Mensaje -->
        <p class="text-muted fs-6">
          Plataforma desarrollada en <strong>Angular</strong> para pruebas
          de interfaz y navegación institucional.
        </p>

        <!-- Badge -->
        <span class="badge bg-success-subtle text-success mt-3 px-3 py-2">
          Versión inicial
        </span>

      </div>

    </div>
  `
})
export class CounterPageComponent {
}
