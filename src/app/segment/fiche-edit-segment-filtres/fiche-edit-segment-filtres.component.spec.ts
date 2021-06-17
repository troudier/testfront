import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheEditSegmentFiltresComponent } from './fiche-edit-segment-filtres.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('FicheEditSegmentFiltresComponent', () => {
  let component: FicheEditSegmentFiltresComponent;
  let fixture: ComponentFixture<FicheEditSegmentFiltresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheEditSegmentFiltresComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ]
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
