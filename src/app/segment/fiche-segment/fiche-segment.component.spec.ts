import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheSegmentComponent } from './fiche-segment.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('FicheComponent', () => {
  let component: FicheSegmentComponent;
  let fixture: ComponentFixture<FicheSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheSegmentComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers:
          [
            {
              provide: ActivatedRoute,
              useValue: {
                snapshot: {params: {}}
              }
            }
          ]
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
