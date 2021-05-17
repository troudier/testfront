import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {SegmentService} from '../../_services/segment.service';

@Component({
    selector: 'app-champs-requetables-select2',
    templateUrl: './champs-requetables-select2.component.html',
    styleUrls: ['./champs-requetables-select2.component.scss']
})
export class ChampsRequetablesSelect2Component implements OnInit {

    @Input() form;
    @Input() id;
    @Input() multiple;
    public data: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });
    public options: Options;
    public operateurs;
    @Input() value;
    @Input() disabled;
    @Output() changed = new EventEmitter<any>();

    constructor(private segmentService: SegmentService) {
    }

    ngOnInit(): void {
        this.options = {
            multiple: this.multiple
        };
        this.initSelect();
    }

    private initSelect(): void {
        this.segmentService.getChamps().subscribe(
            data => {
                const statut = [];
                data.map((item) => {
                        statut.push({
                            id: item.uuid,
                            text: item.text
                        });
                    }
                );
                this.operateurs = data;
                this.data = new Observable(observer => {
                    observer.next(statut);
                    observer.complete();
                });
            },
            err => {
            }
        );
    }

    public valueChanged($event): void {
        this.operateurs.map((item) => {
            if(item.uuid === $event){
                this.changed.emit({uuid: $event, type: item.type, libelle: item.text});

            }
        });
    }

}
