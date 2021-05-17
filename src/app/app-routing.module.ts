import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LayoutComponent} from './layout/layout.component';
import {RepertoireComponent} from './repertoire/repertoire.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SegmentComponent} from './segment/segment.component';
import {CampagneComponent} from './campagne/campagne.component';
import {OffreComponent} from './offre/offre.component';
import {StatistiqueComponent} from './statistique/statistique.component';
import {AuthGuard} from './auth/auth.guard';
import {FicheComponent} from './repertoire/fiche/fiche.component';
import {ListeCartesComponent} from './repertoire/liste-cartes/liste-cartes.component';
import {CreerPersonneComponent} from './repertoire/creer/creer-personne/creer-personne.component';
import {CreerChoixComponent} from './repertoire/creer/creer-choix/creer-choix.component';
import {ModifierPersonneComponent} from './repertoire/modifier-personne/modifier-personne.component';
import {CreerFonctionComponent} from './repertoire/creer/creer-fonction/creer-fonction.component';
import {ListeCartesSegmentComponent} from './segment/liste-cartes-segment/liste-cartes-segment.component';
import {FicheSegmentComponent} from './segment/fiche-segment/fiche-segment.component';
import {FicheEditSegmentComponent} from './segment/fiche-edit-segment/fiche-edit-segment.component';

const routes: Routes = [
    // Routes avec layout
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home', component: DashboardComponent
            },
            {
                path: 'repertoire',
                component: RepertoireComponent,
                data: {
                    ariane: 'Répertoire'
                },
                children: [
                    {
                        path: '',
                        component: ListeCartesComponent,
                        data: {
                            ariane: ''
                        }
                    },
                    {
                        path: 'creer',
                        component: CreerChoixComponent,
                        data: {
                            ariane: 'Nouvelle Personne'
                        }
                    },
                    {
                        path: 'creer/physique',
                        component: CreerPersonneComponent,
                        data: {
                            ariane: 'Nouvelle Personne Physique',
                            type: 'physique'
                        }
                    },
                    {
                        path: 'creer/morale',
                        component: CreerPersonneComponent,
                        data: {
                            ariane: 'Nouvelle Personne Morale',
                            type: 'morale'
                        }
                    },
                    {
                        path: 'creer/fonction/physique/:id',
                        component: CreerFonctionComponent,
                        data: {
                            ariane: 'Nouvelle Fonction',
                            type: 'physique'
                        }
                    },
                    {
                        path: 'creer/fonction/morale/:id',
                        component: CreerFonctionComponent,
                        data: {
                            ariane: 'Nouvelle Fonction',
                            type: 'morale'
                        }
                    },
                    {
                        path: 'modifier/:id',
                        component: ModifierPersonneComponent,
                        data: {
                            ariane: 'Modifier'
                        }
                    },
                    {
                        path: ':id',
                        component: FicheComponent,
                        data: {
                            ariane: ''
                        }
                    },
                ]
            },
            {
                path: 'segment', component: SegmentComponent,
                children: [
                    {
                        path: '',
                        component: ListeCartesSegmentComponent,
                        data: {
                            ariane: ''
                        }
                    },
                    {
                        path: ':id',
                        component: FicheSegmentComponent,
                        data: {
                            ariane: ''
                        }
                    },
                    {
                        path: 'modifier/:id',
                        component: FicheEditSegmentComponent,
                        data: {
                            ariane: 'Modifier'
                        }
                    }
                ]
            },
            {path: 'campagne', component: CampagneComponent},
            {path: 'offre', component: OffreComponent},
            {path: 'statistique', component: StatistiqueComponent},
        ]
    },
    // Routes sans layout
    {path: 'login', component: LoginComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
