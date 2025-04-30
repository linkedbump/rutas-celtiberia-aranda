import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuntoCalcenaComponent } from './punto-calcena.component';

describe('PuntoCalcenaComponent', () => {
  let component: PuntoCalcenaComponent;
  let fixture: ComponentFixture<PuntoCalcenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntoCalcenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntoCalcenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
