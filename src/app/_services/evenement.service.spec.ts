import {TestBed} from '@angular/core/testing';
import {EvenementService} from './evenement.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('EvenementService', () => {
    let service: EvenementService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(EvenementService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
