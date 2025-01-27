// ar-viewer.component.ts
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-ar-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ar-container">
      <button class="back-button" (click)="goBack()">←</button>
      
      <canvas #canvas></canvas>
      
      <div class="info-overlay">
        <h2>{{ currentPOI?.title }}</h2>
        <p>{{ currentPOI?.description }}</p>
        
        <button class="audio-button" (click)="toggleAudio()">
          <i class="bi" [class.bi-play-fill]="!isPlaying" [class.bi-pause-fill]="isPlaying"></i>
          Escuchar historia
        </button>
      </div>
    </div>
  `,
  // ... (mantener los mismos estilos del ejemplo anterior)
})
export class ArViewerComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  
  currentPOI: any;
  isPlaying = false;
  private controls!: OrbitControls;
  
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private model: THREE.Object3D | null = null;

  private pointsOfInterest = [
    {
      id: 1,
      title: 'Caetra',
      modelPath: 'assets/models/caetra.glb',
      description: 'Escudo circular utilizado por los guerreros celtíberos.'
    },
    {
      id: 2,
      title: 'Casa Celtíbera',
      modelPath: 'assets/models/casa.glb',
      description: 'Reconstrucción de una vivienda típica celtíbera.'
    },
    {
      id: 3,
      title: 'Casco Tipo 1',
      modelPath: 'assets/models/casco1.glb',
      description: 'Casco ceremonial celtíbero del tipo Montefortino.'
    },
    {
      id: 4,
      title: 'Casco Tipo 2',
      modelPath: 'assets/models/casco2.glb',
      description: 'Casco de combate celtíbero con decoración característica.'
    },{
      id: 5,
      title: 'Druida',
      position: { lat: 41.5740, lng: -1.7800 }, // Coordenadas de ejemplo
      modelPath: 'assets/models/druida.glb',
      description: 'Casco de combate celtíbero con decoración característica.'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const poiId = parseInt(params['id']);
      this.currentPOI = this.pointsOfInterest.find(poi => poi.id === poiId);
      if (this.currentPOI && this.scene) {
        this.loadModel(this.currentPOI.modelPath);
      }
    });
  }

  ngAfterViewInit() {
    this.initThreeJS();
    if (this.currentPOI) {
      this.loadModel(this.currentPOI.modelPath);
    }
    this.animate();
  }

  private initThreeJS() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a1a);
    
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Añadir controles de órbita
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    this.camera.position.z = 5;

    // Manejar redimensionamiento
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  private loadModel(modelPath: string) {
    if (this.model) {
      this.scene.remove(this.model);
      this.model = null;
    }

    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        this.model = gltf.scene;
        
        // Centrar el modelo
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        this.model.position.sub(center);
        
        // Ajustar escala
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 2) {
          const scale = 2 / maxDim;
          this.model.scale.multiplyScalar(scale);
        }

        this.scene.add(this.model);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado');
      },
      (error) => {
        console.error('Error cargando el modelo:', error);
      }
    );
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  goBack() {
    this.router.navigate(['/map']);
  }

  toggleAudio() {
    this.isPlaying = !this.isPlaying;
    // Implementar la lógica del audio
  }
}