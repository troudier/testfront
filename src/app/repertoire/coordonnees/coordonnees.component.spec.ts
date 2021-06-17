import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordonneesComponent } from './coordonnees.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CoordonneesComponent', () => {
  let component: CoordonneesComponent;
  let fixture: ComponentFixture<CoordonneesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordonneesComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordonneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
