import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {PersonneService} from '../../_services/personne.service';

@Component({
    selector: 'app-personnnes-physique-select2',
    templateUrl: './personnnes-physique-select2.component.html',
    styleUrls: ['./personnnes-physique-select2.component.scss']
})
export class PersonnnesPhysiqueSelect2Component implements OnInit {
    public data: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });
    @Input() form;
    @Input() id;
    @Input() multiple;
    @Output() changed = new EventEmitter<string>();
    public options: Options;
    @Input() value;
    @Input() disabled;

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

        this.personneService.getListePersonnesPhysiques().subscribe(
            data => {
                const referents = [];
                data.map((item) => {
                        referents.push({
                            id: item.uuid,
                            text: item.civilite + ' ' + item.prenom + ' ' + item.nom
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
