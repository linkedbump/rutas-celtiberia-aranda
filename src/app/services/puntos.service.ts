import { Injectable } from '@angular/core';
import { PuntosInteres } from 'src/app/types/punto-interes.model';


@Injectable({
  providedIn: 'root'
})
export class PuntosService {
  private puntos: PuntosInteres[] = [
    {
      id:1,
      ruta: 'aranda',
      nombre: 'Gotor - Yacimiento de El Calvario',
      descripcion: 'Pequeño poblado celtibérico con restos de actividad minera. Convento dominico del siglo XVI con yeserías mudéjares, claustro arruinado y dependencias monásticas.',
      lat: 41.55042,
      lng: -1.65422,
      imagen: 'assets/img/puntos/gotor.jpg'
    },
    {
      id:2,
      ruta: 'aranda',
      nombre: 'Aranda de Moncayo - Aratis',
      descripcion: 'Ciudad celtibérica amurallada y emporio minero y metalúrgico donde se encontraron los célebres cascos (c. 200 a.C.). Centro de interpretación del yacimiento en el pueblo.',
      lat: 41.58482,
      lng: -1.78636,
      imagen: 'assets/img/puntos/ArandaDuerovistaAerea.jpg'
    },
    {
      id: 8,
      ruta: 'aranda',
      nombre: 'Oseja – Asentamiento Celtibérico',
      descripcion: 'Castro celtibérico en la peña de la Muela con actividad minera vinculada a Aratis. Centro de interpretación de la Celtiberia y la sociedad campesina. Paisaje antrópico fundido con el de media montaña.',
      lat: 41.59624,
      lng: -1.70010,
      imagen: 'assets/img/puntos/Oseja.jpg'
    },
        {
      id:3,
      ruta: 'isuela',
      nombre: 'Calcena - Minas de Valdeplata',
      descripcion: 'Actividad minera celtibérica continuada hasta hoy.',
      lat: 41.69102,
      lng: -1.68398,
      imagen: 'assets/img/puntos/CalcenaMinas.jpg'
    },
    {
      id:4,
      ruta: 'isuela',
      nombre: 'Tierga - ciudad celtibérica de Tegacom',
      descripcion: 'Lugar estratégico con una ceca donde se emitían monedas celtibéricas. Torre múdejar siglo XVI. Singular urbanismo múdejar/morisco',
      lat: 41.60831,
      lng: -1.60134,
      imagen: 'assets/img/puntos/Tierga.jpg'
    },
    {
      id: 5,
      ruta: 'isuela',
      nombre: 'Calcena',
      descripcion: 'restos de población celtibérica en las ruinas del castillo. Excepcional iglesia de origen románico y esplendoroso desarrollo renacentista. Sede veraniega de los obispos de Tarazona.',
      lat: 41.65569,
      lng:  -1.71776,
      imagen: 'assets/img/puntos/Calcena.jpg'
    },
    {
      id: 6,
      ruta: 'isuela',
      nombre: 'Purujosa – Restos en la parroquial',
      descripcion: 'Pueblo colgado en riscos calizos. Restos celtibéricos en el entorno de la iglesia. Caserío de interés etnográfico. Parque natural del Moncayo. El pueblo más pequeño de España con semáforo.',
      lat: 41.68237,
      lng: -1.76377,
      imagen: 'assets/img/puntos/purujosa.jpg'

    },
    {
      id: 7,
      ruta: 'isuela',
      nombre: 'Beratón – Bosque sagrado de la Celtiberia',
      descripcion: 'Quizá aquí pudo situarse el Sanctum Ilicetum Buradonis citado por Marcial (s.I.). Ruta señalizada desde el bosque hasta el pueblo soriano, al pie del Moncayo. (explicado en carteles in situ)',
      lat: 41.69887,
      lng: -1.80067,
      imagen: 'assets/img/puntos/Beratón.jpg'
    }
  ]
  getPuntos(ruta: string): PuntosInteres[] {
    return this.puntos.filter(punto => punto.ruta === ruta);
  }

  getTodos(): PuntosInteres[] {
    return this.puntos;
  }

}
