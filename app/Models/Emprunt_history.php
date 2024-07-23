<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Emprunt_history extends Model
{
    use HasFactory;

    protected $connection = 'finance_dashboard' ;
    protected $table = 'emprunt_histories' ;

    protected $fillable = [
        'id',
        'user_id',
        'date_transaction',
        'nom_actif',
        'montant_transaction',
        'banque'
    ];
}
