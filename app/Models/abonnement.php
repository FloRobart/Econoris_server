<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class abonnement extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'nom',
        'montant_transaction',
        'date_debut',
        'actif'
    ];
}
