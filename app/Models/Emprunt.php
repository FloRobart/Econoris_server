<?php
namespace App\Models;

/*
 * Ce fichier fait partie du projet Finance Dashboard
 * Copyright (C) 2024 Floris Robart <florobart.github.com>
 */

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Emprunt extends Model
{
    use HasFactory;

    protected $connection = 'finance_dashboard';
    protected $table = 'emprunts';

    protected $fillable = [
        'id',
        'user_id',
        'nom_actif',
        'montant_transaction',
        'taux_interet_annuel',
        'date_debut',
        'date_fin',
        'mensualite',
        'banque',
    ];
}
