<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Epargne extends Model
{
    use HasFactory;

    protected $connection = 'finance_dashboard' ;
    protected $table = 'epargnes' ;

    protected $fillable = [
        'id',
        'user_id',
        'date_transaction',
        'montant_transaction',
        'banque',
        'compte'
    ];
}
