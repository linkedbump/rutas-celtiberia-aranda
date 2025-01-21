import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArandaComponent } from './aranda.component';

describe('ArandaComponent', () => {
  let component: ArandaComponent;
  let fixture: ComponentFixture<ArandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArandaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
