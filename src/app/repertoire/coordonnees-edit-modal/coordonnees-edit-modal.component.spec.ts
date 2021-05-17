import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordonneesEditModalComponent } from './coordonnees-edit-modal.component';

describe('CoordonneesEditModalComponent', () => {
  let component: CoordonneesEditModalComponent;
  let fixture: ComponentFixture<CoordonneesEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordonneesEditModalComponent ]
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
