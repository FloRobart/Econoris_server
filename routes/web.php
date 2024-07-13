<?php
use App\Http\Controllers\PrivateController;
use Illuminate\Support\Facades\Route;



/*-----------------------------*/
/* Route pour les utilisateurs */
/*      PrivateController      */
/*-----------------------------*/
Route::middleware(['auth'])->group(function () {
    /*---------*/
    /* Accueil */
    /*---------*/
    Route::get('/', [PrivateController::class, 'accueil'])->name('accueil');
    Route::get('/accueil', [PrivateController::class, 'accueil'])->name('accueil');

    /* Route vers l'accueil général du serveur */
    Route::get('/accueil/general', function () { return redirect('http://192.168.1.250:2000/private/accueil'); })->name('accueilGeneral');


    /*--------*/
    /* Profil */
    /*--------*/
    Route::get('/profil', function () { return redirect('http://192.168.1.250:2000/profil'); })->name('profil');


    /*-----------*/
    /* Dashboard */
    /*-----------*/
    /* Salaires */
    Route::get('/salaire', [PrivateController::class, 'salaire'])->name('salaire');
    Route::post('/salaire/add', [PrivateController::class, 'addSalaire'])->name('addSalaire');
    Route::post('/salaire/edit', [PrivateController::class, 'editSalaire'])->name('editSalaire');
    Route::get('/salaire/remove/{id}', [PrivateController::class, 'removeSalaire'])->name('removeSalaire');

    /* Epargnes */
    Route::get('/epargne', [PrivateController::class, 'epargne'])->name('epargne');
    Route::post('/epargne/add', [PrivateController::class, 'addEpargne'])->name('addEpargne');
    Route::post('/epargne/edit', [PrivateController::class, 'editEpargne'])->name('editEpargne');
    Route::get('/epargne/remove/{id}', [PrivateController::class, 'removeEpargne'])->name('removeEpargne');

    /* Investissements */
    Route::post('/investissement/add', [PrivateController::class, 'addInvestissement'])->name('addInvestissement');
    Route::post('/investissement/edit', [PrivateController::class, 'editInvestissement'])->name('editInvestissement');
    Route::get('/investissement/remove/{id}', [PrivateController::class, 'removeInvestissement'])->name('removeInvestissement');
    Route::get('/investissement/details/{type}/{nom_actif}', [PrivateController::class, 'detailsInvestissement'])->name('detailsInvestissement');

    /* Crypto-monnaies */
    Route::get('/crypto', [PrivateController::class, 'crypto'])->name('crypto');

    /* Bourse */
    Route::get('/bourse', [PrivateController::class, 'bourse'])->name('bourse');
});

/* Route pour la redirection en cas de mauvaise authentification */
Route::get('/redirection', function () { return redirect('http://192.168.1.250:2000/'); })->name('login');