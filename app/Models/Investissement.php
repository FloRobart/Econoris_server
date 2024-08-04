<?php
namespace App\Models;

/*
 * Ce fichier fait partie du projet Finance Dashboard
 * Copyright (C) 2024 Floris Robart <florobart.github@gmail.com>
 */

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Investissement extends Model
{
    use HasFactory;

    protected $connection = 'finance_dashboard';
    protected $table = 'investissements';

    protected $fillable = [
        'date_transaction',
        'montant_transaction',
        'frais_transaction',
        'type_investissement',
        'nom_actif'
    ];
}
