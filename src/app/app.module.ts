import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {RepertoireComponent} from './repertoire/repertoire.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {NavigationItemComponent} from './menu/navigation-item/navigation-item.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SegmentComponent} from './segment/segment.component';
import {CampagneComponent} from './campagne/campagne.component';
import {OffreComponent} from './offre/offre.component';
import {StatistiqueComponent} from './statistique/statistique.component';
import {CarteComponent} from './repertoire/carte/carte.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {OutilsComponent} from './repertoire/outils/outils.component';
import {NgSelect2Module} from 'ng-select2';
import {CreerComponent} from './repertoire/creer/creer.component';
import {FicheComponent} from './repertoire/fiche/fiche.component';
import {FilArianeComponent} from './layout/fil-ariane/fil-ariane.component';
import {ListeCartesComponent} from './repertoire/liste-cartes/liste-cartes.component';
import {AvatarComponent} from './repertoire/avatar/avatar.component';
import {FonctionStickerComponent} from './repertoire/fonction-sticker/fonction-sticker.component';
import {OngletComponent} from './repertoire/fiche/onglet/onglet.component';
import {NoteComponent} from './repertoire/note/note.component';
import {CreerPersonneComponent} from './repertoire/creer/creer-personne/creer-personne.component';
import {CreerChoixComponent} from './repertoire/creer/creer-choix/creer-choix.component';
import {BlocVisibiliteComponent} from './bloc-visibilite/bloc-visibilite.component';
import {ModifierPersonneComponent} from './repertoire/modifier-personne/modifier-personne.component';
import {TagsSelect2Component} from './repertoire/tags-select2/tags-select2.component';
import {UsersSelect2Component} from './repertoire/users-select2/users-select2.component';
import {OrigineSelect2Component} from './repertoire/origine-select2/origine-select2.component';
import {PersonnnesPhysiqueSelect2Component} from './repertoire/personnnes-physique-select2/personnnes-physique-select2.component';
import {StatutSelect2Component} from './repertoire/statut-select2/statut-select2.component';
import {TitreAutocompleteComponent} from './repertoire/titre-autocomplete/titre-autocomplete.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {MemosComponent} from './repertoire/memos/memos.component';
import {NotifierModule, NotifierOptions, NotifierService} from 'angular-notifier';
import {ChampsPersonalisesComponent} from './champs-personalises/champs-personalises.component';
import {CoordonneesComponent} from './repertoire/coordonnees/coordonnees.component';
import {ModalModule} from './_modal';
import {CoordonneesEditModalComponent} from './repertoire/coordonnees-edit-modal/coordonnees-edit-modal.component';
import {CoordonneesAddModalComponent} from './repertoire/coordonnees-add-modal/coordonnees-add-modal.component';
import {AdressesComponent} from './repertoire/adresses/adresses.component';
import {AdressesAddModalComponent} from './repertoire/adresses-add-modal/adresses-add-modal.component';
import {AdressesEditModalComponent} from './repertoire/adresses-edit-modal/adresses-edit-modal.component';
import {FormJuridiqueSelect2Component} from './repertoire/form-juridique-select2/form-juridique-select2.component';
import {VoletParametreComponent} from './menu/volet-parametre/volet-parametre.component';
import {EffectifSelect2Component} from './repertoire/effectif-select2/effectif-select2.component';
import {OrganisationParenteSelect2Component} from './repertoire/organisation-parente-select2/organisation-parente-select2.component';
import {ChiffreAffaireSelect2Component} from './repertoire/chiffre-affaire-select2/chiffre-affaire-select2.component';
import {CreerFonctionComponent} from './repertoire/creer/creer-fonction/creer-fonction.component';
import {FonctionPersonneSelect2Component} from './repertoire/fonction-personne-select2/fonction-personne-select2.component';
import {CarteSegmentComponent} from './segment/carte-segment/carte-segment.component';
import {ListeCartesSegmentComponent} from './segment/liste-cartes-segment/liste-cartes-segment.component';
import {FicheSegmentComponent} from './segment/fiche-segment/fiche-segment.component';
import {FicheEditSegmentComponent} from './segment/fiche-edit-segment/fiche-edit-segment.component';
import {FicheEditSegmentFiltresComponent} from './segment/fiche-edit-segment-filtres/fiche-edit-segment-filtres.component';
import {ChampsRequetablesSelect2Component} from './segment/champs-requetables-select2/champs-requetables-select2.component';
import {OperateursSelect2Component} from './segment/operateurs-select2/operateurs-select2.component';
import {SegmentEditValeursComponent} from './segment/segment-edit-valeurs/segment-edit-valeurs.component';
import {SelectDynamiqueComponent} from './helper/select-dynamique/select-dynamique.component';
import {SegmentEditFiltreElementComponent} from './segment/segment-edit-filtre-element/segment-edit-filtre-element.component';
import {ListeEvenementsComponent} from './liste-evenements/liste-evenements.component';
import {CreerEvenementComponent} from './liste-evenements/creer-evenement/creer-evenement.component';
import {ModifierEvenementComponent} from './liste-evenements/modifier-evenement/modifier-evenement.component';
import {FiltreEvenementComponent} from './liste-evenements/filtre-evenement/filtre-evenement.component';
import {FiltreTypeSelect2Component} from './liste-evenements/filtre-type-select2/filtre-type-select2.component';
import {EvenementComponent} from './liste-evenements/evenement/evenement.component';
import {
    NgxUiLoaderModule,
    NgxUiLoaderConfig,
    SPINNER,
    POSITION,
    PB_DIRECTION,
} from 'ngx-ui-loader';

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
    position: {
        horizontal: {
            position: 'middle'
        },
        vertical: {
            position: 'top',
            distance: 60,
            gap: 10
        }
    },
    theme: 'material',
    behaviour: {
        autoHide: 10000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
    },
    animations: {
        enabled: true,
        show: {
            preset: 'slide',
            speed: 300,
            easing: 'ease'
        },
        hide: {
            preset: 'fade',
            speed: 300,
            easing: 'ease',
            offset: 50
        },
        shift: {
            speed: 300,
            easing: 'ease'
        },
        overlap: 150
    }
};

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    bgsPosition: POSITION.bottomCenter,
    bgsSize: 40,
    blur: 2,
    overlayColor: 'rgba(40,40,40,0.5)',
    bgsType: SPINNER.rectangleBounce, // background spinner type
    fgsType: SPINNER.rectangleBounce, // foreground spinner type
    pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
    pbThickness: 0, // progress bar thickness
};

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        LoginComponent,
        LayoutComponent,
        RepertoireComponent,
        LoginFormComponent,
        NavigationItemComponent,
        DashboardComponent,
        SegmentComponent,
        CampagneComponent,
        OffreComponent,
        StatistiqueComponent,
        CarteComponent,
        OutilsComponent,
        CreerComponent,
        FicheComponent,
        FilArianeComponent,
        ListeCartesComponent,
        AvatarComponent,
        FonctionStickerComponent,
        OngletComponent,
        NoteComponent,
        CreerPersonneComponent,
        CreerChoixComponent,
        BlocVisibiliteComponent,
        ModifierPersonneComponent,
        TagsSelect2Component,
        UsersSelect2Component,
        OrigineSelect2Component,
        PersonnnesPhysiqueSelect2Component,
        StatutSelect2Component,
        TitreAutocompleteComponent,
        MemosComponent,
        ChampsPersonalisesComponent,
        CoordonneesComponent,
        CoordonneesEditModalComponent,
        CoordonneesAddModalComponent,
        AdressesComponent,
        AdressesAddModalComponent,
        AdressesEditModalComponent,
        FormJuridiqueSelect2Component,
        VoletParametreComponent,
        EffectifSelect2Component,
        OrganisationParenteSelect2Component,
        ChiffreAffaireSelect2Component,
        CreerFonctionComponent,
        FonctionPersonneSelect2Component,
        CarteSegmentComponent,
        ListeCartesSegmentComponent,
        FicheSegmentComponent,
        FicheEditSegmentComponent,
        FicheEditSegmentFiltresComponent,
        ChampsRequetablesSelect2Component,
        OperateursSelect2Component,
        SegmentEditValeursComponent,
        SelectDynamiqueComponent,
        SegmentEditFiltreElementComponent,
        ListeEvenementsComponent,
        CreerEvenementComponent,
        ModifierEvenementComponent,
        FiltreEvenementComponent,
        FiltreTypeSelect2Component,
        EvenementComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        FontAwesomeModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        InfiniteScrollModule,
        NgSelect2Module,
        AutocompleteLibModule,
        NotifierModule.withConfig(customNotifierOptions),
        ModalModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
    ],
    providers: [authInterceptorProviders, NotifierService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
