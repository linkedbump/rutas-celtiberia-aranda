import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StartComponent } from './components/start/start.component';
import { MapComponent } from './components/rutas/aranda/map/map.component';
import { ArViewerComponent } from './components/ar/ar.component';
import { HistoriasComponent } from './components/historias/historias.component';
import { MenuComponent } from './components/menu/menu.component';
import { PoiMapComponent } from './components/poi-map/poi-map.component';
import { CategoriasComponent } from './components/rutas/categorias/categorias.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'start', component: StartComponent},
  { path: 'mapa', component: MapComponent},
  { path: 'ar-viewer/:id', component: ArViewerComponent },
  { path: 'historias', component: HistoriasComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'map', component: PoiMapComponent},
  { path: 'categoria', component: CategoriasComponent },
  { path: 'mapa/:categoria', component: MapComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
