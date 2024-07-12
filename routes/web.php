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

    /*-----------*/
    /* Dashboard */
    /*-----------*/
    /* Salaires */
    Route::get('/salaire', [PrivateController::class, 'salaire'])->name('salaire');
    Route::post('/salaire', [PrivateController::class, 'addSalaire'])->name('addSalaire');
    Route::get('/salaire/{id}', [PrivateController::class, 'removeSalaire'])->name('removeSalaire');

    /* Epargnes */
    Route::get('/epargne', [PrivateController::class, 'epargne'])->name('epargne');
    Route::post('/epargne', [PrivateController::class, 'addEpargne'])->name('addEpargne');
    Route::get('/epargne/{id}', [PrivateController::class, 'removeEpargne'])->name('removeEpargne');

    /* Investissements */
    Route::post('/investissement', [PrivateController::class, 'addInvestissement'])->name('addInvestissement');
    Route::get('/investissement/{id}', [PrivateController::class, 'removeInvestissement'])->name('removeInvestissement');

    /* Crypto-monnaies */
    Route::get('/crypto', [PrivateController::class, 'crypto'])->name('crypto');

    /* Bourse */
    Route::get('/bourse', [PrivateController::class, 'bourse'])->name('bourse');
});

/* Route pour la redirection en cas de mauvaise authentification */
Route::get('/redirection', function () { return redirect('http://192.168.1.250:2000/'); })->name('login');