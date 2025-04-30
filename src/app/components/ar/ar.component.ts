// ar-viewer.component.ts
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


@Component({
  selector: 'app-ar-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
   <div class="ar-container">
  <div class="ar-header">
    <button class="back-button" (click)="goBack()">←</button>
    <div class="info-overlay">
      <h2>{{ currentPOI?.title }}</h2>
      <p>{{ currentPOI?.description }}</p>
    </div>
  </div>

  <canvas #canvas></canvas>
</div>

  `,
  styles: [`
    .ar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: linear-gradient(to right,var(--primary-color), var(--primary-dark));
  color: white;
  border-radius: 8px 8px 0 0;
}

.ar-header .back-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: var(--secondary-dark);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease, transform 0.2s ease;
}

.ar-header .back-button:hover {
  background: #2a5298;
  transform: scale(1.05);
}

.info-overlay h2 {
  margin: 0;
  font-size: 1.5rem;
}

.info-overlay p {
  margin: 0.25rem 0 0;
  font-size: 0.95rem;
  color: #dcdcdc;
}

canvas {
  width: 100%;
  height: 50vh;
  display: block;
  background: #111;
  margin: 0 auto;
  border-radius: 0 0 8px 8px;
}


  `]
})// ... (mantener los mismos estilos del ejemplo anterior

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
      position: { lat: 41.58379, lng: -1.70254 }, // Coordenadas de ejemplo
      modelPath: 'assets/models/caetra.glb',
      description: 'Escudo pequeño circular usado por los guerreros celtibéricos'
    },
    {
      id: 2,
      title: 'Casa Celtíbera',
      position: { lat: 41.5765, lng: -1.7918 }, // Coordenadas de ejemplo
      modelPath: 'assets/models/casa.glb',
      description: 'De planta rectangular, paredes de mampostería y barro y tejado vegetal'
    },
    {
      id: 3,
      title: 'Casco celtíbero',
      position: { lat: 41.58400, lng: -1.78744 }, // Coordenadas de ejemplo
      modelPath: 'assets/models/casco1.glb',
      description: 'modelo de aire calcídico que se forjaba en hierro en Aratis (c. 200 a.C.)'
    },
    {
      id: 4,
      title: 'Casco celtíbero',
      position: { lat: 41.5740, lng: -1.7890 }, // Coordenadas de ejemplo
      modelPath: 'assets/models/casco2.glb',
      description: 'Casco de combate celtíbero con decoración característica.'
    },   
    {
      id: 5,
      title: 'Espada',
      position: { lat: 41.55108, lng: -1.65014 }, // Coordenadas de ejemplo
      modelPath: 'assets/models/espadaDeAntenas.glb',
      description: 'Espada de antenas celtibera.'
    },
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