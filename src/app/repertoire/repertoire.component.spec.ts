import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepertoireComponent } from './repertoire.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('RepertoireComponent', () => {
  let component: RepertoireComponent;
  let fixture: ComponentFixture<RepertoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepertoireComponent ],
      imports: [
        RouterTestingModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepertoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
