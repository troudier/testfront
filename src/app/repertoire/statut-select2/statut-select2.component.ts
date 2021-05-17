import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {PersonneService} from '../../_services/personne.service';

@Component({
    selector: 'app-statut-select2',
    templateUrl: './statut-select2.component.html',
    styleUrls: ['./statut-select2.component.scss']
})
export class StatutSelect2Component implements OnInit {
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

    constructor(private personneService: PersonneService) {
    }

    ngOnInit(): void {
        this.options = {
            multiple: this.multiple
        };
        this.initSelect();
    }

    private initSelect(): void {
        this.personneService.getListeStatuts().subscribe(
            data => {
                const statut = [];
                data.map((item) => {
                        statut.push({
                            id: item.libelle,
                            text: item.texte
                        });
                    }
                );
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
