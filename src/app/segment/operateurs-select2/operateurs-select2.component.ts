import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {SegmentService} from '../../_services/segment.service';

@Component({
    selector: 'app-operateurs-select2',
    templateUrl: './operateurs-select2.component.html',
    styleUrls: ['./operateurs-select2.component.scss']
})
export class OperateursSelect2Component implements OnInit {

    @Input() form;
    @Input() id;
    @Input() multiple;
    public data: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });
    public options: Options;
    public operateursListe;
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
        this.segmentService.getOperateurs().subscribe(
            data => {
                const liste = [];
                this.operateursListe = data;

                data.map((item) => {
                        liste.push({
                            id: item.uuid,
                            text: item.text
                        });
                    }
                );
                this.data = new Observable(observer => {
                    observer.next(liste);
                    observer.complete();
                });
            },
            err => {
            }
        );
    }

    public valueChanged($event): void {
        let nbValeurs = 0;
        this.operateursListe.map((item) => {
            if (item.uuid === $event) {
                nbValeurs = item.nbValeurs;
            }
        });
        this.changed.emit({event: $event, nbValeurs});
    }
}
