import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheEditSegmentFiltresComponent } from './fiche-edit-segment-filtres.component';

describe('FicheEditSegmentFiltresComponent', () => {
  let component: FicheEditSegmentFiltresComponent;
  let fixture: ComponentFixture<FicheEditSegmentFiltresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheEditSegmentFiltresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheEditSegmentFiltresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
