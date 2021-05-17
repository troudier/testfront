import {AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PersonneService} from '../../_services/personne.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {FilArianeService} from '../../_services/fil-ariane.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-modifier-personne',
    templateUrl: './modifier-personne.component.html',
    styleUrls: ['./modifier-personne.component.scss']
})
export class ModifierPersonneComponent implements OnInit, AfterViewChecked, OnDestroy {
    public form: FormGroup;
    public champs;
    public message;
    public personne;
    private qualite;
    public valeursPersonnalises = [];
    public coordonnees = [];
    public adresses = [];
    private notifier: NotifierService;
    public libelle: string;
    private subscription: Subscription;

    constructor(
        private personneService: PersonneService,
        private ref: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private filArianeService: FilArianeService,
        notifier: NotifierService
    ) {
        this.notifier = notifier;
        this.subscription = this.filArianeService.libelleCourrant.subscribe(libelle => this.libelle = libelle);
        if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
            this.libelle = this.getLibelle(this.router.getCurrentNavigation().extras.state);
            this.filArianeService.changeLibelle(this.libelle);
        }
    }

    ngOnInit(): void {
        this.subscription = this.filArianeService.libelleCourrant.subscribe(libelle => this.libelle = libelle);

        this.personneService.getPersonne(this.route.snapshot.params.id).subscribe(
            data => {
                this.personne = data;
                this.libelle = this.getLibelle(data);
                this.filArianeService.changeLibelle(this.libelle);

                if (this.personne.type === 'physique') {
                    this.personneService.getListeChampsCreationPP().subscribe(
                        dataPhysique => {
                            this.champs = dataPhysique;
                        });
                    this.formPersonnePhysique();
                }
                if (this.personne.type === 'morale') {
                    this.personneService.getListeChampsCreationPM().subscribe(
                        dataMorale => {
                            this.champs = dataMorale;
                        });
                    this.formPersonneMorale();
                }
                if (this.personne.type === 'lien') {
                    this.personneService.getListeChampsCreationPF().subscribe(
                        dataLien => {
                            this.champs = dataLien;
                        });
                    this.formPersonneLien();
                }
                console.log(this.personne)
                this.form.patchValue(data);
            });
    }

    formPersonneMorale(): void {
        this.form = this.formBuilder.group({
            titre: [''],
            visibilite: ['', Validators.required],
            raisonSociale: ['', Validators.required],
            formeJuridique: ['', Validators.required],
            civilite: [''],
            prenom: [''],
            nom: [''],
            actif: [''],
            memos: [''],
            statut: [''],
            apporteur: [''],
            origine: [''],
            uuid: [''],
            tags: [''],
            personnalises: [''],
            coordonnees: [''],
            adresses: [],
            siret: [''],
            codeNaf: [''],
            effectif: [''],
            chiffreAffaire: [''],
            capital: [''],
            organisationParente: [''],
            fonctionPersonnalisee: [''],
            intervenants: [''],
            referent: [],
            fonction: [''],
        }, {});
    }

    formPersonnePhysique(): void {
        this.form = this.formBuilder.group({
            titre: [''],
            visibilite: ['', Validators.required],
            raisonSociale: [''],
            formeJuridique: [''],
            civilite: ['', Validators.required],
            prenom: ['', Validators.required],
            nom: ['', Validators.required],
            actif: [''],
            memos: [''],
            statut: [''],
            apporteur: [''],
            origine: [''],
            uuid: [''],
            tags: [''],
            personnalises: [''],
            coordonnees: [''],
            adresses: [],
            siret: [''],
            codeNaf: [''],
            effectif: [''],
            capital: [''],
            chiffreAffaire: [''],
            organisationParente: [''],
            fonctionPersonnalisee: [''],
            fonction: [''],
            intervenants: [''],
            referent: [],
            infoCommerciale: []
        }, {});
    }

    formPersonneLien(): void {
        this.form = this.formBuilder.group({
            fonction: ['', Validators.required],
            fonctionPersonnalisee: [''],
            visibilite: [''],
            raisonSociale: [''],
            formeJuridique: [''],
            titre: [''],
            civilite: [''],
            prenom: [''],
            nom: [''],
            actif: [''],
            memos: [''],
            statut: [''],
            apporteur: [''],
            origine: [''],
            uuid: [''],
            tags: [''],
            personnalises: [''],
            coordonnees: [''],
            adresses: [],
            capital: [''],
            siret: [''],
            codeNaf: [''],
            effectif: [''],
            chiffreAffaire: [''],
            organisationParente: [''],
            intervenants: [''],
            referent: [],
            infoCommerciale: [],
        }, {});
    }

    public showNotification(type: string, message: string): void {
        this.notifier.notify(type, message);
    }

    onChangeNote($event): void {
        this.qualite = $event;
    }

    ngAfterViewChecked(): void {
        this.ref.detectChanges();
    }

    ngOnDestroy(): void {
        this.filArianeService.changeLibelle('');
        this.subscription.unsubscribe();
    }

    public onSubmit(): void {
        const formData = {
            apporteur: this.form.controls.apporteur.value,
            civilite: this.form.controls.civilite.value,
            nom: this.form.controls.nom.value,
            origine: this.form.controls.origine.value,
            prenom: this.form.controls.prenom.value,
            statut: this.form.controls.statut.value,
            titre: this.form.controls.titre.value,
            qualite: this.qualite ? this.qualite : 0,
            uuid: this.personne.uuid,
            visibilite: this.form.controls.visibilite.value,
            actif: this.form.controls.actif.value,
            referent: this.form.controls.referent.value,
            infoCommerciale: this.form.controls.infoCommerciale.value,
            intervenants: this.form.controls.intervenants.value,
            tags: this.form.controls.tags.value,
            memos: this.form.controls.memos.value,
            personnalises: this.valeursPersonnalises,
            coordonnees: this.coordonnees,
            adresses: this.adresses,
            raisonSociale: this.form.controls.raisonSociale.value,
            formeJuridique: this.form.controls.formeJuridique.value,
            capital: this.form.controls.capital.value,
            siret: this.form.controls.siret.value,
            codeNaf: this.form.controls.codeNaf.value,
            effectif: this.form.controls.effectif.value,
            chiffreAffaire: this.form.controls.chiffreAffaire.value,
            organisationParente: this.form.controls.organisationParente.value,
            fonction: this.form.controls.fonction.value,
            fonctionPersonnalisee: this.form.controls.fonctionPersonnalisee.value,
        };
        if (this.form.valid) {
            this.personneService.updatePersonnePhysique(this.personne.uuid, formData).subscribe(
                data => {
                    if (this.personne.type === 'physique') {
                        this.showNotification('success', 'La personne ' + this.personne.nom + ' a bien été mise à jour');
                    } else {
                        this.showNotification('success', 'La société ' + this.personne.raisonSociale + ' a bien été mise à jour');
                    }
                },
                err => {
                    this.message = err.error;
                    this.showNotification('error', this.message);
                }
            );
        } else {
            this.showNotification('error', 'Veuillez remplir les champs requis');
        }
    }

    public onCancel(): void {
        this.router.navigate(['/repertoire']);
    }

    onChangedSelect2($event, id): void {
        this.form.controls[id].setValue($event);
    }

    onChangePersonnalise($event): void {
        this.valeursPersonnalises = $event;
    }

    onChangeCoordonnees($event): void {
        this.coordonnees = $event;
    }

    onChangeAdresses($event): void {
        this.adresses = $event;
    }

    /* Récupère le libellé, pour construire le fil d'ariane */
    getLibelle(personne): string {
        let libelle = '';
        if (personne.type === 'morale') {
            libelle = personne.raisonSociale + ' (' + personne.formeJuridiqueLibelle + ')';
        } else {
            libelle = personne.prenom + ' ' + personne.nom.toUpperCase();
        }
        return libelle;
    }

    onChangeInfoCommerciale($event): void {
        if ($event.target.checked) {
            this.form.controls.infoCommerciale.setValue('1');
        } else {
            this.form.controls.infoCommerciale.setValue('0');
        }
    }
}
