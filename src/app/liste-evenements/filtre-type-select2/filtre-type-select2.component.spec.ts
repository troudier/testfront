import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { FiltreTypeSelect2Component } from './filtre-type-select2.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('FiltreTypeSelect2Component', () => {
  let component: FiltreTypeSelect2Component;
  let fixture: ComponentFixture<FiltreTypeSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltreTypeSelect2Component ],
          imports: [
            HttpClientTestingModule,
            RouterTestingModule
          ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreTypeSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
