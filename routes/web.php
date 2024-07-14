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
    Route::post('/salaire/add', [PrivateController::class, 'addSalaire'])->name('addSalaire');
    Route::post('/salaire/edit', [PrivateController::class, 'editSalaire'])->name('editSalaire');
    Route::get('/salaire/remove/{id}', [PrivateController::class, 'removeSalaire'])->name('removeSalaire');

    /*----------*/
    /* Épargnes */
    /*----------*/
    /* Affichage des épargnes */
    Route::get('/epargnes', [PrivateController::class, 'epargnes'])->name('epargnes');
    Route::get('/epargnes/date/{date}', [PrivateController::class, 'epargnesDate'])->name('epargnes.date');
    Route::get('/epargnes/banque/{banque}', [PrivateController::class, 'epargnesBanque'])->name('epargnes.banque');
    Route::get('/epargnes/date/{date}/banque/{banque}', [PrivateController::class, 'epargnesDateBanque'])->name('epargnes.date.banque');

    /* Édition des épargnes */
    Route::post('/epargne/add', [PrivateController::class, 'addEpargne'])->name('addEpargne');
    Route::post('/epargne/edit', [PrivateController::class, 'editEpargne'])->name('editEpargne');
    Route::get('/epargne/remove/{id}', [PrivateController::class, 'removeEpargne'])->name('removeEpargne');

    /*-----------------*/
    /* Investissements */
    /*-----------------*/
    /* Affichage des investissements */
    Route::get('/investissements/all', [PrivateController::class, 'investissements'])->name('investissements.all');
    Route::get('/investissements/date/{date}', [PrivateController::class, 'investissementsDate'])->name('investissements.date');
    Route::get('/investissements/type/{type}', [PrivateController::class, 'investissementsType'])->name('investissements.type');
    Route::get('/investissements/nomActif/{nom_actif}', [PrivateController::class, 'investissementsNom'])->name('investissements.nomActif');
    Route::get('/investissements/date/{date}/type/{type}', [PrivateController::class, 'investissementsDateType'])->name('investissement.date.type');
    Route::get('/investissements/date/{date}/nomActif/{nom_actif}', [PrivateController::class, 'investissementsDateNom'])->name('investissement.date.nomActif');
    Route::get('/investissements/type/{type}/nomActif/{nom_actif}', [PrivateController::class, 'investissementsTypeNom'])->name('investissements.type.nomActif');
    Route::get('/investissements/date/{date}/type/{type}/nomActif/{nom_actif}', [PrivateController::class, 'investissementsDateTypeNom'])->name('investissements.date.type.nomActif');

    /* Édition des investissements */
    Route::post('/investissement/add', [PrivateController::class, 'addInvestissement'])->name('addInvestissement');
    Route::post('/investissement/edit', [PrivateController::class, 'editInvestissement'])->name('editInvestissement');
    Route::get('/investissement/remove/{id}', [PrivateController::class, 'removeInvestissement'])->name('removeInvestissement');


    /*-----------------*/
    /* Crypto-monnaies */
    /*-----------------*/
    /* Affichage des crypto-monnaies */
    Route::get('/investissements/crypto', [PrivateController::class, 'crypto'])->name('crypto');

    /*--------*/
    /* Bourse */
    /*--------*/
    /* Affichage des investissements en bourse */
    Route::get('/investissements/bourse', [PrivateController::class, 'bourse'])->name('bourse');

    /*------------*/
    /* Immobilier */
    /*------------*/
    /* Affichage des investissements immobiliers */
    Route::get('/investissements/immobilier', [PrivateController::class, 'immobilier'])->name('immobilier');
});

/* Route pour la redirection en cas de mauvaise authentification */
Route::get('/redirection', function () { return redirect('http://192.168.1.250:2000/'); })->name('login');