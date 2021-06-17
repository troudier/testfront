import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSelect2Component } from './users-select2.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UsersSelect2Component', () => {
  let component: UsersSelect2Component;
  let fixture: ComponentFixture<UsersSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersSelect2Component ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
