<?php
namespace App\Models;

/*
 * Ce fichier fait partie du projet Finance Dashboard
 * Copyright (C) 2024 Floris Robart <florobart.github@gmail.com>
 */

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pret extends Model
{
    use HasFactory;

    protected $connection = 'finance_dashboard';
    protected $table = 'prets';

    protected $fillable = [
        'date_transaction',
        'nom_emprunteur',
        'montant_pret',
        'montant_rembourse',
        'raison_pret',
    ];
}
