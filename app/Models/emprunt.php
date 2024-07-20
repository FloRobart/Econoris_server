<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class emprunt extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'nom',
        'montant_transaction',
        'taux_interet_annuel',
        'date_debut',
        'date_fin',
        'mensualite'
    ];
}
