import { Component, OnInit, OnDestroy } from '@angular/core';

interface AudioTrack {
  title: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-celtiberia',
  templateUrl: './celtiberia.component.html',
  styleUrls: ['./celtiberia.component.css']
})
export class CeltiberiaComponent implements OnInit, OnDestroy {
  private audio: HTMLAudioElement | null = null;
  private progressInterval: any;

  // Propiedades del reproductor de audio
  currentAudio: AudioTrack | null = null;
  isPlaying = false;
  progress = 0;
  currentTime = 0;
  duration = 0;
  audioTracks: AudioTrack[] = [
    {
      title: 'Introducción a la Celtiberia',
      description: 'Descubre la historia y el legado de la Celtiberia',
      url: '/assets/audios/Introduccion.MP3'
    }
  ];
  currentTrackIndex = 0;
  errorMessage: string = '';

  ngOnInit(): void {
    // Inicializar el primer audio
    this.currentAudio = this.audioTracks[0];
    this.initializeAudio();
  }

  ngOnDestroy(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  private initializeAudio(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }

    try {
      this.audio = new Audio();
      
      // Agregar manejadores de eventos antes de establecer la fuente
      this.audio.addEventListener('loadedmetadata', () => {
        console.log('Metadata cargada correctamente');
        this.duration = this.audio?.duration || 0;
      });

      this.audio.addEventListener('timeupdate', () => {
        if (this.audio) {
          this.currentTime = this.audio.currentTime;
          this.progress = (this.audio.currentTime / this.audio.duration) * 100;
        }
      });

      this.audio.addEventListener('ended', () => {
        this.nextAudio();
      });

      this.audio.addEventListener('error', (e) => {
        console.error('Error al cargar el audio:', e);
        this.errorMessage = 'Error al cargar el audio. Por favor, intenta de nuevo.';
      });

      // Establecer la fuente del audio
      this.audio.src = this.currentAudio?.url || '';
      console.log('URL del audio:', this.audio.src);
    } catch (error) {
      console.error('Error al inicializar el audio:', error);
      this.errorMessage = 'Error al inicializar el reproductor de audio.';
    }
  }

  togglePlay(): void {
    if (!this.audio) {
      console.error('El audio no está inicializado');
      return;
    }

    try {
      if (this.isPlaying) {
        this.audio.pause();
        if (this.progressInterval) {
          clearInterval(this.progressInterval);
        }
      } else {
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Error al reproducir el audio:', error);
            this.errorMessage = 'Error al reproducir el audio. Por favor, intenta de nuevo.';
          });
        }
        this.progressInterval = setInterval(() => {
          if (this.audio) {
            this.progress = (this.audio.currentTime / this.audio.duration) * 100;
          }
        }, 100);
      }

      this.isPlaying = !this.isPlaying;
    } catch (error) {
      console.error('Error en togglePlay:', error);
      this.errorMessage = 'Error al controlar la reproducción.';
    }
  }

  nextAudio(): void {
    if (this.currentTrackIndex < this.audioTracks.length - 1) {
      this.currentTrackIndex++;
      this.currentAudio = this.audioTracks[this.currentTrackIndex];
      this.initializeAudio();
      if (this.isPlaying) {
        this.audio?.play();
      }
    }
  }

  hasNextAudio(): boolean {
    return this.currentTrackIndex < this.audioTracks.length - 1;
  }
}