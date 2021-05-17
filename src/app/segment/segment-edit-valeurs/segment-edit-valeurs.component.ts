import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Options} from 'select2';
import {HelperService} from '../../_services/helper.service';
import {Observable} from 'rxjs';
import {Select2OptionData} from 'ng-select2';
import {$e} from 'codelyzer/angular/styles/chars';
import {isNumeric} from 'rxjs/internal-compatibility';

@Component({
    selector: 'app-segment-edit-valeurs',
    templateUrl: './segment-edit-valeurs.component.html',
    styleUrls: ['./segment-edit-valeurs.component.scss']
})
export class SegmentEditValeursComponent implements OnInit {

    @Input() valeurs;
    @Input() nbValeurs;
    @Input() form;
    @Input() filtre;
    @Output() recalculer = new EventEmitter<string>();
    public data;
    public value = [];
    public options: Options;
    public intevalle = [null, null];
    public dataAsync: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });

    constructor(
        private helperService: HelperService
    ) {
    }

    ngOnInit(): void {

        this.dataAsync = new Observable(observer => {
            observer.next([]);
            observer.complete();
        });

        if (this.filtre.value.champ.type === 'select2') {

            this.helperService.getDictionnaire(this.filtre.value.champ.libelle).subscribe(
                data => {
                    const tmp = [];
                    data.map((item) => {
                        tmp.push({
                            id: item.uuid,
                            text: item.libelle
                        });
                    });
                    this.data = tmp;

                    this.dataAsync = new Observable(observer => {
                        observer.next(tmp);
                        observer.complete();
                    });
                    if (this.valeurs.length) {
                        const tmpArray = this.valeurs[0];
                        this.valeurs[0].map((item, index) => {
                            this.data.map((obj) => {
                                if (obj.text === item || obj.id === item) {
                                    this.value.push(obj.id);
                                }
                            });
                        });
                        Object.keys(this.form.controls.filtres.value).map((key) => {
                            if(this.filtre.value.uuid === this.form.controls.filtres.value[key].uuid){
                                this.form.controls.filtres.value[key].valeurs[0] = this.value;
                            }
                        });
                        this.form.controls[this.filtre.value.uuid].setValue(this.value);
                    }
                },
                err => {
                }
            );
            this.options = {
                multiple: true,
            };
        } else {
            this.data =  [];
            this.options = {
                multiple: true,
                tags: true
            };
        }
        this.valeurs.map((item) => {
            if (typeof item[0] === 'string') {
                if (this.filtre.value.operateur.nbValeurs === 0) {
                    this.value = item;
                } else {
                    const tmp = [];
                    item.map((value, index) => {
                        tmp.push({
                            id: index,
                            text: value
                        });
                        if (this.filtre.value.champ.type !== 'select2') {
                            this.value.push(String(index));
                        }
                    });
                    if (this.filtre.value.champ.type !== 'select2') {
                        this.data = tmp;
                        this.dataAsync = new Observable(observer => {
                            observer.next(tmp);
                            observer.complete();
                        });
                    }
                }
            } else {
                this.intevalle = item[0];
            }
        });
    }

    onChangedSelect2($event, id, type): void {
        if ($event !== this.value) {
            this.recalculer.emit();

        }

        Object.keys(this.form.controls.filtres.value).map((key) => {
            if (this.form.controls.filtres.value[key].uuid === id) {
                if ($event.length > 0) {
                    this.form.controls.filtres.value[key][type] = null;
                    this.form.controls.filtres.value[key][type] = [];
                    this.form.controls.filtres.value[key][type][0] = [];
                    if (this.data.length > 0) {
                        $event.map((val, index) => {
                            let found = false;

                            this.data.map((item) => {
                                if (item.id == val || item.text == val) {
                                    if (this.form.controls.filtres.value[key].champ.type !== 'select2') {
                                        this.form.controls.filtres.value[key][type][0].push(item.text);
                                        found = true;
                                    } else {
                                        this.form.controls.filtres.value[key][type][0].push(item.id);
                                        found = true;
                                    }
                                } else {
                                    if (this.form.controls.filtres.value[key].champ.type !== 'select2' && !found && !isNumeric(val)) {
                                        this.form.controls.filtres.value[key][type][0].push(val);
                                        found = true;
                                    }
                                }
                            });
                            delete $event[index];
                        });
                    } else {
                        $event.map((val) => {
                            this.form.controls.filtres.value[key][type][0].push(val);
                        });
                    }
                }
            }
        });
    }

    onChangeIntervalle($event, uuid, type, index): void {

        this.recalculer.emit();
        let k = '0';
        Object.keys(this.form.controls.filtres.value).map((key) => {
            if (this.form.controls.filtres.value[key].uuid === uuid) {
                k = key;
                if (!this.form.controls.filtres.value[key][type][0]) {
                    this.form.controls.filtres.value[key][type][0] = [];
                    this.form.controls.filtres.value[key][type][0][0] = [];
                }
                this.form.controls.filtres.value[key][type][0][0][index] = $event.target.value;
            }
        });
    }

    onChangeUnique($event, uuid, type): void {

        this.recalculer.emit();
        let k = '0';
        Object.keys(this.form.controls.filtres.value).map((key) => {
            if (this.form.controls.filtres.value[key].uuid === uuid) {
                k = key;
                if (!this.form.controls.filtres.value[key][type][0]) {
                    this.form.controls.filtres.value[key][type][0] = [];
                    this.form.controls.filtres.value[key][type][0][0] = [];
                }
                this.form.controls.filtres.value[key][type][0][0] = $event.target.value;
            }
        });
    }

}
