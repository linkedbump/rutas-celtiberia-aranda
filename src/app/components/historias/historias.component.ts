import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Character } from '../character/character.component';
import { CharacterService } from 'src/app/services/character.service';
import { Router } from '@angular/router';
import { NavigationFooterComponent } from 'src/app/shared/navigation-footer/navigation-footer.component';

interface SpotifyTracks {
  happy: string;
  reflective: string;
  excited: string;
  peaceful: string;
}

interface Story {
  id: number;
  title: string;
  content: string;
  spotifyTrackId: SpotifyTracks;
  routeMapUrl: string;
  imageUrl: string;
  decision?: 'A' | 'B';
  decisionOptions: {
    optionA: string;
    optionB: string;
  };
  texto_largo: string;
}

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [CommonModule, FormsModule, NavigationFooterComponent],
  template: `
     <div class="story-container" *ngIf="character">
      <div class="progress mb-4">
        <div 
          class="progress-bar" 
          [style.width]="(currentStoryIndex + 1) / stories.length * 100 + '%'"
          role="progressbar">
          Historia {{currentStoryIndex + 1}} de {{stories.length}}
        </div>
      </div>

      <div class="row">
        <!-- Columna de imágenes -->
        <div class="col-md-6 mb-4 mb-md-0">
          <div class="card shadow-sm h-100">
            <!-- Avatar del personaje -->
            <div class="character-avatar-container">
              <img [src]="character.avatarUrl" class="character-avatar" [alt]="character.name">
              <div class="character-info">
                <h3>{{ character.name }}</h3>
                <span class="character-type">{{ getCharacterTypeLabel(character.type) }}</span>
              </div>
            </div>

            <img [src]="currentStory.imageUrl" class="card-img-top story-image" [alt]="currentStory.title">
            <div class="card-body">
              <div class="spotify-embed" *ngIf="selectedMood">
                <p class="text-muted mb-2">Hemos pensado en esta Música para tu aventura:</p>
                <iframe
                  style="border-radius:12px"
                  [src]="spotifyUrl"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowfullscreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy">
                </iframe>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna de contenido -->
        <div class="col-md-6">
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <h2 class="card-title mb-4">{{ currentStory.title }}</h2>
              
              <div class="story-content">
                <p [class.fade-in]="showContent">{{ currentStory.content }}</p>
              </div>

              <div class="mood-selector mb-4" *ngIf="showMoodSelector">
                <h5>¿Qué mood quieres tomar en esta historia?</h5>
                <div class="btn-group">
                  <button 
                    *ngFor="let mood of moods" 
                    class="btn" 
                    [class.btn-primary]="selectedMood === mood"
                    [class.btn-outline-primary]="selectedMood !== mood"
                    (click)="selectMood(mood)">
                    {{ getMoodLabel(mood) }}
                  </button>
                </div>
              </div>

                     <div class="user-notes mt-4" *ngIf="selectedMood">
                    <h5>Desarrolla tu aventura en la Celtiberia:</h5>
                    <p class="texto-largo">{{ currentStory.texto_largo }}</p>

                    <!-- Botones de decisión -->
                    <div class="decision-buttons">
                      <h5 class="mb-3">¿Qué decides hacer?</h5>
                      <div class="d-grid gap-2">
                        <button 
                          class="btn btn-outline-primary btn-lg"
                          (click)="makeDecision('A')">
                          {{ currentStory.decisionOptions.optionA }}
                        </button>
                        <button 
                          class="btn btn-outline-primary btn-lg"
                          (click)="makeDecision('B')">
                          {{ currentStory.decisionOptions.optionB }}
                        </button>
                      </div>
                    </div>
                  </div>

              <div class="navigation-buttons d-flex justify-content-between align-items-center mt-4">
                <button 
                  class="btn btn-primary"
                  [disabled]="!selectedMood"
                  (click)="viewRouteMap()">
                  <i class="bi bi-map"></i> Ver Mapa
                </button>
                
                <div>
                  <button 
                    *ngIf="currentStoryIndex > 0"
                    class="btn btn-outline-primary me-2"
                    (click)="previousStory()">
                    ← Anterior
                  </button>
                  <button 
                    class="btn btn-success"
                    [disabled]="!selectedMood || !currentStory.decision"
                    (click)="nextStory()">
                    {{ isLastStory ? 'Finalizar' : 'Siguiente' }} →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-navigation-footer></app-navigation-footer>
  `,
  styles: [`
    body {
      background-color: #f8f9fa;
      padding: 20px;
    }

    .story-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      padding-bottom: 100px; /* Espacio para el footer */
    }

    .story-content {
      font-size: 1.2rem;
      line-height: 1.8;
      margin-bottom: 2rem;
    }

    .story-content p {
      transition: opacity 0.5s ease-in-out;
    }

    .story-content p.fade-in {
      opacity: 1;
    }

    .story-content p:not(.fade-in) {
      opacity: 0;
    }

    .story-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-top-left-radius: calc(0.375rem - 1px);
      border-top-right-radius: calc(0.375rem - 1px);
    }

    .navigation-buttons {
      margin-top: 2rem;
    }

    .spotify-embed {
      margin: 2rem 0;
      border-radius: 12px;
      overflow: hidden;
    }

    .mood-selector {
      transition: opacity 0.3s ease-in-out;
    }

    .mood-selector .btn-group {
      width: 100%;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .mood-selector .btn {
      text-transform: capitalize;
      flex: 1;
      min-width: 120px;
    }

    .user-notes {
      transition: all 0.3s ease-in-out;
    }

    .user-notes textarea {
      min-height: 100px;
      resize: vertical;
    }

    .decision-buttons {
      margin-top: 2rem;
    }

    .decision-buttons .btn {
      margin-bottom: 1rem;
      padding: 1rem;
      font-size: 1.1rem;
      transition: all 0.3s ease-in-out;
    }

    .decision-buttons .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .progress {
      height: 10px;
      background-color: #e9ecef;
    }

    .progress-bar {
      background-color: var(--accent-color);
      transition: width 0.3s ease-in-out;
    }

    .character-avatar-container {
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      background-color: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }

    .character-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
    }

    .character-info h3 {
      margin: 0;
      font-size: 1.2rem;
    }

    .character-type {
      font-size: 0.9rem;
      color: #6c757d;
    }
    /* =====================
       Responsive “Historias”
       ===================== */
       @media (max-width: 768px) {
      .navigation-buttons {
        display: flex !important;
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 0.75rem;
        margin-top: 1rem;
      }
      .navigation-buttons button {
        width: 100% !important;
      }
      .navigation-buttons > div {
        display: flex !important;
        flex-direction: column !important;
        gap: 0.75rem;
        width: 100%;
      }
    }
  `]
})
export class StoriesComponent implements OnInit {
  character: Character | null = null;
  currentStoryIndex = 0;
  showContent = true;
  showMoodSelector = false;
  selectedMood: keyof SpotifyTracks | null = null;
  moods: (keyof SpotifyTracks)[] = ['happy', 'reflective', 'excited', 'peaceful'];
  spotifyUrl: SafeResourceUrl;
  puntuacion: number = 0;

