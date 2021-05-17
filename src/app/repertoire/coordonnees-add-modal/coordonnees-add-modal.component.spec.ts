import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordonneesAddModalComponent } from './coordonnees-add-modal.component';

describe('CoordonneesAddModalComponent', () => {
  let component: CoordonneesAddModalComponent;
  let fixture: ComponentFixture<CoordonneesAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordonneesAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordonneesAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
