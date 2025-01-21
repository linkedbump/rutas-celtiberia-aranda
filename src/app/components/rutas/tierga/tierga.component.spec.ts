import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiergaComponent } from './tierga.component';

describe('TiergaComponent', () => {
  let component: TiergaComponent;
  let fixture: ComponentFixture<TiergaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiergaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiergaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
