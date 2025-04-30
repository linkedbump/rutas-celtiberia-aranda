import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { AppUser } from 'src/app/auth/models/user.interface';
import { NavigationFooterComponent } from 'src/app/shared/navigation-footer/navigation-footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavigationFooterComponent],
  template: `
    <div class="dashboard-header">
    <img [src]="avatarPath" alt="Avatar" class="avatar">
      <div class="user-info">
        <h2>{{ user?.name || 'Usuario' }}</h2>
        <p>{{ user?.email }}</p>
        <p>Se unió {{ user?.createdAt | date }}</p>
      </div>
    </div>

    <div class="avatar-selection">
      <h4>Cambia tu avatar:</h4>
      <div class="avatar-selector">
        <img *ngFor="let avatar of displayedAvatars" 
             [src]="'assets/avatars/' + avatar" 
             (click)="selectAvatar(avatar)" 
             class="avatar-option">
      </div>
      <div class="avatar-controls">
        <button (click)="prevAvatarPage()" [disabled]="avatarPage === 0"> ← </button>
        <button (click)="nextAvatarPage()" [disabled]="(avatarPage + 1) * avatarsPerPage >= avatars.length"> → </button>
      </div>
    </div>

    <div class="notifications-section">
      <h3>Notificaciones</h3>
      <p>Aquí aparecerán nuevas rutas y eventos.</p>
    </div>

    <div class="push-summary">
      <h3>Resumen de mensajes push</h3>
      <p>Próximamente verás aquí tus mensajes importantes.</p>
    </div>
    <app-navigation-footer></app-navigation-footer>
  `,
  styles: [`
  .dashboard-header {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    color: white;
    background: linear-gradient(to right, #f80921, #ff8a91);
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 1rem;
    object-fit: cover;
    border: 3px solid white;
  }

  .user-info {
    flex: 1;
    min-width: 200px;
  }

  .user-info h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .user-info p {
    margin: 0.2rem 0;
  }

  .avatar-selection {
    margin: 2rem 2rem 1rem;
  }

  .avatar-selector {
    display: flex;
    flex-wrap: wrap;
    
    gap: 1rem;
    justify-content: start;
  }

  .avatar-option {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border 0.2s;
  }

  .avatar-option:hover {
    border: 2px solid rgb(219, 69, 52);
  }

  .avatar-controls {
    margin-top: 1rem;
    display: flex;
    gap: 25rem;
  }

  .avatar-controls button {
    background: linear-gradient(to right, #ffc100, #FFC107);
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
  }

  .avatar-controls button:hover {
    background: linear-gradient(to right,rgb(227, 179, 35),rgb(232, 209, 38));
  }

  .notifications-section, .push-summary {
    margin-top: 2rem;
    padding: 1rem 1.5rem;
    background-color: #f5f7fa;
    border-radius: 8px;
  }

  .notifications-section h3,
  .push-summary h3 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    color: #333;
  }

  .notifications-section p,
  .push-summary p {
    margin: 0;
    font-size: 0.95rem;
    color: #555;
  }

  @media (max-width: 600px) {
    .dashboard-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .avatar {
      margin-bottom: 1rem;
    }

    .avatar-controls {
      justify-content: center;
    }

    .avatar-selector {
      justify-content: center;
    }
  }
`]
})

export class DashboardComponent implements OnInit {
  user: AppUser | null = null;
  avatars: string[] = [
    'Ataecina.png', 'Belenos.png', 'Cernunnos.png', 'Cruz1.png', 'Cruz2.png',
    'endovelico.png', 'Epona.png', 'Esus.png', 'Lug.png', 'Nabia.png',
    'Nnudo.png', 'Taranis.png', 'Trebaruna.png', 'Triqueta.png', 'Trisquel.png',
    'Yggdrasil.png', 'Yggdrasil2.png', 'Yggdrasil3.png'
  ];
  displayedAvatars: string[] = [];
  avatarPage: number = 0;
  avatarsPerPage: number = 5;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((profile) => {
      this.user = profile;
      this.loadAvatarPage();
    });
  }

  loadAvatarPage(): void {
    const start = this.avatarPage * this.avatarsPerPage;
    const end = start + this.avatarsPerPage;
    this.displayedAvatars = this.avatars.slice(start, end);
  }

  nextAvatarPage(): void {
    if ((this.avatarPage + 1) * this.avatarsPerPage < this.avatars.length) {
      this.avatarPage++;
      this.loadAvatarPage();
    }
  }

  prevAvatarPage(): void {
    if (this.avatarPage > 0) {
      this.avatarPage--;
      this.loadAvatarPage();
    }
  }
  
  selectAvatar(avatar: string): void {
    if (this.user) {
      this.userService.updateAvatar(this.user.uid, avatar).then(() => {
        this.user!.avatar = avatar;
        this.user!.photoURL = '';
        console.log('Avatar actualizado en Firestore:', avatar);
      });
    }
  }

  get avatarPath(): string {
    if (this.user?.photoURL && !this.user.avatar) {
      return this.user.photoURL; ;
    } else {
      return 'assets/avatars/' + (this.user?.avatar || 'Trisquel.png');
    }
  }  
}
