import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerPersonneComponent } from './creer-personne.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NotifierService, NotifierModule} from 'angular-notifier';

describe('CreerPersonneComponent', () => {
  let component: CreerPersonneComponent;
  let fixture: ComponentFixture<CreerPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerPersonneComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        NotifierModule
      ],
      providers:
          [
            NotifierService,
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
    fixture = TestBed.createComponent(CreerPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
