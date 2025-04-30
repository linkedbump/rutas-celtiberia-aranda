import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoAratisComponent } from './punto-aratis.component';

describe('PuntoAratisComponent', () => {
  let component: PuntoAratisComponent;
  let fixture: ComponentFixture<PuntoAratisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntoAratisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntoAratisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
