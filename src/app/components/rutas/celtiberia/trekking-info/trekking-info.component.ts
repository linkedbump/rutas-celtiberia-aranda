import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trekking-info',
  templateUrl: './trekking-info.component.html',
  styleUrls: ['./trekking-info.component.scss']
})
export class TrekkingInfoComponent {
  @Input() title: string = '';
  @Input() distance: string = '';
  @Input() difficulty: string = '';
  @Input() duration: string = '';
  @Input() elevation: string = '';
  @Input() season: string = '';
  @Input() equipment: string[] = [];
  @Input() tips: string = '';
}
