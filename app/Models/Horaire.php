<?php
namespace App\Models;

/*
 * Ce fichier fait partie du projet Finance Dashboard
 * Copyright (C) 2024 Floris Robart <florobart.github@gmail.com>
 */

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horaire extends Model
{
    use HasFactory;

    protected $connection = 'finance_dashboard';
    protected $table = 'horaires';

    protected $fillable = [
        'date_transaction',
        'heure_matin',
        'heure_midi',
        'pause_apres_midi',
        'heure_soir'
    ];
}
