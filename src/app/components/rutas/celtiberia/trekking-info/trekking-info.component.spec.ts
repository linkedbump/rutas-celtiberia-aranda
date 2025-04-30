import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrekkingInfoComponent } from './trekking-info.component';

describe('TrekkingInfoComponent', () => {
  let component: TrekkingInfoComponent;
  let fixture: ComponentFixture<TrekkingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrekkingInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrekkingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
