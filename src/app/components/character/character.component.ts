import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoriesComponent } from '../historias/historias.component';
import { Router, RouterModule } from '@angular/router';
import { CharacterService } from 'src/app/services/character.service';
import { NavigationFooterComponent } from 'src/app/shared/navigation-footer/navigation-footer.component';

export interface Character {
  name: string;
  type: 'warrior' | 'mage' | 'ranger' | 'druid';
  avatarUrl: string;
}

type CharacterType = {
  id: Character['type'];
  name: string;
  description: string;
  avatar: string;
}

@Component({
  selector: 'app-character-creation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavigationFooterComponent],
  template: `
    <div class="character-creation min-h-screen bg-gray-100 flex items-center justify-center py-5">
      <div class="container">
        <div class="card shadow-lg max-w-2xl mx-auto">
          <div class="card-body p-5">
            <h1 class="text-center text-3xl font-bold mb-5">Crea tu Personaje</h1>
            <h3 class="text-center text-3xl font-bold mb-5">Elige quien quieres ser</h3>
            
            <div class="form-group mb-4">
              <label for="name" class="form-label">Nombre de tu personaje</label>
              <input 
                type="text" 
                id="name" 
                class="form-control"
                [(ngModel)]="characterName"
                placeholder="Ingresa el nombre de tu personaje"
                required
              >
            </div>

            <h2 class="text-xl font-semibold mb-3">Elige tu clase</h2>
            <div class="character-types row g-4 mb-4">
              <div class="col-md-6 col-lg-3" *ngFor="let type of characterTypes">
                <div 
                  class="character-type-card card h-100" 
                  [class.selected]="selectedType === type.id"
                  (click)="selectType(type.id)"
                >
                  <img [src]="type.avatar" class="card-img-top character-avatar" [alt]="type.name">
                  <div class="card-body text-center">
                    <h5 class="card-title">{{type.name}}</h5>
                    <p class="card-text small">{{type.description}}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center">
            
              <button 
                class="btn btn-primary btn-lg"
                routerLink="/historias"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{exact: true}"
                [disabled]="!isValid"
                (click)="createCharacter()"
              >
                Comenzar Aventura
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-navigation-footer></app-navigation-footer>
  `,
  styles: [`
    .character-type-card {
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .character-type-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .character-type-card.selected {
      border-color: var(--primary-color);
        background-color: var;
    }

    .character-avatar {
      height: 200px;
      object-fit: cover;
    }
  `]
})
export class CharacterCreationComponent {
  @Output() characterCreated = new EventEmitter<Character>();

  characterName = '';
  selectedType: Character['type'] | null = null;

  characterTypes: CharacterType[] = [
    {
      id: 'warrior',
      name: 'Guerrero',
      description: 'Maestro del combate cuerpo a cuerpo',
      avatar: './assets/pjs/guerreroavatar.jpg'
    },
    {
      id: 'mage',
      name: 'Maga',
      description: 'Dominadora de las artes arcanas',
      avatar: './assets/pjs/mageavatar.jpg'
    },
    {
      id: 'ranger',
      name: 'Exploradora',
      description: 'Experta en supervivencia',
      avatar: './assets/pjs/exploradoraavatar.jpg'
    },
    {
      id: 'druid',
      name: 'Druida',
      description: 'Guardián de la vida',
      avatar: './assets/pjs/druidavatar.jpg'
    }
  ];

  get isValid(): boolean {
    return this.characterName.trim().length > 0 && this.selectedType !== null;
  }

  selectType(type: Character['type']) {
    this.selectedType = type;
  }

  constructor(private characterService: CharacterService, private router: Router) {}

createCharacter() {
  if (!this.isValid || !this.selectedType) return;

  const selectedTypeData = this.characterTypes.find(t => t.id === this.selectedType);
  if (!selectedTypeData) return;
  
  const character: Character = {
    name: this.characterName,
    type: this.selectedType,
    avatarUrl: selectedTypeData.avatar
  };

  this.characterService.setCharacter(character);
  this.router.navigate(['/historias']);
}
}