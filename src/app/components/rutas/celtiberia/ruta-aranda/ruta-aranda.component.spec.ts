import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaArandaComponent } from './ruta-aranda.component';

describe('RutaArandaComponent', () => {
  let component: RutaArandaComponent;
  let fixture: ComponentFixture<RutaArandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutaArandaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutaArandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
