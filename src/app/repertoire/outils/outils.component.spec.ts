import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutilsComponent } from './outils.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('RepertoireOutilsComponent', () => {
  let component: OutilsComponent;
  let fixture: ComponentFixture<OutilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutilsComponent ],
      imports: [
        RouterTestingModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
