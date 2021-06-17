import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerFonctionComponent } from './creer-fonction.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotifierModule, NotifierService} from 'angular-notifier';
import {NotifierQueueService} from 'angular-notifier/lib/services/notifier-queue.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('CreerFonctionComponent', () => {
  let component: CreerFonctionComponent;
  let fixture: ComponentFixture<CreerFonctionComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerFonctionComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        NotifierModule,
        RouterTestingModule,
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
    fixture = TestBed.createComponent(CreerFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
