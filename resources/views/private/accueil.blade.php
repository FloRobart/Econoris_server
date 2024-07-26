{{--
accueil.blade.php

Copyright (C) 2024 Floris Robart

Authors: Floris Robart <florisrobart.pro@gmail.com>

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation; either version 2.1 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this program; if not, write to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston MA 02110-1301, USA.
--}}

<!-- Page d'accueil -->
@extends('layouts.page_template')
@section('title')
    Tableau de bord des finances
@endsection

@section('content')
<!-- Titre de la page -->
<livewire:page-title :title="'Tableau de bord des finances'" />

<!-- Messages d'erreur et de succès -->
<div class="colCenterContainer mt-8 px-4">
    @if ($errors->any())
        <div class="rowCenterContainer">
            <ul>
                @foreach ($errors->all() as $error)
                    <li class="normalTextError text-center">{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <livewire:information-message />
</div>


<!-- Affichage des différents profils -->
<section class="colCenterContainer gap-y-10 bgPage mb-[21rem] min-[400px]:mb-68 md:mb-[30rem] lg:mb-[21rem] xl:mb-52 mt-6">
    <!-- Informations diverses -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
        <a href="{{ route('salaires') }}"    class="buttonForm">Revenue    </a>
        <a href="{{ route('epargnes') }}"    class="buttonForm">Épargnes   </a>
        <a href="{{ route('depenses') }}"    class="buttonForm">Dépenses   </a>
        <a href="{{ route('abonnements') }}" class="buttonForm">Abonnements</a>
        <a href="{{ route('emprunts') }}"    class="buttonForm">Emprunts   </a>
        <a href="{{ route('prets') }}"       class="buttonForm">Prêts      </a>
    </div>

    <!-- Investissements -->
    <h1 class="titleText mt-12"><a href="{{ route('investissements') }}" class="link">Investissements</a></h1>

    <!-- Affichage des différents types d'investissements -->
    @if (isset($investissements))
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
            @foreach ($investissements as $investissement)
                <a href="{{ route('investissements.type', $investissement->type_investissement) }}" class="buttonForm">{{ ucfirst($investissement->type_investissement) }}</a>
            @endforeach
        </div>
    @endif

    <!-- Formulaire d'ajout d'un type d'investissement -->
    <form id="addInvestissementTypeForm" action="{{ route('investissement.type.add') }}" method="POST" class="w-9/12 sm:w-6/12 colCenterContainer gap-y-4 hidden">
        @csrf
        <label for="new_type" class="normalText text-center">Nom du nouveau type d'investissement</label>
        <input type="text" name="new_type" id="new_type" class="inputForm" minlength="1" maxlength="255" placeholder="Nom du type d'investissement" required>
        <div class="rowCenterContainer gap-x-4">
            <button type="button" onclick="hideAddInvestissementTypeForm()" class="buttonForm bgError">Annuler</button>
            <button type="submit" class="buttonForm">Ajouter</button>
        </div>
    </form>

    <button onclick="showAddInvestissementTypeForm()" id="addInvestissementTypeButton" class="buttonForm mt-8">+ Ajoutez un investissement</button>
</section>
@endsection

@section('scripts')
<script>
    // Fonction pour fermer les messages d'erreur et de succès
    function showAddInvestissementTypeForm()
    {
        /* Affiche le formulaire d'ajout d'un type d'investissement */
        document.getElementById('addInvestissementTypeForm').classList.remove('hidden');
        document.getElementById('addInvestissementTypeButton').classList.add('hidden');
    }

    function hideAddInvestissementTypeForm()
    {
        /* Cache le formulaire d'ajout d'un type d'investissement */
        document.getElementById('addInvestissementTypeForm').classList.add('hidden');
        document.getElementById('addInvestissementTypeButton').classList.remove('hidden');
    }
</script>
@endsection