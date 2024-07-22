<?php
use App\Http\Controllers\PrivateController;
use Illuminate\Support\Facades\Route;



/*-----------------------------*/
/* Route pour les utilisateurs */
/*      PrivateController      */
/*-----------------------------*/
Route::middleware(['auth'])->group(function () {
    /*=========*/
    /* Accueil */
    /*=========*/
    Route::get('/', [PrivateController::class, 'accueil'])->name('accueil');
    Route::get('/accueil', [PrivateController::class, 'accueil'])->name('accueil');

    /* Route vers l'accueil général du serveur */
    Route::get('/accueil/general', function () { return redirect('http://192.168.1.250:2000/private/accueil'); })->name('accueil.general');


    /*--------*/
    /* Profil */
    /*--------*/
    Route::get('/profil', function () { return redirect('http://192.168.1.250:2000/profil'); })->name('profil');


    /*===========*/
    /* Dashboard */
    /*===========*/
    /*----------*/
    /* Salaires */
    /*----------*/
    /* Affichage des salaires */
    Route::get('/salaires', [PrivateController::class, 'salaires'])->name('salaires');
    Route::get('/salaires/date/{date}', [PrivateController::class, 'salairesDate'])->name('salaires.date');
    Route::get('/salaires/employeur/{employeur}', [PrivateController::class, 'salairesEmployeur'])->name('salaires.employeur');
    Route::get('/salaires/date/{date}/employeur/{employeur}', [PrivateController::class, 'salairesDateEmployeur'])->name('salaires.date.employeur');

    /* Édition des salaires */
    Route::post('/salaire/add', [PrivateController::class, 'addSalaire'])->name('salaire.add');
    Route::post('/salaire/edit', [PrivateController::class, 'editSalaire'])->name('salaire.edit');
    Route::get('/salaire/remove/{id}', [PrivateController::class, 'removeSalaire'])->name('salaire.remove');

    /*----------*/
    /* Épargnes */
    /*----------*/
    /* Affichage des épargnes */
    Route::get('/epargnes', [PrivateController::class, 'epargnes'])->name('epargnes');
    Route::get('/epargnes/date/{date}', [PrivateController::class, 'epargnesDate'])->name('epargnes.date');
    Route::get('/epargnes/banque/{banque}', [PrivateController::class, 'epargnesBanque'])->name('epargnes.banque');
    route::get('/epargnes/compte/{compte}', [PrivateController::class, 'epargnesCompte'])->name('epargnes.compte');
    Route::get('/epargnes/date/{date}/banque/{banque}', [PrivateController::class, 'epargnesDateBanque'])->name('epargnes.date.banque');
    Route::get('/epargnes/date/{date}/compte/{compte}', [PrivateController::class, 'epargnesDateCompte'])->name('epargnes.date.compte');
    Route::get('/epargnes/banque/{banque}/compte/{compte}', [PrivateController::class, 'epargnesBanqueCompte'])->name('epargnes.banque.compte');
    Route::get('/epargnes/date/{date}/banque/{banque}/compte/{compte}', [PrivateController::class, 'epargnesDateBanqueCompte'])->name('epargnes.date.banque.compte');

    /* Édition des épargnes */
    Route::post('/epargne/add', [PrivateController::class, 'addEpargne'])->name('epargne.add');
    Route::post('/epargne/edit', [PrivateController::class, 'editEpargne'])->name('epargne.edit');
    Route::get('/epargne/remove/{id}', [PrivateController::class, 'removeEpargne'])->name('epargne.remove');

    /*-----------------*/
    /* Investissements */
    /*-----------------*/
    /* Affichage des investissements */
    Route::get('/investissements', function () { return redirect(route('investissements.type', 'investissements')); })->name('investissements');
    Route::get('/investissements/date/{date}', [PrivateController::class, 'investissementsDate'])->name('investissements.date');
    Route::get('/investissements/type/{type}', [PrivateController::class, 'investissementsType'])->name('investissements.type');
    Route::get('/investissements/nom_actif/{nom_actif}', [PrivateController::class, 'investissementsNom'])->name('investissements.nom_actif');
    Route::get('/investissements/date/{date}/type/{type}', [PrivateController::class, 'investissementsDateType'])->name('investissements.date.type');
    Route::get('/investissements/date/{date}/nom_actif/{nom_actif}', [PrivateController::class, 'investissementsDateNom'])->name('investissements.date.nom_actif');
    Route::get('/investissements/type/{type}/nom_actif/{nom_actif}', [PrivateController::class, 'investissementsTypeNom'])->name('investissements.type.nom_actif');
    Route::get('/investissements/date/{date}/type/{type}/nom_actif/{nom_actif}', [PrivateController::class, 'investissementsDateTypeNom'])->name('investissements.date.type.nom_actif');

    /* Édition des investissements */
    Route::post('/investissement/add', [PrivateController::class, 'addInvestissement'])->name('investissement.add');
    Route::post('/investissement/edit', [PrivateController::class, 'editInvestissement'])->name('investissement.edit');
    Route::get('/investissement/remove/{id}', [PrivateController::class, 'removeInvestissement'])->name('investissement.remove');

    /* Ajout de type d'investissement */
    Route::post('/investissement/type/add', [PrivateController::class, 'addTypeInvestissement'])->name('investissement.type.add');

    /*-------------*/
    /* Abonnements */
    /*-------------*/
    /* Affichage des abonnements */
    Route::get('/abonnements', [PrivateController::class, 'abonnements'])->name('abonnements');
    Route::get('/abonnements/date/{date}', [PrivateController::class, 'abonnementsDate'])->name('abonnements.date');
    Route::get('/abonnements/nom_actif/{nom_actif}', [PrivateController::class, 'abonnementsNom'])->name('abonnements.nom_actif');
    Route::get('/abonnements/abonnement_actif/{abonnement_actif}', [PrivateController::class, 'abonnementsActif'])->name('abonnements.abonnement_actif');
    Route::get('/abonnements/date/{date}/nom_actif/{nom_actif}', [PrivateController::class, 'abonnementsDateNom'])->name('abonnements.date.nom_actif');
    Route::get('/abonnements/date/{date}/abonnement_actif/{abonnement_actif}', [PrivateController::class, 'abonnementsDateActif'])->name('abonnements.date.abonnement_actif');
    Route::get('/abonnements/nom_actif/{nom_actif}/abonnement_actif/{abonnement_actif}', [PrivateController::class, 'abonnementsNomActif'])->name('abonnements.nom_actif.abonnement_actif');
    Route::get('/abonnements/date/{date}/nom_actif/{nom_actif}/abonnement_actif/{abonnement_actif}', [PrivateController::class, 'abonnementsDateNomActif'])->name('abonnements.date.nom_actif.abonnement_actif');


    /* Édition des abonnements */
    Route::post('/abonnement/add', [PrivateController::class, 'addAbonnement'])->name('abonnement.add');
    Route::post('/abonnement/edit', [PrivateController::class, 'editAbonnement'])->name('abonnement.edit');
    Route::get('/abonnement/remove/{id}', [PrivateController::class, 'removeAbonnement'])->name('abonnement.remove');
});

/* Route pour la redirection en cas de mauvaise authentification */
Route::get('/redirection', function () { return redirect('http://192.168.1.250:2000/'); })->name('login');