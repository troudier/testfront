import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCartesComponent } from './liste-cartes.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NotifierModule} from 'angular-notifier';

describe('ListeCartesComponent', () => {
  let component: ListeCartesComponent;
  let fixture: ComponentFixture<ListeCartesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCartesComponent ],
      imports: [
        HttpClientTestingModule,
        NotifierModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
