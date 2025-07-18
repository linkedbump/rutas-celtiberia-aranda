import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-isuela',
  templateUrl: './info-isuela.component.html',
  styleUrls: ['./info-isuela.component.css']
})
export class InfoIsuelaComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
} 