  stories: Story[] = [
    {
      id: 1,
      title: 'El Llamado de la Tierra Antigua',
      content: 'La niebla se desliza entre los árboles como un susurro del pasado. El bosque sagrado del Moncayo te envuelve, y una presencia se manifiesta entre la bruma. Es un druida. Sus ojos, como carbones encendidos, te atraviesan.',
      spotifyTrackId: {
        happy: '37g06WD4w62ipxpBIbQN16',
        reflective: '1ueOEwIxlCAivSC8ZrA5xW',
        excited: '2nRKJI3XsWPb5d8VXwn2iK',
        peaceful: '6OLgebma3uuh5KDG5ZXjF5'
      },
      routeMapUrl: '/assets/maps/1.png',
      imageUrl: 'assets/historia/Druida.png',
      decisionOptions: {
        optionA: 'Acepto con honor y protegeré lo que aún vive en estas tierras',
        optionB: 'Acepto, La riqueza puede salvarnos de nuevoLa riqueza puede salvarnos de nuevo'
      },
      texto_largo: 'DRUIDA:— Has cruzado el umbral, caminante… El hierro habló, y tu nombre fue escuchado.La Celtiberia duerme bajo tierra y piedra, esperando a quien se atreva a despertar su memoria.— Solo tú puedes decidir qué camino recorrer. — Uno es el camino del Honor, donde guardarás el alma de tu gente, honrarás a los ancestros, y caminarás en sintonía con lo que fue sagrado. — El otro es el camino de la riqueza, donde recuperarás tesoros olvidados, venderás al mejor postor y devolverás al pueblo la gloria perdida... o lo que quede de ella. Hace una pausa. Apoya el báculo sobre una piedra musgosa. - Ambos caminos conducen al mismo destino... pero el eco de tus pasos será distinto. Decide, viajero. Porque lo que elijas ahora resonará en las ruinas de Aratis por toda la eternidad.'
    },
    {
      id: 2,
      title: 'El Valle de los Ecos Olvidados',
      content: 'Caminas siguiendo las palabras del druida, dejando atrás el susurro de los robles. El valle se abre ante ti, como si la propia tierra te invitara a descubrir sus secretos. Antaño, aquí resonaba el martillo sobre el yunque, el hierro rojo como la sangre de la montaña. Una civilización floreció, no solo con armas, sino con sabiduría, con alianzas tejidas entre bosques y estrellas. ',
      spotifyTrackId: {
        happy: '0tQIWLAa3VIGNLWBIPxIqe',
        reflective: '1xCsq0FMdoNaKGns98XHxF',
        excited: '274g0w6437QgHfyfUdc6Ak',
        peaceful: '0tpUpChtFAOz2OULXhW15y'
      },
      routeMapUrl: '/assets/maps/2.png',
      texto_largo: '[Tu mirada se pierde entre los restos de un asentamiento olvidado. Una voz, quizás un recuerdo, quizás un eco, te alcanza.] VOZ ANTIGUA: — Esta era tierra de herreros y guerreros. Cada escoria bajo tus pies habla de un pueblo que forjó su destino con sus propias manos. — Pero no todo sobrevivió. La avaricia trajo ruina. Los saqueos borraron nombres. El olvido cubrió la memoria con polvo. [Te detienes junto a una piedra marcada con símbolos celtas. Sientes que debes actuar.] ',
      imageUrl: 'assets/historia/BosqueyRunas.png',
      decisionOptions: {
        optionA: 'Honraré estos restos. Buscaré preservar su historia y aprender de ellos.',
        optionB: 'Recolectaré lo que pueda. Estos metales aún pueden valer algo en el mercado.'
      }
    },
    {
      id: 3,
      title: 'El Reflejo de Aratis',
      content: 'El sendero te lleva a lo alto de un mirador. El viento sopla con fuerza, como si quisiera arrastrarte hacia el pasado. Ante ti se extiende la antigua ciudad de Aratis, dormida bajo siglos de silencio. Bajando al pueblo, cruzas sus calles hasta un lugar donde la historia respira aún: el Centro de Interpretación. En el interior, un holograma de guerrero se alza ante ti. A su alrededor, panoplias, cascos, mapas… y miradas de otros tiempos. ',
      spotifyTrackId: {
        happy: '0LfotVQUenZuloE7v9oGxt',
        reflective: '2oa53bhiNPCz2CGh26AYxi',
        excited: '7tIum2v5XF9IGnsuWGmK0d',
        peaceful: '44MnCI6tCO80JB5M9cNLVD'
      },
      routeMapUrl: '/assets/maps/3.png',
      texto_largo: 'Bajando al pueblo, cruzas sus calles hasta un lugar donde la historia respira aún: el Centro de Interpretación. En el interior, un holograma de guerrero se alza ante ti. A su alrededor, panoplias, cascos, mapas… y miradas de otros tiempos. [De pronto, algo ocurre. El holograma se detiene. Su rostro gira hacia ti. Y habla.] GUERRERO DE ARATIS: — Te he visto antes… — He visto tus pasos marcando la escoria, he sentido tu aliento al borde del bosque sagrado. — ¿Por qué has venido? ¿Para dar sentido a nuestra lucha? ¿O para reclamar lo que aún brilla entre las sombras de nuestras ruinas? [Sus ojos, vacíos y ardientes, esperan una respuesta.]',
      imageUrl: 'assets/historia/Balconada.png',
      decisionOptions: {
        optionA: 'He venido a dar voz a los que fueron silenciados.',
        optionB: 'He venido a encontrar lo que aún puede recuperarse… y usarlo sabiamente.'
      }
    },
    {
      id: 4,
      title: 'El Santuario Silencioso',
      content: 'El camino serpentea entre montañas cubiertas de encinas. El aire es distinto aquí. Más denso, más antiguo. Subes al cerro que corona Oseja. En la cima, la cruz moderna parece insignificante junto a las piedras que la rodean. Esas piedras no son ruinas… son guardianas.',
      spotifyTrackId: {
        happy: '05UMQXFCsa9oPnLgfJHVyF',
        reflective: '285ieonEuLkll3zknYK2TY',
        excited: '2gaZJDgE71VL9PzzUUlpMg',
        peaceful: '7rtxlP1iijQrZeUASrioeg'
      },
      routeMapUrl: '/assets/maps/4.png',
      texto_largo: '[Te sientas, sin saber por qué. El silencio se espesa. Y entonces lo oyes.] VOCES DEL SANTUARIO (en eco, como si muchas almas hablaran a la vez): — Aquí oraban los nuestros, sin templos ni altares, bajo el cielo abierto. — Aquí decidieron que morirían libres, antes que arrodillarse. [La fuente brota con fuerza repentina. Una chispa azulada flota sobre ella, como una pequeña alma que danza.] VOCES: — Has venido. Pero aún no has elegido quién eres. ',
      imageUrl: 'assets/historia/AguaSagrada.png',
      decisionOptions: {
        optionA: 'Soy quien escucha y respeta lo que la piedra y el agua aún recuerdan.',
        optionB: 'Soy quien busca el poder que aún duerme bajo esta tierra.'
      }
    },
    {
      id: 5,
      title: 'El Guardián de Hierro',
      content: 'El sendero se estrecha. Las sombras se alargan. Has llegado al corazón de Aratis. Las piedras aquí no están muertas… esperan. La torre, aunque rota por siglos de abandono, parece observarte. Y frente a ella, como esculpido en tiempo detenido, él: el Guardián de Hierro. ',
      spotifyTrackId: {
        happy: '2rZgyz0gDZPbJhSJF1lxqA',
        reflective: '1yDy1aVAS3PJv0UtYUKqCw',
        excited: '7takRd4tDjR2XePdCzAz09',
        peaceful: '4wsVIyE3Z096UWVClBJ2rY'
      },
      routeMapUrl: '/assets/maps/5.png',
      texto_largo: 'Una estatua viviente. Una voluntad encerrada en acero templado. Se mueve. Un paso. Otro. La lanza baja ligeramente, no como amenaza, sino como desafío. GUARDIÁN (voz profunda, como si surgiera desde dentro de la piedra): — Fuiste llamado. — Fuiste guiado por voces antiguas y por tus propias ansias. — Pero esta es la última frontera. Aquí no basta con caminar. [Se acerca. Cada paso hace vibrar el suelo. Su rostro, oculto por un casco, te muestra tu reflejo deformado.] — ¿Vienes a preservar… o a poseer? — ¿Eres heredero… o conquistador? [Tu respiración se detiene. El silencio del valle se vuelve absoluto. Tienes que responder. No con palabras vacías. Con intención.]',
      imageUrl: 'assets/historia/Guardian.png',
      decisionOptions: {
        optionA: 'He venido a recordar. A llevar vuestra historia más allá del olvido.',
        optionB: 'He venido a reclamar lo que nos pertenece. Es hora de recuperar lo perdido.'
      }
    },
    {
      id: 6,
      title: 'El Lenguaje del Cielo',
      content: 'Has cruzado el último umbral. Te detienes. El aire está quieto, como si el mundo contuviera la respiración. Tergakom se alza ante ti, no como ruina… sino como altar. Las piedras dispuestas en círculo no son casuales. Cada una apunta al cielo, como dedos sabios señalando antiguas respuestas.',
      spotifyTrackId: {
        happy: '3QMIm3wyjuR6tVldlI6Yoa ',
        reflective: '4wnSMhIHq3oJt0l3XmaAuZ',
        excited: '2gEAHKw83WHPD875YqDHH2',
        peaceful: '1oYdUFmhGTWuoxIROwAyMk'
      },
      routeMapUrl: '/assets/maps/6.png',
      texto_largo: ' Te acercas al centro. Allí, una roca lisa. Al tocarla, una sensación te recorre el cuerpo: calor, vibración… visión. Las estrellas se encienden en tu mente. Constelaciones celtas giran sobre tu cabeza. El cielo y la tierra se alinean. No estás solo. [Un susurro se alza, más antiguo que la lengua, más íntimo que el pensamiento.] VOZ DEL FIRMAMENTO: — Solo quien camina con el ritmo de la tierra y el pulso del cielo, puede comprender lo que nunca se dijo con palabras. — Lug observa. — Su casco no es solo metal. Es legado. — ¿Has venido como guía… o como dueño? [La luz se concentra en una piedra central. Brilla. Y espera.]',
      imageUrl: 'assets/historia/CirculoPiedrab.png',
      decisionOptions: {
        optionA: 'Soy guía. Solo deseo que su historia viva en quienes vendrán.',
        optionB: 'Soy heredero. Lo tomaré como símbolo del poder que merecemos.'
      }
    },
    // Modifica la historia 7 en tu array de stories
    {
      id: 7,
      title: 'La Caetra de Maidevera',
      content: 'El sendero se detiene sin ceremonia. No hay puertas que se abran. No hay guardianes. Solo una piedra solitaria... y sobre ella, una caetra. No es el Casco de Lug. No brilla como él. Pero su forma habla. Habla de defensa. De camino recorrido. De lucha interior.',
      spotifyTrackId: {
        happy: '5ky71GXSi2Rt2sgmbVGuqK',
        reflective: '3uO7KyqFbE2OtgNkrHkwrq',
        excited: '6eXw5tf0oLrJRowzaOetc0',
        peaceful: '6GdoprvrVSVMX7Cxk7mym0'
      },
      routeMapUrl: '/assets/maps/6.png',
      texto_largo: 'La Caetra de Maidevera ha sido forjada con otro propósito: no es símbolo de triunfo, sino de resistencia. De quienes caminaron con dudas, tropezaron... pero no huyeron. [Una ráfaga de viento acaricia tu rostro. El bosque guarda silencio. Y parece... comprensivo.] Has sido testigo. Has tocado el borde del legado. No era tu momento... aún.',
      imageUrl: 'assets/historia/finalMaideverac.png',
      decisionOptions: {
        optionA: 'Volver a empezar la aventura',
        optionB: 'Finalizar'
      }
    },
    {
      id: 8,
      title: 'El Legado del Casco de Lug',
      content: 'La luz toca el centro del círculo. Una piedra se desliza. La tierra se abre… y el tiempo se detiene. Allí, suspendido entre la historia y el presente, reposa el Casco de Lug. No es un artefacto. Es un eco viviente. Una corona de hierro, forjada con sangre, sabiduría y fuego.',
      spotifyTrackId: {
        happy: '0LfotVQUenZuloE7v9oGxt',
        reflective: '6EPRKhUOdiFSQwGBRBbvsZ',
        excited: '7tIum2v5XF9IGnsuWGmK0d',
        peaceful: '44MnCI6tCO80JB5M9cNLVD'
      },
      routeMapUrl: '/assets/maps/6.png',
      texto_largo: 'Lo alzas. Su peso no es físico. Es simbólico. [Las sombras de los antiguos se manifiestan a tu alrededor. No hablan. No necesitan hacerlo.] El cielo aclara. El viento cambia. Has sido digno. Has portado el Honor a lo largo del camino. El legado de Celtiberia vive ahora en ti.',
      imageUrl: 'assets/historia/FinalLughA.png',
      decisionOptions: {
        optionA: '',
        optionB: ''
      }
    }
  ];

