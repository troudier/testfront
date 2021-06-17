import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordonneesEditModalComponent } from './coordonnees-edit-modal.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CoordonneesEditModalComponent', () => {
  let component: CoordonneesEditModalComponent;
  let fixture: ComponentFixture<CoordonneesEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordonneesEditModalComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordonneesEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
