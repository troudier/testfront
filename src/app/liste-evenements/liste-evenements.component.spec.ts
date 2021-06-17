import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListeEvenementsComponent} from './liste-evenements.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NotifierModule, NotifierService} from 'angular-notifier';

describe('EvenementComponent', () => {
    let component: ListeEvenementsComponent;
    let fixture: ComponentFixture<ListeEvenementsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [ListeEvenementsComponent],
                imports: [
                    HttpClientTestingModule,
                    RouterTestingModule,
                    NotifierModule
                ],
                providers: [NotifierService]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListeEvenementsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
