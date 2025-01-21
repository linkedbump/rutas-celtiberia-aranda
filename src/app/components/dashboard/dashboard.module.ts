import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfileSectionsComponent } from './components/profile-sections/profile-sections.component';
import { BottomNavigationComponent } from './components/bottom-navigation/botton-navigation.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileHeaderComponent,
    ProfileSectionsComponent,
    BottomNavigationComponent
  ],
  imports: [
    CommonModule
   
  ]
})
export class DashboardModule { } 