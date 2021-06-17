import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EvenementComponent} from './evenement.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NotifierModule} from 'angular-notifier';

describe('EvenementComponent', () => {
    let component: EvenementComponent;
    let fixture: ComponentFixture<EvenementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [EvenementComponent],
                imports: [
                    HttpClientTestingModule,
                    RouterTestingModule,
                    NotifierModule
                ]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EvenementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
