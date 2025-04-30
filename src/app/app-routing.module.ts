import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { StartComponent } from './components/start/start.component';
import { MapComponent } from './components/rutas/aranda/map/map.component';
import { ArViewerComponent } from './components/ar/ar.component';
import { StoriesComponent } from './components/historias/historias.component';
import { MenuComponent } from './components/menu/menu.component';
import { PoiMapComponent } from './components/poi-map/poi-map.component';
import { CategoriasComponent } from './components/rutas/categorias/categorias.component';
import { CharacterCreationComponent } from './components/character/character.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'start', component: StartComponent},
  { path: 'mapa', component: MapComponent},
  { path: 'ar-viewer/:id', component: ArViewerComponent },
  { path: 'historias', component: StoriesComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'map', component: PoiMapComponent},
  { path: 'categoria', component: CategoriasComponent },
  { path: 'mapa/:categoria', component: MapComponent},
  { path: 'personaje', component: CharacterCreationComponent},
  { path: 'create-character', component: CharacterCreationComponent },
  { path: 'poi-map', component: PoiMapComponent },
  { 
    path: 'celtiberia', 
    loadChildren: () => 
      import('./components/rutas/celtiberia/celtiberia.module').then(m => m.CeltiberiaModule) 
  },
  { 
    path: 'naturaleza', 
    loadChildren: () =>
      import('./components/naturaleza/naturaleza.module').then(m => m.NaturalezaModule)
  },
  { 
    path: 'qr', 
    loadChildren: () =>
      import('./qr/qr.module').then(m => m.QrModule) 
  },
  {
    path: 'evento', 
    loadComponent: () => import('./events/events.component').then(m => m.EventosComponent)
  },
  { path: 'politicas', loadChildren: () => import('./politicas/politicas.module').then(m => m.PoliticasModule) },



  
  { path: '**', redirectTo: '/home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
