<?php
namespace App\Livewire;

/*
 * Ce fichier fait partie du projet Finance Dashboard
 * Copyright (C) 2024 Floris Robart <florobart.github.com>
 */

use Livewire\Component;

class CardProduit extends Component
{
    public $produit;

    public function render()
    {
        return view('livewire.card-produit');
    }
}
