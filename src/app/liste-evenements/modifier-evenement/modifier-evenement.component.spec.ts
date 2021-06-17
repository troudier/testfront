import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ModifierEvenementComponent} from './modifier-evenement.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotifierModule} from 'angular-notifier';

describe('ModifierEvenementComponent', () => {
    let component: ModifierEvenementComponent;
    let fixture: ComponentFixture<ModifierEvenementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [ModifierEvenementComponent],
                imports: [
                    HttpClientTestingModule,
                    RouterTestingModule,
                    FormsModule,
                    ReactiveFormsModule,
                    NotifierModule
                ],
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModifierEvenementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