  constructor(
    private sanitizer: DomSanitizer,
    private characterService: CharacterService,
    private router: Router
  ) {
    this.spotifyUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  ngOnInit() {
    this.characterService.character$.subscribe(character => {
      if (!character) {
        this.router.navigate(['/per']);
        return;
      }
      this.character = character;
    });

    setTimeout(() => {
      this.showMoodSelector = true;
    }, 3000);
  }

  getMoodLabel(mood: keyof SpotifyTracks): string {
    const labels = {
      happy: 'Aventurero',
      reflective: 'Sabio',
      excited: 'Guerrero',
      peaceful: 'Explorador'
    };
    return labels[mood];
  }

  getCharacterTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      warrior: 'Guerrero',
      mage: 'Mago',
      ranger: 'Explorador',
      druid: 'Druida'
    };
    return labels[type] || type;
  }

  get currentStory() {
    return this.stories[this.currentStoryIndex];
  }

  get isLastStory() {
    return this.currentStoryIndex === this.stories.length - 1;
  }

  selectMood(mood: keyof SpotifyTracks) {
    this.selectedMood = mood;
    this.updateSpotifyUrl();
  }

  updateSpotifyUrl() {
    if (!this.selectedMood) return;
    const trackId = this.currentStory.spotifyTrackId[this.selectedMood];
    const url = `https://open.spotify.com/embed/track/${trackId}`;
    this.spotifyUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  makeDecision(decision: 'A' | 'B') {
    this.currentStory.decision = decision;
    
    // Si estamos en la historia final 7 y se elige "Volver a empezar"
    if (this.currentStoryIndex === 6 && decision === 'A') {
      // Reiniciar la aventura
      this.resetAdventure();
      return;
    }
    // Si estamos en la historia final 7 y se elige "Finalizar"
    else if (this.currentStoryIndex === 6 && decision === 'B') {
      // Redirigir a alguna página de cierre o inicio
      this.router.navigate(['/']);
      return;
    }
    
    // Lógica normal para las otras historias
    if (decision === 'A') {
      this.puntuacion += 1;
    } else {
      this.puntuacion -= 1;
    }
  }
  
  // Método para reiniciar la aventura
  resetAdventure() {
    this.currentStoryIndex = 0;
    this.puntuacion = 0;
    this.showContent = false;
    this.showMoodSelector = false;
    this.selectedMood = null;
    
    setTimeout(() => {
      this.showContent = true;
      setTimeout(() => {
        this.showMoodSelector = true;
      }, 3000);
    }, 500);
    
    // Restablecer las decisiones
    this.stories.forEach(story => {
      story.decision = undefined;
    });
  }

  nextStory() {
    if (this.currentStoryIndex < this.stories.length - 3) { // Cambiado de -1 a -3 para detenerse antes de las historias 7 y 8
      this.showContent = false;
      this.showMoodSelector = false;
      this.selectedMood = null;
      
      setTimeout(() => {
        this.currentStoryIndex++;
        this.showContent = true;
        setTimeout(() => {
          this.showMoodSelector = true;
        }, 3000);
      }, 500);
    } else {
      // Verificar si es la historia 6 (índice 5) y determinar cuál final mostrar
      if (this.currentStoryIndex === 5) {
        // Si la puntuación es perfecta (6 puntos), mostrar historia 8
        // Sino, mostrar historia 7
        const finalId = this.puntuacion === 6 ? 7 : 6; // Índices 7 y 6 corresponden a historias 8 y 7
        
        this.showContent = false;
        this.showMoodSelector = false;
        this.selectedMood = null;
        
        setTimeout(() => {
          this.currentStoryIndex = finalId;
          this.showContent = true;
          // No mostramos el selector de mood en las historias finales
        }, 500);
      } else {
        // Si ya estamos en una historia final, redirigir al resultado
        this.router.navigate(['/resultado', this.puntuacion === 6 ? 8 : 7]);
      }
    }
  }
  previousStory() {
    if (this.currentStoryIndex > 0) {
      this.showContent = false;
      this.showMoodSelector = false;
      this.selectedMood = null;
      
      setTimeout(() => {
        this.currentStoryIndex--;
        this.showContent = true;
        setTimeout(() => {
          this.showMoodSelector = true;
        }, 3000);
      }, 500);
    }
  }

  viewRouteMap() {
    window.open(this.currentStory.routeMapUrl, '_blank');
  }
}