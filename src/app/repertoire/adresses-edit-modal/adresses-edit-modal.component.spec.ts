import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressesEditModalComponent } from './adresses-edit-modal.component';

describe('AdressesEditModalComponent', () => {
  let component: AdressesEditModalComponent;
  let fixture: ComponentFixture<AdressesEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdressesEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressesEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
