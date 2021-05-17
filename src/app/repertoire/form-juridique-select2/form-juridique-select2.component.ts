import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {PersonneService} from '../../_services/personne.service';

@Component({
    selector: 'app-form-juridique-select2',
    templateUrl: './form-juridique-select2.component.html',
    styleUrls: ['./form-juridique-select2.component.scss']
})
export class FormJuridiqueSelect2Component implements OnInit {
    @Input() form;
    @Input() id;
    @Input() multiple;
    public data: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });
    public options: Options;
    @Input() value;
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
        this.personneService.getListeFormeJuridique().subscribe(
            data => {
                const formJuridique = [];
                data.map((item) => {
                        formJuridique.push({
                            id: item.uuid,
                            text: item.fjlib
                        });
                    }
                );
                this.data = new Observable(observer => {
                    observer.next(formJuridique);
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
