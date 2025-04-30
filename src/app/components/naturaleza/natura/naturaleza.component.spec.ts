import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturaComponent } from './natura.component';

describe('NaturalezaComponent', () => {
  let component: NaturaComponent;
  let fixture: ComponentFixture<NaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
