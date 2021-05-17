import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {PersonneService} from '../../_services/personne.service';

@Component({
    selector: 'app-fonction-personne-select2',
    templateUrl: './fonction-personne-select2.component.html',
    styleUrls: ['./fonction-personne-select2.component.scss']
})
export class FonctionPersonneSelect2Component implements OnInit {
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
    public fonctionListe;

    constructor(private personneService: PersonneService) {
    }

    ngOnInit(): void {

        this.options = {
            multiple: this.multiple
        };
        this.initSelect();
    }

    private initSelect(): void {
        this.personneService.getPersonnesFonctions().subscribe(data => {
                const fonctions = [];
                data.map((item) => {
                        fonctions.push({
                            id: item.uuid,
                            text: item.libelle
                        });
                    }
                );
                this.fonctionListe = fonctions;
                this.data = new Observable(observer => {
                    observer.next(fonctions);
                    observer.complete();
                });
            },
            err => {
            }
        );
    }

    public valueChanged($event, id): void {
        this.changed.emit($event);
    }
}
