import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Options} from 'select2';
import {Observable} from 'rxjs';
import {Select2OptionData} from 'ng-select2';
import {PersonneService} from '../../../_services/personne.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';

@Component({
    selector: 'app-creer-fonction',
    templateUrl: './creer-fonction.component.html',
    styleUrls: ['./creer-fonction.component.scss']
})
export class CreerFonctionComponent implements OnInit {

    public uuid = this.route.snapshot.params.id;
    public type = this.route.snapshot.data.type;
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
    public fonctionLibelle;

    constructor(
        private personneService: PersonneService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private notifier: NotifierService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            physique: ['', Validators.required],
            morale: ['', Validators.required],
            fonction: ['', Validators.required]
        }, {});
        const valeur = {
            id: this.uuid,
            text: this.libelle
        };
        if (this.type === 'physique') {
            this.form.controls.physique.setValue(this.uuid);
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
                }
            );
        } else {
            this.form.controls.morale.setValue(this.uuid);
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
        const formData = {
            physique: this.form.controls.physique.value,
            morale: this.form.controls.morale.value,
            fonction: this.form.controls.fonction.value
        };
        if (this.form.valid) {
            this.personneService.createPersonneFonction(formData).subscribe(
                data => {
                    this.showNotification('success', 'La fonction ' + this.fonctionLibelle + ' a bien été mise à jour');
                    this.router.navigate(['/repertoire/modifier/' + data.content.uuid]);
                },
                err => {
                    console.log(err);
                    this.message = err.error;
                    this.showNotification('error', this.message);
                }
            );
        } else {
            this.verificationChamps();
        }

    }

    public showNotification(type: string, message: string): void {
        this.notifier.notify(type, message);
    }

    public onCancel(): void {
        this.router.navigate(['/repertoire/' + this.uuid]);
    }

    onChangedSelect2($event, id): void {
        this.form.controls[id].setValue($event);
    }

    public valueChanged($event, id): void {
    }

    public verificationChamps(): void {
        if (!this.form.valid) {
            console.log(this.form);
            this.showNotification('error', 'Veuillez remplir les champs requis avant de soumettre le formulaire s\'il vous plait');
        }
    }

}
