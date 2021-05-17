import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerFonctionComponent } from './creer-fonction.component';

describe('CreerFonctionComponent', () => {
  let component: CreerFonctionComponent;
  let fixture: ComponentFixture<CreerFonctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerFonctionComponent ]
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
