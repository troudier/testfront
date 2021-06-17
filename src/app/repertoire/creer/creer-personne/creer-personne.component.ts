import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Select2OptionData} from 'ng-select2';
import {PersonneService} from '../../../_services/personne.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ExceptionService} from '../../../_services/exception.service';

@Component({
    selector: 'app-creer-personne',
    templateUrl: './creer-personne.component.html',
    styleUrls: ['./creer-personne.component.scss']
})
export class CreerPersonneComponent implements OnInit, AfterViewChecked {
    public form: FormGroup;
    public indicatifData: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });
    public indicatifOptions;
    public champs;
    public message;
    public indicatifFrance;
    public typePersonne;
    private notifier: NotifierService;
    public uuidFormData;

    constructor(
        private personneService: PersonneService,
        private ref: ChangeDetectorRef,
        private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private ngxService: NgxUiLoaderService,
        private exceptionService: ExceptionService,
        notifier: NotifierService
    ) {
        this.notifier = notifier;
    }

    ngOnInit(): void {
        this.typePersonne = this.route.snapshot.data ? this.route.snapshot.data.type : null;
        if (this.typePersonne === 'physique') {
            this.form = this.formBuilder.group({
                statut: ['', Validators.required],
                civilite: ['', Validators.required],
                prenom: ['', Validators.required],
                nom: ['', Validators.required],
                visibilite: ['', Validators.required],
                raisonSociale: [''],
                formeJuridique: [''],
                email: [''],
                indicatifTel: [''],
                telephone: [''],
                actif: [''],
                referent: [''],
                intervenants: [''],
                memo: ['']
            }, {});
        }
        if (this.typePersonne === 'morale') {
            this.form = this.formBuilder.group({
                statut: ['', Validators.required],
                visibilite: ['', Validators.required],
                raisonSociale: ['', Validators.required],
                formeJuridique: ['', Validators.required],
                civilite: [''],
                prenom: [''],
                nom: [''],
                email: [''],
                indicatifTel: [''],
                telephone: [''],
                actif: [''],
                referent: [''],
                intervenants: [''],
                memo: ['']
            }, {});
        }
        this.indicatifOptions = {
            multiple: false
        };
        if (this.form) {
            this.form.controls.actif.setValue(true);
        }
        this.personneService.getListeIndicatifs().subscribe(
            data => {
                const indicatifs = [];
                data.map((item) => indicatifs.push(
                    {
                        id: item.uuid,
                        text: item.indicatif + ' (' + item.pays + ')'
                    }
                ));
                this.indicatifFrance = indicatifs[2].id;
                this.indicatifData = new Observable(observer => {
                    observer.next(indicatifs);
                    observer.complete();
                });
            },
            err => {
                this.showNotification('error', this.exceptionService.statutErreur(err));
            }
        );
        if (this.typePersonne === 'physique') {
            this.personneService.getListeChampsCreationPP().subscribe(
                data => {
                    this.champs = data;
                }, err => {
                    this.showNotification('error', this.exceptionService.statutErreur(err));
                }
            );
        } else {
            this.personneService.getListeChampsCreationPM().subscribe(
                data => {
                    this.champs = data;
                }, err => {
                    this.showNotification('error', this.exceptionService.statutErreur(err));
                }
            );
        }
    }

    ngAfterViewChecked(): void {
        this.ref.detectChanges();
    }

    public valueChangedType(event: string): void {
    }

    public onSubmit(): void {
        this.ngxService.start();
        const formData = {
            raisonSociale: this.form.controls.raisonSociale.value,
            formeJuridique: this.form.controls.formeJuridique.value,
            civilite: this.form.controls.civilite.value,
            nom: this.form.controls.nom.value,
            prenom: this.form.controls.prenom.value,
            email: this.form.controls.email.value,
            indicatifTel: this.form.controls.indicatifTel.value,
            telephone: this.form.controls.telephone.value,
            visibilite: this.form.controls.visibilite.value,
            actif: this.form.controls.actif.value,
            referent: this.form.controls.referent.value,
            intervenants: this.form.controls.intervenants.value,
            statut: this.form.controls.statut.value,
            memo: this.form.controls.memo.value,
            type: this.typePersonne
        };
        if (this.form.valid) {
            this.personneService.createPersonne(formData).subscribe(
                data => {
                    this.router.navigate(['/repertoire/modifier/' + data.content.uuid]);
                    this.ngxService.stop();
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

    public onCancel(): void {
        this.router.navigate(['/repertoire/creer']);
    }

    onChangedSelect2($event, id): void {
        this.form.controls[id].setValue($event);
    }

    public showNotification(type: string, message: string): void {
        setTimeout(() => {
            this.notifier.notify(type, message);
        }, 1000);
    }
}
