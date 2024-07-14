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
    Route::get('/salaire', [PrivateController::class, 'salaire'])->name('salaire');

    /* Édition des salaires */
    Route::post('/salaire/add', [PrivateController::class, 'addSalaire'])->name('addSalaire');
    Route::post('/salaire/edit', [PrivateController::class, 'editSalaire'])->name('editSalaire');
    Route::get('/salaire/remove/{id}', [PrivateController::class, 'removeSalaire'])->name('removeSalaire');

    /*----------*/
    /* Épargnes */
    /*----------*/
    /* Affichage des épargnes */
    Route::get('/epargne', [PrivateController::class, 'epargne'])->name('epargne');

    /* Édition des épargnes */
    Route::post('/epargne/add', [PrivateController::class, 'addEpargne'])->name('addEpargne');
    Route::post('/epargne/edit', [PrivateController::class, 'editEpargne'])->name('editEpargne');
    Route::get('/epargne/remove/{id}', [PrivateController::class, 'removeEpargne'])->name('removeEpargne');

    /*-----------------*/
    /* Investissements */
    /*-----------------*/
    /* Affichage des investissements */
    Route::get('/investissement/all', [PrivateController::class, 'allInvestissement'])->name('allInvestissement');
    Route::get('/investissement/type/{type}/date/{date}', [PrivateController::class, 'investissementDate'])->name('investissement.date');
    Route::get('/investissement/type/{type}/nom/{nom_actif}', [PrivateController::class, 'detailsInvestissement'])->name('detailsInvestissement');
    Route::get('/investissement/type/{type}/nom/{nom_actif}/date/{date}', [PrivateController::class, 'detailsInvestissementDate'])->name('detailsInvestissement.date');

    /* Édition des investissements */
    Route::post('/investissement/add', [PrivateController::class, 'addInvestissement'])->name('addInvestissement');
    Route::post('/investissement/edit', [PrivateController::class, 'editInvestissement'])->name('editInvestissement');
    Route::get('/investissement/remove/{id}', [PrivateController::class, 'removeInvestissement'])->name('removeInvestissement');


    /*-----------------*/
    /* Crypto-monnaies */
    /*-----------------*/
    /* Affichage des crypto-monnaies */
    Route::get('/investissement/crypto', [PrivateController::class, 'crypto'])->name('crypto');

    /*--------*/
    /* Bourse */
    /*--------*/
    /* Affichage des investissements en bourse */
    Route::get('/investissement/bourse', [PrivateController::class, 'bourse'])->name('bourse');

    /*------------*/
    /* Immobilier */
    /*------------*/
    /* Affichage des investissements immobiliers */
    Route::get('/investissement/immobilier', [PrivateController::class, 'immobilier'])->name('immobilier');
});

/* Route pour la redirection en cas de mauvaise authentification */
Route::get('/redirection', function () { return redirect('http://192.168.1.250:2000/'); })->name('login');