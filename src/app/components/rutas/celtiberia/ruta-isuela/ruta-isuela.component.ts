import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { PuntosService } from '../../../../services/puntos.service';
import { PuntosInteres } from '../../../../types/punto-interes.model';
import { MapStyleService } from '../../../../services/map-style.service';


interface AudioTrack {
  title: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-ruta-isuela',
  templateUrl: './ruta-isuela-component.html',
  styleUrls: ['./ruta-isuela-component.scss']
})
export class RutaIsuelaComponent implements OnInit, OnDestroy {
  puntos: PuntosInteres[] = [];
  private map!: L.Map;
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
      title: 'Valle del Isuela',
      description: 'Ruta historica del valle del Isuela',
      url: 'assets/audios/Valle del Isuela.MP3'
    }
  ];
  currentTrackIndex = 0;
  errorMessage: string = '';

  constructor(
    private puntosService: PuntosService,
    private mapStyle: MapStyleService
  ) {}

  ngOnInit(): void {
    this.puntos = this.puntosService.getPuntos('isuela');
    this.initializeMap();
    this.currentAudio = this.audioTracks[0];
    this.initializeAudio();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([41.5740, -1.7800], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.puntos.forEach(punto => {
      if (this.coordenadasValidas(punto.lat, punto.lng)) {
        L.marker([punto.lat, punto.lng], { icon: this.mapStyle.customIcon})
          .bindPopup(`<b>${punto.nombre}</b><br>${punto.descripcion}`)
          .addTo(this.map);
      }
    });
  }

  private initializeAudio(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }

    try {
      this.audio = new Audio();
      
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
  previousAudio(): void {
    if (this.currentTrackIndex > 0) {
      this.currentTrackIndex--;
      this.currentAudio = this.audioTracks[this.currentTrackIndex];
      this.initializeAudio();
      if (this.isPlaying) {
        this.audio?.play();
      }
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
  hasPreviousAudio(): boolean {
    return this.currentTrackIndex > 0;
  }
  hasNextAudio(): boolean {
    return this.currentTrackIndex < this.audioTracks.length - 1;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  getCurrentTimeFormatted(): string {
    return this.formatTime(this.currentTime);
  }

  getDurationFormatted(): string {
    return this.formatTime(this.duration);
  }

  centrarEnPunto(punto: PuntosInteres): void {
    if (this.coordenadasValidas(punto.lat, punto.lng)) {
      this.map.setView([punto.lat, punto.lng], 15);
    }
  }

  private coordenadasValidas(lat: number, lng: number): boolean {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  }
}
