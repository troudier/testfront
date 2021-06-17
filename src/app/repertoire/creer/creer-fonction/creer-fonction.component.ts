import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Options} from 'select2';
import {Observable} from 'rxjs';
import {Select2OptionData} from 'ng-select2';
import {PersonneService} from '../../../_services/personne.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ExceptionService} from '../../../_services/exception.service';

@Component({
    selector: 'app-creer-fonction',
    templateUrl: './creer-fonction.component.html',
    styleUrls: ['./creer-fonction.component.scss']
})
export class CreerFonctionComponent implements OnInit {

    public uuid = this.route.snapshot.params.id;
    public type = this.route.snapshot.data ? this.route.snapshot.data.type : null;
    public libelle = window.sessionStorage.getItem(this.uuid);
    public optionsPhysique: Options;
    public optionsMorale: Options;
    public optionsFonctions: Options;
    public disabledPhysique;
    public dataPhysique: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });
    public dataMorale: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });
    public valuePhysique;
    public valueMorale;
    public form: FormGroup;
    public message;

    constructor(
        private personneService: PersonneService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private notifier: NotifierService,
        private router: Router,
        private ngxService: NgxUiLoaderService,
        private exceptionService: ExceptionService
    ) {
    }

    ngOnInit(): void {
        const valeur = {
            id: this.uuid,
            text: this.libelle
        };
        if (this.type === 'physique') {
            this.form = this.formBuilder.group({
                morale: ['', Validators.required],
                physique: {value: this.uuid, disabled: true},
                fonction: ['', Validators.required]
            }, {});
            this.disabledPhysique = true;
            this.optionsMorale = {
                multiple: false
            };
            this.optionsPhysique = {
                multiple: false,
                disabled: true
            };
            this.valuePhysique = this.uuid;
            this.dataPhysique = new Observable(observer => {
                observer.next([valeur]);
                observer.complete();
            });
            this.personneService.getPersonnesSelect('morale').subscribe(
                data => {
                    const morales = [];
                    data.map((item) => {
                            morales.push({
                                id: item.uuid,
                                text: item.libelle
                            });
                        }
                    );
                    this.dataMorale = new Observable(observer => {
                        observer.next(morales);
                        observer.complete();
                    });
                },
                err => {
                    this.showNotification('error', this.exceptionService.statutErreur(err));
                }
            );
        } else {
            this.form = this.formBuilder.group({
                morale: {value: this.uuid, disabled: true},
                physique: ['', Validators.required],
                fonction: ['', Validators.required]
            }, {});
            this.disabledPhysique = false;
            this.optionsPhysique = {
                multiple: false
            };
            this.optionsMorale = {
                multiple: false,
                disabled: true
            };
            this.valueMorale = this.uuid;
            this.dataMorale = new Observable(observer => {
                observer.next([valeur]);
                observer.complete();
            });
        }
        this.optionsFonctions = {
            multiple: false
        };
    }

    public onSubmit(): void {
        this.ngxService.start();
        const formData = {
            physique: this.form.controls.physique.value,
            morale: this.form.controls.morale.value,
            fonction: this.form.controls.fonction.value
        };
        if (this.form.valid) {
            this.personneService.createPersonneFonction(formData).subscribe(
                data => {
                    this.ngxService.stop();
                    this.router.navigate(['/repertoire/modifier/' + data.content.uuid]);
                },
                err => {
                    this.ngxService.stop();
                    this.showNotification('error', this.exceptionService.statutErreur(err));
                }
            );
        } else {
            this.showNotification('error', 'Veuillez remplir les champs requis avant de soumettre le formulaire s\'il vous plait');
        }

    }

    public showNotification(type: string, message: string): void {
        setTimeout(() => {
            this.notifier.notify(type, message);
        }, 1000);
    }

    public onCancel(): void {
        this.router.navigate(['/repertoire/' + this.uuid]);
    }

    onChangedSelect2($event, id): void {
        this.form.controls[id].setValue($event);
    }

    public valueChanged($event, id): void {
    }
}
