{{--
depense.blade.php

Copyright (C) 2024 Floris Robart

Authors: Floris Robart <florobart.github.com>

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
    Dépences
@endsection

@section('content')
<!-- Titre de la page -->
<livewire:page-title :title="'Dépences'" />

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


<!-- Contenue de la page -->
<section class="colCenterContainer space-y-12 mt-4 px-6 mb-32 bgPage">
    <!-- Information générale -->
    <div class="colCenterContainer">
        <h2 class="w-full bigTextBleuLogo text-center mb-3">Information générale</h2>
        <!-- Nombre de depenses reçus -->
        <div class="rowCenterContainer">
            <span class="normalText">Nombre de dépences effectué : <span class="normalTextBleuLogo font-bold">{{ $depenses->count() }}</span></span>
        </div>

        <!-- Montant total des depenses reçus -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total des dépences : <span class="normalTextBleuLogo font-bold">{{ number_format($depenses->sum('montant_transaction'), 2, ',', ' ') }} €</span></span>
        </div>
    </div>

    <!-- Barre de séparation -->
    <livewire:horizontal-separation />

    <!-- Détails des depenses mois par mois -->
    <div class="colCenterContainer">
        <h2 class="w-full bigTextBleuLogo text-center mb-3">Détails des depenses mois par mois</h2>
        <table class="w-full mt-2">
            <!-- Entête du tableau -->
            <thead class="w-full">
                <tr class="tableRow smallText text-center font-bold">
                    @php request()->get('order') == 'asc' ? $order = 'desc' : $order = 'asc'; @endphp
                    <th class="tableCell" title="Trier les dépences par date @if ($order == 'asc') croissante @else décroissante @endif"><a href="{{ URL::current() . '?sort=date_transaction' . '&order=' . $order }}" class="link">Date d'achat</a></th>
                    <th class="tableCell" title="Trier les dépences par nom"><a href="{{ URL::current() . '?sort=nom_actif' . '&order=' . $order }}" class="link">Nom de la dépence</a></th>
                    <th class="tableCell" title="Trier les dépences par montant @if ($order == 'asc') croissant @else décroissant @endif"><a href="{{ URL::current() . '?sort=montant_transaction' . '&order=' . $order }}" class="link">Montant dépencé</a></th>
                    <th class="tableCell">Actions</th>
                </tr>
            </thead>

            <!-- Contenue du tableau -->
            <tbody class="w-full normalText">
                @if (isset($depenses))
                    @foreach ($depenses as $depense)
                        <tr class="tableRow smallText text-center">
                            <!-- Date du virement -->
                            <td class="tableCell" title="Afficher les dépences du mois de {{ strftime('%B %Y', strtotime($depense->date_transaction)) }}"><a href="@if (str_contains(strtolower(URL::current()), 'nom_actif')) {{ route('depenses.date.nom_actif', [$depense->date_transaction, $depense->nom_actif]) }}  @else {{ route('depenses.date', [$depense->date_transaction]) }}  @endif" class="link">{{ strftime('%d %B %Y',strtotime($depense->date_transaction)); }}</a></td>
                            
                            <!-- Nom de la dépence -->
                            <td class="tableCell" title="Afficher les dépences à {{ $depense->nom_actif }}"><a href="@if (str_contains(strtolower(URL::current()), 'date')) {{ route('depenses.date.nom_actif', [$depense->date_transaction, $depense->nom_actif]) }}  @else {{ route('depenses.nom_actif', [$depense->nom_actif]) }}  @endif" class="link">{{ $depense->nom_actif }}</a></td>

                            <!-- Montant dépencé -->
                            <td class="tableCell">{{ number_format($depense->montant_transaction, 2, ',', ' ') }} €</td>

                            <!-- Actions -->
                            <td class="smallRowCenterContainer px-1 min-[460px]:px-2 min-[500px]:px-4 py-2">
                                <!-- Modifier -->
                                <button onclick="editDepense('{{ strftime('%Y-%m-%d', strtotime($depense->date_transaction)) }}', '{{ str_replace('\'', '\\\'', $depense->nom_actif) }}', '{{ $depense->montant_transaction }}', '{{ $depense->id }}')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgBleuLogo hover:bgBleuFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tinySizeIcons">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>

                                <!-- Supprimer -->
                                <a href="{{ route('depense.remove', $depense->id) }}" onclick="return confirm('Êtes-vous sûr de vouloir supprimer le depense du {{ strftime('%A %d %B %Y',strtotime($depense->date_transaction)) }} ? Cette action est irréversible.')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgError hover:bgErrorFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2 ml-1 min-[500px]:ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tinySizeIcons">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </a>
                            </td>
                        </tr>
                    @endforeach
                @endif
            </tbody>
        </table>

        <!-- Formulaire pour ajouter un depense -->
        <form id="form" action="{{ route('depense.add') }}" method="POST" class="rowStartContainer hidden">
            @csrf
            <div class="colCenterContainer">
                <div class="colStartContainer sm:rowStartContainer">
                    <input id="date_transaction"    name="date_transaction"    required type="date" value="{{ date('Y-m-d') }}" max="{{ date('Y-m-d') }}"  class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="nom_actif"           name="nom_actif"           required type="text" placeholder="Nom de la dépense"                        class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="montant_transaction" name="montant_transaction" required type="number" step="0.01" placeholder="Montant du depense" min="0" class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                </div>
                <button id="formButton" class="buttonForm mx-2 min-[500px]:mx-4 my-2">Ajouter</button>
                <div class="w-full tableRowTop"></div>
            </div>
        </form>

        <!-- Bouton pour ajouter un depense -->
        <button onclick="showForm('Ajouter un depense', 'Ajouter', '{{ route('depense.add') }}')" id="button" class="buttonForm mt-8">Ajouter un depense</a>
    </div>
</section>
@endsection

@section('scripts')
<script src="{{ asset('js/showForm.js') }}"></script>
<script>
    oldId = 0;
    /* Fonction pour modifier un depense */
    function editDepense(date_transaction, nom_actif, montant_transaction, id) {
        /* Affichage du formulaire */
        hidden = document.getElementById('form').classList.contains('hidden');
        if (hidden || oldId == id) {
            showForm('Ajouter un depense', 'Modifier', '{{ route('depense.edit') }}');
        } else {
            document.getElementById('formButton').innerText = 'Modifier';
            document.getElementById('form').action = '{{ route('depense.edit') }}';
        }

        /* Remplissage du formulaire */
        document.getElementById('date_transaction').value = date_transaction;
        document.getElementById('nom_actif').value = nom_actif;
        document.getElementById('montant_transaction').value = montant_transaction;

        if (document.getElementById('id') != null) {
            document.getElementById('id').remove();
        }
        document.getElementById('form').insertAdjacentHTML('beforeend', '<input type="hidden" id="id" name="id" value="' + id + '">');
        document.getElementById('form').scrollIntoView();

        oldId = id;
    }
</script>
@endsection
