import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoOsejaComponent } from './punto-oseja.component';

describe('PuntoOsejaComponent', () => {
  let component: PuntoOsejaComponent;
  let fixture: ComponentFixture<PuntoOsejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntoOsejaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntoOsejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
