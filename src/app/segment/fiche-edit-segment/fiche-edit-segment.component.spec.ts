import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FicheEditSegmentComponent} from './fiche-edit-segment.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NotifierService, NotifierModule } from 'angular-notifier';
import {NotifierQueueService} from 'angular-notifier/lib/services/notifier-queue.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('FicheEditSegmentComponent', () => {
    let component: FicheEditSegmentComponent;
    let fixture: ComponentFixture<FicheEditSegmentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FicheEditSegmentComponent],
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                RouterTestingModule,
                FormsModule,
                NotifierModule
            ],
            providers:
                [
                    {
                        provide: NotifierService,
                        notifierQueueService: {},
                        config: {}
                    },
                    {
                        provide: ActivatedRoute,
                        useValue: {
                            snapshot: {params: {}}
                        }
                    }
                ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FicheEditSegmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
