<?php
namespace App\Models;

/*
 * Ce fichier fait partie du projet Finance Dashboard
 * Copyright (C) 2024 Floris Robart <florobart.github@gmail.com>
 */

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Abonnement_history extends Model
{
    use HasFactory;

    protected $connection = 'finance_dashboard';
    protected $table = 'abonnement_histories';

    protected $fillable = [
        'nom_actif',
        'montant_transaction',
        'date_transaction'
    ];
}
