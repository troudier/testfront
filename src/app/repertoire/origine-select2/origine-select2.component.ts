import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {PersonneService} from '../../_services/personne.service';

@Component({
    selector: 'app-origine-select2',
    templateUrl: './origine-select2.component.html',
    styleUrls: ['./origine-select2.component.scss']
})
export class OrigineSelect2Component implements OnInit {
    public data: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });
    @Input() form;
    @Input() id;
    @Input() multiple;
    public options: Options;
    @Input() value;
    @Input() disabled;
    @Output() changed = new EventEmitter<string>();

    constructor(private personneService: PersonneService) {
    }

    ngOnInit(): void {

        this.options = {
            multiple: this.multiple
        };
        this.data = new Observable(observer => {
            observer.next([]);
            observer.complete();
        });
        this.initSelect();

    }

    private initSelect(): void {
        this.personneService.getListeOrigines().subscribe(
            data => {
                const referents = [];
                data.map((item) => {
                        referents.push({
                            id: item.uuid,
                            text: item.libelle
                        });
                    }
                );
                this.data = new Observable(observer => {
                    observer.next(referents);
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
