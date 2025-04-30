import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeltiberiaComponent } from './celtiberia.component';

describe('CeltiberiaComponent', () => {
  let component: CeltiberiaComponent;
  let fixture: ComponentFixture<CeltiberiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CeltiberiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CeltiberiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
