import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { NavigationFooterComponent } from './shared/navigation-footer/navigation-footer.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  // Aquí puedes agregar más rutas según necesites
];

@NgModule({
  declarations: [
    AppComponent,
   
  ],
  
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    RouterModule.forRoot(routes),
    DashboardModule,
    NavigationFooterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
