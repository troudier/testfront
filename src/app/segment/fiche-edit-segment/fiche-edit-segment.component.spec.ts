import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheEditSegmentComponent } from './fiche-edit-segment.component';

describe('FicheEditSegmentComponent', () => {
  let component: FicheEditSegmentComponent;
  let fixture: ComponentFixture<FicheEditSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheEditSegmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheEditSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
