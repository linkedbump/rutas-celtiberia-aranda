import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsejaComponent } from './oseja.component';

describe('OsejaComponent', () => {
  let component: OsejaComponent;
  let fixture: ComponentFixture<OsejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsejaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
