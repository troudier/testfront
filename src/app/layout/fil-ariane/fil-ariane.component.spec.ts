import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilArianeComponent } from './fil-ariane.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('FilArianeComponent', () => {
  let component: FilArianeComponent;
  let fixture: ComponentFixture<FilArianeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilArianeComponent ],
      imports: [
        RouterTestingModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilArianeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
