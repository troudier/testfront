import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-volet-parametre',
    templateUrl: './volet-parametre.component.html',
    styleUrls: ['./volet-parametre.component.scss']
})
export class VoletParametreComponent implements OnInit {
    @Input() personneConnecte: any;
    @Input() position: any;

    constructor() {
    }

    ngOnInit(): void {
    }
}
