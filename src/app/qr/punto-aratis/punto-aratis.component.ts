import { Component } from '@angular/core';

@Component({
  selector: 'app-punto-aratis',
  standalone: true,
  imports: [],
  template: `
    <section class="qr-section">
  <h1>Aratis: Ciudad Celtibérica del Hierro</h1>
  <p>
    Aratis fue un importante centro metalúrgico y una de las ciudades importantes de la Celtiberia, privilegiada
    por ser encrucijada entre la Meseta y el valle del Ebro. Todavía queda mucho por descubrir y excavar, pero
    este yacimiento ha deparado ya muchos objetos -expoliados y felizmente recuperados- de indudable valor
    arqueológico.
  </p>
  <p>
    Distinguimos el sistema defensivo, intuimos las casas y debemos saber que se han documentado varias
    necrópolis y algunos hitos astrológicos. Desde este cerro, de difícil acceso, se divisaba el abrupto
    entorno montañoso de la sierra de la Virgen y de las estribaciones del Moncayo.
  </p>
  <p>
    Desde aquí podemos acercarnos a Aranda de Moncayo y visitar el Centro de Interpretación de la Celtiberia.
    Allí se darán respuesta a muchas preguntas que nos venimos haciendo al ver en Aratis esa sorprendente puesta
    en escena urbana. Por Oseja podemos conectar con el otro itinerario de valle del Isuela.
  </p>
</section>

<hr />
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
export class PuntoAratisComponent {

}
