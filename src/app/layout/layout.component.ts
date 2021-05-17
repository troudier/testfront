import {Component, Input, OnInit} from '@angular/core';
import {PersonneService} from '../_services/personne.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    private errorMessage = '';
    public personne;
    public position = false;

    constructor(
        private tokenStorageService: TokenStorageService,
        private personneService: PersonneService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.getDonnesUtilisateurConnecte();
    }

    getDonnesUtilisateurConnecte(): void {
        this.personneService.getPersonneCourante().subscribe(
            data => {
                this.personne = data;
            },
            err => {
                console.log(err);
                this.errorMessage = err.error;
            }
        );
    }

    logout(): void {
        this.tokenStorageService.signOut();
        this.router.navigate(['/login']);
    }

    // permet de fermet volet sur un click hors menu
    closeVolet(): void {
        const voletParametre = document.getElementById('voletParametre');
        if (voletParametre.classList.contains('ouvert')) {
            voletParametre.classList.remove('ouvert');
        }
    }
}
