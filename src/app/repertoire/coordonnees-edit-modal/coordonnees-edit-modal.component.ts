import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PersonneService} from '../../_services/personne.service';
import {Options} from 'ts-node';
import {Observable} from 'rxjs';
import {Select2OptionData} from 'ng-select2';
import {ModalService} from '../../_modal';
import {ElementRef} from '@angular/core';

@Component({
    selector: 'app-coordonnees-edit-modal',
    templateUrl: './coordonnees-edit-modal.component.html',
    styleUrls: ['./coordonnees-edit-modal.component.scss']
})
export class CoordonneesEditModalComponent implements OnInit {
    @Input() data;
    @Input() type;
    @Input() edit;
    @Input() idModal;
    @Output() added = new EventEmitter<any>();
    @Output() closed = new EventEmitter<any>();

    public options: Options;
    public allTypes;
    public indicatifs;
    public tmpIndicatif;
    public tmpType;
    @ViewChild('principal') principal: ElementRef;
    @ViewChild('typeTel') typeTel: ElementRef;
    @ViewChild('typeEmail') typeEmail: ElementRef;
    @ViewChild('typeSite') typeSite: ElementRef;
    @ViewChild('valeurIndicatif') valeurIndicatif: ElementRef;
    @ViewChild('valeurTel') valeurTel: ElementRef;
    @ViewChild('valeurSite') valeurSite: ElementRef;
    @ViewChild('valeurEmail') valeurEmail: ElementRef;

    public typesSites: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });
    public typesEmails: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });
    public typesTelephones: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });
    public indicatifData: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });
    public indicatifFrance;

    constructor(
        private personneService: PersonneService,
        private modalService: ModalService
    ) {
    }

    ngOnInit(): void {
        this.tmpIndicatif = {uuid: '', valeur: ''};
        this.tmpType = {type_id: '', type: ''};
        this.personneService.getListeIndicatifs().subscribe(
            data => {
                this.indicatifs = [];
                data.map((item) => this.indicatifs.push(
                    {
                        id: item.uuid,
                        text: item.indicatif + ' (' + item.pays + ')',
                        value: item.indicatif
                    }
                ));
                this.indicatifFrance = this.indicatifs[2].id;
                this.indicatifData = new Observable(observer => {
                    observer.next(this.indicatifs);
                    observer.complete();
                });
            },
            err => {
                console.log(err);
            }
        );
        this.options = {};
        this.personneService.getCoordonneesTypes().subscribe(
            data => {
                this.allTypes = data;
                const typesResultEmail = [];
                const typesResultSite = [];
                const typesResultTel = [];

                data.emails.map((item) => {
                        typesResultEmail.push({
                            id: item.id,
                            text: item.text
                        });
                    }
                );
                data.sites.map((item) => {
                        typesResultSite.push({
                            id: item.id,
                            text: item.text
                        });
                    }
                );
                data.telephones.map((item) => {
                        typesResultTel.push({
                            id: item.id,
                            text: item.text
                        });
                    }
                );
                this.typesEmails = new Observable(observer => {
                    observer.next(typesResultEmail);
                    observer.complete();
                });
                this.typesSites = new Observable(observer => {
                    observer.next(typesResultSite);
                    observer.complete();
                });
                this.typesTelephones = new Observable(observer => {
                    observer.next(typesResultTel);
                    observer.complete();
                });
            },
            err => {
                console.log(err);
            }
        );
    }

    closeModal(): void {
        this.closed.emit(true);
        this.modalService.close(this.idModal);
    }

    onSubmitModal(type): void {
        this.data.principal = this.principal.nativeElement.checked;
        if (this.valeurIndicatif) {
            if (this.tmpIndicatif.uuid.length > 0) {
                this.data.indicatif = this.tmpIndicatif;
            }
        }
        if (this.valeurTel) {
            this.data.valeur = this.valeurTel.nativeElement.value;
        }
        if (this.valeurEmail) {
            this.data.valeur = this.valeurEmail.nativeElement.value;
        }
        if (this.valeurSite) {
            this.data.valeur = this.valeurSite.nativeElement.value;
        }
        if (type === 'email') {
            this.allTypes['emails'].map((item) => {
                if (item.id == this.tmpType.type_id) {
                    this.tmpType.type = item.text;
                }
            });
        } else if (type === 'site') {
            this.allTypes['sites'].map((item) => {
                if (item.id == this.tmpType.type_id) {
                    this.tmpType.type = item.text;
                }
            });
        } else {
            this.allTypes['telephones'].map((item) => {
                if (item.id == this.tmpType.type_id) {
                    this.tmpType.type = item.text;
                }
            });
        }
        let realType = '';
        if (type === 'email') {
            realType = 'emails';
        } else if (type === 'site') {
            realType = 'sites';
        } else if (type === 'telephone') {
            realType = 'telephones';
        } else if (type === 'fax') {
            realType = 'faxes';
        }
        this.data.type_id = this.tmpType.type_id;
        this.data.type = this.tmpType.type;

        if (this.edit) {
            this.added.emit({
                type: realType,
                data: this.data
            });
        }
        this.modalService.close(this.idModal);
    }

    indicatifChange($event): void {
        this.tmpIndicatif.uuid = $event;
        this.indicatifs.map((item) => {
            if (item.id == this.tmpIndicatif.uuid) {
                this.tmpIndicatif.valeur = item.value;
            }
        });
    }

    typeChange($event): void {
        this.tmpType.type_id = $event;
    }
}
