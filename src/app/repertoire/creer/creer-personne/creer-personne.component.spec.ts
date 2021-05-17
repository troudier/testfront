import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerPersonneComponent } from './creer-personne.component';

describe('CreerPersonnePhysiqueComponent', () => {
  let component: CreerPersonneComponent;
  let fixture: ComponentFixture<CreerPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerPersonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
