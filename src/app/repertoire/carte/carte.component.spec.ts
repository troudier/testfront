import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteComponent } from './carte.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CarteComponent', () => {
  let component: CarteComponent;
  let fixture: ComponentFixture<CarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarteComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
