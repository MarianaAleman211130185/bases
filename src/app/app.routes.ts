import { Routes } from '@angular/router';
import { HeroPageComponent } from './pages/hero/hero-page/hero-page';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { DatosPagesComponent } from './pages/datos/datos-pages.component';
export const routes: Routes = [
  {
    path: 'hero',
    component: HeroPageComponent
  },
  {
    path: 'datos',
    component: DatosPagesComponent
  },
  {
    path: '**',
    component: CounterPageComponent
  }
];
