import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Select2OptionData} from 'ng-select2';
import {Options} from 'select2';
import {PersonneService} from '../../_services/personne.service';

@Component({
    selector: 'app-effectif-select2',
    templateUrl: './effectif-select2.component.html',
    styleUrls: ['./effectif-select2.component.scss']
})
export class EffectifSelect2Component implements OnInit {
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
        this.personneService.getListeEffectif().subscribe(
            data => {
                const effectif = [];
                data.map((item) => {
                        effectif.push({
                            id: item.eff_uuid,
                            text: item.eff_lib
                        });
                    }
                );
                this.data = new Observable(observer => {
                    observer.next(effectif);
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
