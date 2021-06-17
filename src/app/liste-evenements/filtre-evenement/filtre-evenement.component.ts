import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Options} from 'ts-node';
import {Select2OptionData} from 'ng-select2';

@Component({
    selector: 'app-filtre-evenement',
    templateUrl: './filtre-evenement.component.html',
    styleUrls: ['./filtre-evenement.component.scss']
})
export class FiltreEvenementComponent implements OnInit {
    public data: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });
    public options: Options;
    @Output() changed = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
        this.data = new Observable(observer => {
            observer.next([]);
            observer.complete();
        });
        this.initSelect();
    }

    private initSelect(): void {
    }

    public valueChanged(): void {
        this.changed.emit();
    }

}
