import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { PuntosInteres } from 'src/app/types/punto-interes.model';
import { PuntosService } from 'src/app/services/puntos.service';
import { MapStyleService } from 'src/app/services/map-style.service';

interface AudioTrack {
  title: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-ruta-aranda',
  templateUrl: './ruta-aranda.component.html',
  styleUrls: ['./ruta-aranda.component.scss']
})
export class RutaArandaComponent implements OnInit, OnDestroy {
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
      title: 'Itinerario Valle del Aranda',
      description: 'Descripción completa del itinerario por el Valle del Aranda',
      url: 'assets/audios/Itinerario Valle del Aranda.MP3'
    },
    {
      title: 'Tramo Conexión Oseja',
      description: 'Ruta de conexión hacia Oseja',
      url: 'assets/audios/Tramo Conexión Oseja.MP3'
    }
  ];
  currentTrackIndex = 0;

  constructor(
    private puntosService: PuntosService,
    private mapStyle: MapStyleService 
  
  ) {}

  ngOnInit(): void {
    this.puntos = this.puntosService.getPuntos('aranda');

    this.map = L.map('map').setView([41.60, -1.70], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.puntos.forEach(punto => {
      if (this.coordenadasValidas(punto.lat, punto.lng)) {
        const marker = L.marker([punto.lat, punto.lng], { icon: this.mapStyle.customIcon})
          .addTo(this.map)
          .bindPopup(`
            <strong>${punto.nombre}</strong><br>
            <img src="${punto.imagen || 'https://via.placeholder.com/400x200?text=Sin+Imagen'}" alt="${punto.nombre}" width="200"><br>
            ${punto.descripcion}
          `);
      } else {
        console.warn(`Coordenadas inválidas para el punto: ${punto.nombre}`);
      }
    });

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

    this.audio = new Audio(this.currentAudio?.url);
    this.audio.addEventListener('loadedmetadata', () => {
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
  }

  togglePlay(): void {
    if (!this.audio) return;

    if (this.isPlaying) {
      this.audio.pause();
      if (this.progressInterval) {
        clearInterval(this.progressInterval);
      }
    } else {
      this.audio.play();
      this.progressInterval = setInterval(() => {
        if (this.audio) {
          this.progress = (this.audio.currentTime / this.audio.duration) * 100;
        }
      }, 100);
    }

    this.isPlaying = !this.isPlaying;
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

  centrarEnPunto(punto: PuntosInteres): void {
    if (this.map && this.coordenadasValidas(punto.lat, punto.lng)) {
      this.map.setView([punto.lat, punto.lng], 14);
    }
  }

  private coordenadasValidas(lat: number, lng: number): boolean {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  }
}
