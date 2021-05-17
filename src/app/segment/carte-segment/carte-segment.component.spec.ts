import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteSegmentComponent } from './carte-segment.component';

describe('CarteComponent', () => {
  let component: CarteSegmentComponent;
  let fixture: ComponentFixture<CarteSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarteSegmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
