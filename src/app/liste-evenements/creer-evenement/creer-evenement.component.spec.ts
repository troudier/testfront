import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NotifierModule} from 'angular-notifier';
import {CreerEvenementComponent} from './creer-evenement.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('CreerEvenementComponent', () => {
    let component: CreerEvenementComponent;
    let fixture: ComponentFixture<CreerEvenementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [CreerEvenementComponent],
                imports: [
                    HttpClientTestingModule,
                    RouterTestingModule,
                    NotifierModule,
                    FormsModule,
                    ReactiveFormsModule
                ],
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreerEvenementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
