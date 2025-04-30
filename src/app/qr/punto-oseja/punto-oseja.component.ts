import { Component } from '@angular/core';

@Component({
  selector: 'app-punto-oseja',
  standalone: true,
  imports: [],
  template: `
    <section class="qr-section">
  <h1>Oseja: Encrucijada de Caminos Celtibéricos</h1>
  <p>
    Desde aquí se puede observar un altozano coronado por una cruz; allí se encuentran los restos de un poblado
    celtibérico que dominaba el entorno, con funcionalidades y cronología probablemente similares al Calvario
    de Gotor (ss. VI-I a.C.).
  </p>
  <p>
    En el interior del pueblo debes visitar el Museo de la Agricultura y la Celtiberia, donde se explica el modo
    de vida agropecuario que imperó en esta encrucijada montañosa entre valles desde los celtíberos hasta mediados
    del siglo XX.
  </p>
  <p>
    Desde aquí puedes conectar con las dos rutas que hemos propuesto en los valles del Aranda y del Isuela, que
    conforman esta comarca aragonesa entre la sierra de la Virgen y el Moncayo: Aranda de Moncayo y Calcena te
    esperan con sus encantos.
  </p>
</section>
  `,
  styles: `
  .qr-section {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Merriweather', serif;
    background: #fefcf8;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    color: #3b2f2f;
    line-height: 1.8;
  }
  
  .qr-section h1 {
    font-size: 2rem;
    color: #6b3e26;
    border-bottom: 2px solid #d8b08c;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
  }
  
  .qr-section p {
    margin-bottom: 1rem;
  }
  
  @media (max-width: 600px) {
    .qr-section {
      padding: 1rem;
    }
  
    .qr-section h1 {
      font-size: 1.5rem;
    }
  }
  `
})
export class PuntoOsejaComponent {

}
