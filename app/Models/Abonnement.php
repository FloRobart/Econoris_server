<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Abonnement extends Model
{
    use HasFactory;

    protected $connection = 'finance_dashboard' ;
    protected $table = 'abonnements' ;

    protected $fillable = [
        'id',
        'user_id',
        'nom_actif',
        'montant_transaction',
        'date_transaction',
        'abonnement_actif'
    ];
}
