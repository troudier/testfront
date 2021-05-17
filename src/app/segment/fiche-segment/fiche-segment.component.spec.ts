import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheSegmentComponent } from './fiche-segment.component';

describe('FicheComponent', () => {
  let component: FicheSegmentComponent;
  let fixture: ComponentFixture<FicheSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheSegmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
