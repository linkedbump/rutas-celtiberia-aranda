import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaIsuelaComponent } from './ruta-isuela.component';

describe('RutaIsuelaComponentComponent', () => {
  let component: RutaIsuelaComponent;
  let fixture: ComponentFixture<RutaIsuelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutaIsuelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutaIsuelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
