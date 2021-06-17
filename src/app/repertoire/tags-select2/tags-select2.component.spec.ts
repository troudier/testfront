import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsSelect2Component } from './tags-select2.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NotifierModule, NotifierService} from 'angular-notifier';
import {NotifierQueueService} from 'angular-notifier/lib/services/notifier-queue.service';

describe('TagsSelect2Component', () => {
  let component: TagsSelect2Component;
  let fixture: ComponentFixture<TagsSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsSelect2Component ],
      imports: [
        HttpClientTestingModule,
        NotifierModule
      ],
      providers : [
        NotifierService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
