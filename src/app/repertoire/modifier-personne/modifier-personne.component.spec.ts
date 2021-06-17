import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifierPersonneComponent} from './modifier-personne.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotifierService, NotifierModule} from 'angular-notifier';

describe('ModifierPersonneComponent', () => {
    let component: ModifierPersonneComponent;
    let fixture: ComponentFixture<ModifierPersonneComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [ModifierPersonneComponent],
                imports: [
                    HttpClientTestingModule,
                    RouterTestingModule,
                    ReactiveFormsModule,
                    FormsModule,
                    NotifierModule
                ],
                providers: [
                    NotifierService
                ]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModifierPersonneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
