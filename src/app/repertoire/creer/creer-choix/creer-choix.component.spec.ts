import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerChoixComponent } from './creer-choix.component';

describe('CreerChoixComponent', () => {
  let component: CreerChoixComponent;
  let fixture: ComponentFixture<CreerChoixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerChoixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerChoixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
