import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCartesSegmentComponent } from './liste-cartes-segment.component';

describe('ListeCartesComponent', () => {
  let component: ListeCartesSegmentComponent;
  let fixture: ComponentFixture<ListeCartesSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCartesSegmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCartesSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
