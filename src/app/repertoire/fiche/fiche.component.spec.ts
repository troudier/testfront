import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {FicheComponent} from './fiche.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {NotifierModule} from 'angular-notifier';

describe('FicheComponent', () => {
    let component: FicheComponent;
    let fixture: ComponentFixture<FicheComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FicheComponent],
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
        fixture = TestBed.createComponent(FicheComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
