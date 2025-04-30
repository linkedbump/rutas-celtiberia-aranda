import { Component } from '@angular/core';

@Component({
  selector: 'app-punto-calcena',
  standalone: true,
  imports: [],
  template: `
<section class="qr-section">
  <h1>Calcena: Patrimonio Natural y Celtibérico</h1>
  <a href="assets/img/ARANDA_mapa.AF.png" target="_blank">
    <div class="qr-map-container">
  <img src="assets/img/ARANDA_mapa.AF.png" alt="Mapa Comarca del Aranda" class="qr-map" />
    </div>
</a>

  <p class="qr-description">
    Calcena se ubica en un paraje natural esplendoroso, escoltado por peñas calizas donde anidan los buitres,
    aves psicopompas para unos celtíberos cuyo hábitat se vuelve a documentar en el entorno del castillo.
  </p>
  <p class="qr-description">
    Las minas de Valdeplata también refrendan la importancia minera de estas tierras desde aquellos tiempos
    hasta el siglo XX. Esta localidad fue lugar de veraneo de los obispos de Tarazona y eso explica la riqueza
    patrimonial de su parroquial, primitivo templo románico convertido en espaciosa hallenkirche renacentista.
  </p>
  <p class="qr-description">
    Río Isuela arriba, en el “nido de águilas” de Purujosa, también hay restos de ese poblamiento celtibérico
    omnipresente en la zona. Desde aquí, a través de un camino tradicional o por la carretera hasta traspasar
    la muga del término de Beratón (Soria), se alcanza el bosque sagrado de la Celtiberia. Este robledal
    fronterizo ha sido habilitado como espacio interpretativo en abril de 2024 y pudiera estar relacionado
    con el németon que citara el escritor bilbilitano Marcial en el siglo I.
  </p>
</section>

<hr />

<!-- Footer --> 
  <footer class="footer-main">
    <div class="footer-content">
      <div class="footer-brand">
        <h4>Explora Ar-anda</h4>
        <p>Descubre rutas ancestrales y tesoros arqueologicos<p>
      </div>
      <div class="footer-links">
        <a href="#">Privacidad</a>
        <a href="#">Terminos</a>
        <a href="#">Contacto</a>
      </div>
    </div>
    
    <!-- Logos institucionales --> 
    <div class="footer-logos">
      <img src="assets/footer/FOOTER_PST.jpg" alt="Logotipos institucionales" />
    </div>

    <div class="footer-bottom">
      <p>© 2025 Ar-anda. Todos los derechos reservados.</p>
    </div>
  </footer>

<hr />
    
  `,
  styles: `
  .qr-section {
   max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Merriweather', serif;
  background: #fefcf8;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  color: #3b2f2f;
  line-height: 1.8;}

  h1 {
    margin-top: 50px;
  font-size: 2rem;
  color: var(--primary-color);
  font-weight: 700;
  text-align: center;
  border-bottom: 2px solid var(--primary-light);
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  
  }


 p {
  margin-bottom: 1rem;
  }
.qr-description {
  font-size: 1.1rem;   
  margin-left: 50px;
  margin-right: 50px;
}
.qr-map-container {
  display: flex;  
  align-items: center;
  justify-content: center;
}
.qr-map {
  width: 50%;


  max-height: 500px;
  object-fit: cover;
  margin: 1.5rem 0;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  cursor: pointer;
}

@media (max-width: 600px) {
  .qr-section {
    padding: 1rem;
  }

  .qr-section h1 {
    font-size: 1.5rem;
  }
}
.footer-main {
  background: #f9f9f9;
  margin-top: 2rem;
  border-top: 1px solid #e0e0e0;
  padding: 2rem 1rem 1rem;
  font-size: 0.9rem;
  color: #444;

  .footer-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 1rem;
  }

  .footer-brand h4 {
    margin: 0 0 0.25rem;
    font-weight: bold;
  }

  .footer-links {
    display: flex;
    gap: 1.5rem;
    align-items: center;

    a {
      text-decoration: none;
      color: #666;
      transition: color 0.2s;

      &:hover {
        color: #000;
      }
    }
  }

  .footer-bottom {
    text-align: center;
    font-size: 0.8rem;
    color: #777;
    border-top: 1px solid #eee;
    padding-top: 1rem;
    margin-top: 1rem;
  }
}

.footer-logos {
  display: flex;
  margin-top: 2rem;
  justify-content: center;
  padding: 1rem 0;

  img {
    max-width: 70%;
    height: auto;
  }
}
`
})
export class PuntoCalcenaComponent {

}

