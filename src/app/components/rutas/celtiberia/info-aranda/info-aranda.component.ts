import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-aranda',
  templateUrl: './info-aranda.component.html',
  styleUrls: ['./info-aranda.component.css']
})
export class InfoArandaComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
} 