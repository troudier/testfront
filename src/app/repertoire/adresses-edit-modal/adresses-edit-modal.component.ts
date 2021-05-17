import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Options} from 'ts-node';
import {Observable} from 'rxjs';
import {Select2OptionData} from 'ng-select2';
import {PersonneService} from '../../_services/personne.service';
import {ModalService} from '../../_modal';

@Component({
    selector: 'app-adresses-edit-modal',
    templateUrl: './adresses-edit-modal.component.html',
    styleUrls: ['./adresses-edit-modal.component.scss']
})
export class AdressesEditModalComponent implements OnInit {
    @Input() data;
    @Input() edit;
    @Input() idModal;
    @Output() added = new EventEmitter<any>();
    @Output() closed = new EventEmitter<any>();
    public options: Options;
    public allTypes;
    public tmpType;
    @ViewChild('principal') principal: ElementRef;
    @ViewChild('type') type: ElementRef;
    @ViewChild('ligne1') ligne1: ElementRef;
    @ViewChild('ligne2') ligne2: ElementRef;
    @ViewChild('ligne3') ligne3: ElementRef;
    @ViewChild('cp') cp: ElementRef;
    @ViewChild('ville') ville: ElementRef;
    @ViewChild('cedexCode') cedexCode: ElementRef;
    @ViewChild('cedexLibelle') cedexLibelle: ElementRef;

    @ViewChild('pays') pays: ElementRef;
    public types: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });

    constructor(
        private personneService: PersonneService,
        private modalService: ModalService
    ) {
    }

    ngOnInit(): void {
        this.tmpType = {type_id: '', type: ''};
        this.options = {};
        this.personneService.getAdressesTypes().subscribe(
            data => {
                this.allTypes = data;
                const typesResult = [];
                data.adresses.map((item) => {
                        typesResult.push({
                            id: item.id,
                            text: item.text
                        });
                    }
                );
                this.types = new Observable(observer => {
                    observer.next(typesResult);
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

    onSubmitModal(): void {
        this.data.principal = this.principal.nativeElement.checked;

        if (this.ligne1) {
            this.data.ligne1 = this.ligne1.nativeElement.value;
        }
        if (this.ligne2) {
            this.data.ligne2 = this.ligne2.nativeElement.value;
        }
        if (this.ligne3) {
            this.data.ligne3 = this.ligne3.nativeElement.value;
        }
        if (this.cp) {
            this.data.cp = this.cp.nativeElement.value;
        }
        if (this.ville) {
            this.data.ville = this.ville.nativeElement.value;
        }
        if (this.cedexCode) {
            this.data.cedexCode = this.cedexCode.nativeElement.value;
        }
        if (this.cedexLibelle) {
            this.data.cedexLibelle = this.cedexLibelle.nativeElement.value;
        }
        if (this.pays) {
            this.data.pays = this.pays.nativeElement.value;
        }
        this.allTypes['adresses'].map((item) => {
            if (item.id == this.tmpType.type_id) {
                this.tmpType.type = item.text;
            }
        });
        this.data.type_id = this.tmpType.type_id;
        this.data.type = this.tmpType.type;
        if (this.edit) {
            this.added.emit({
                type: 'adresses',
                data: this.data
            });
        }
        this.modalService.close(this.idModal);
    }

    typeChange($event): void {
        this.tmpType.type_id = $event;

    }
}
