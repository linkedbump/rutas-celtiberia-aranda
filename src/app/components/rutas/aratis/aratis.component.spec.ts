import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AratisComponent } from './aratis.component';

describe('AratisComponent', () => {
  let component: AratisComponent;
  let fixture: ComponentFixture<AratisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AratisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AratisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
