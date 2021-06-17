import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {EvenementService} from '../../_services/evenement.service';

@Component({
    selector: 'app-filtre-type-select2',
    templateUrl: './filtre-type-select2.component.html',
    styleUrls: ['./filtre-type-select2.component.scss']
})
export class FiltreTypeSelect2Component implements OnInit {
    @Input() form;
    @Input() id;
    @Input() multiple;
    public data: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });
    public options: Options;
    @Input() value;
    @Input() disabled;
    @Output() changed = new EventEmitter<string>();

    constructor(private evenementService: EvenementService) {
    }

    ngOnInit(): void {
        this.options = {
            multiple: this.multiple
        };
        this.initSelect();
    }

    private initSelect(): void {
        this.evenementService.getListeTypeEvent().subscribe(
            data => {
                const statut = [];
                Object.keys(data).map((key) => {
                    statut.push({
                        id: key,
                        text: data[key]
                    });
                });
                this.data = new Observable(observer => {
                    observer.next(statut);
                    observer.complete();
                });
            },
            err => {
            }
        );
    }

    public valueChanged($event): void {
        this.changed.emit($event);
    }

}
