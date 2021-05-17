import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentEditFiltreElementComponent } from './segment-edit-filtre-element.component';

describe('SegmentEditFiltreElementComponent', () => {
  let component: SegmentEditFiltreElementComponent;
  let fixture: ComponentFixture<SegmentEditFiltreElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentEditFiltreElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentEditFiltreElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
