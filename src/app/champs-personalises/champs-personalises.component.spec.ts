import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampsPersonalisesComponent } from './champs-personalises.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ChampsPersonalisesComponent', () => {
  let component: ChampsPersonalisesComponent;
  let fixture: ComponentFixture<ChampsPersonalisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampsPersonalisesComponent ],
      imports : [
        ReactiveFormsModule,
        FormsModule,
          HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampsPersonalisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
