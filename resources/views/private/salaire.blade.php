{{--
salaire.blade.php

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
    Revenus
@endsection

@section('content')
<!-- Titre de la page -->
<livewire:page-title :title="'Revenus'" />

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
        <h2 class="w-full bigTextBleuLogo text-center mb-3">Information générale @if (isset($salaires) && str_contains(strtolower(URL::current()), 'date')) {{ 'du mois de ' . strftime('%B %Y', strtotime($salaires->first()->date_transaction)) }} @endif</h2>
        <!-- Nombre de salaires reçus -->
        <div class="rowCenterContainer">
            <span class="normalText">Nombre de revenus reçus : <span class="normalTextBleuLogo font-bold">{{ $salaires->count() }}</span></span>
        </div>
        <!-- Montant total des salaires reçus -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total des revenus reçus : <span class="normalTextBleuLogo font-bold">{{ number_format($salaires->sum('montant_transaction'), 2, ',', ' ') }} €</span></span>
        </div>
        <!-- Montant total épargné -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total épargné : <span class="normalTextBleuLogo font-bold">{{ number_format($epargnes->sum('montant_transaction'), 2, ',', ' ') }} €</span></span>
        </div>
        <!-- Montant total investie -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total investie : <span class="normalTextBleuLogo font-bold">{{ number_format($investissements->sum('montant_transaction'), 2, ',', ' ') }} €</span></span>
        </div>

        <!-- Montant total emprunté -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total des emprunts : <span class="normalTextBleuLogo font-bold">{{ number_format($totalEmprunte, 2, ',', ' ') }} €</span></span>
        </div>

        <!-- Montant total des abonnements -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total des transactions lié aux abonnements : <span class="normalTextBleuLogo font-bold">{{ number_format($abonnementsHistories->sum('montant_transaction'), 2, ',', ' ') }} €</span></span>
        </div>

        <!-- Montant total des dépences -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total des dépences : <span class="normalTextBleuLogo font-bold">{{ number_format($depenses->sum('montant_transaction'), 2, ',', ' ') }} €</span></span>
        </div>
    </div>

    <!-- Barre de séparation -->
    <livewire:horizontal-separation />

    <!-- Détails des salaires mois par mois -->
    <h2 class="w-full bigTextBleuLogo text-center">Détails des Revenus</h2>
    <div class="colCenterContainer">
        <table class="w-full">
            <!-- Entête du tableau -->
            <thead class="w-full">
                <tr class="tableRow smallText text-center font-bold">
                    @php request()->get('order') == 'asc' ? $order = 'desc' : $order = 'asc'; @endphp
                    <th class="tableCell" title="Trier les salaires par date @if ($order == 'asc') croissante @else décroissante @endif"><a href="{{ URL::current() . '?sort=date_transaction' . '&order=' . $order }}" class="link">Date du virement</a></th>
                    <th class="tableCell" title="Trier les salaires par montant @if ($order == 'asc') croissant @else décroissant @endif"><a href="{{ URL::current() . '?sort=montant_transaction' . '&order=' . $order }}" class="link">Montant du salaire</a></th>
                    <th class="tableCell max-[850px]:hidden" title="Afficher toutes les épargnes"><a href="{{ route('epargnes') }}" class="link">Montant épargné</a></th>
                    <th class="tableCell max-[850px]:hidden" title="Afficher tous les investissements"><a href="{{ route('investissements') }}" class="link">Montant investie</a></th>
                    <th class="tableCell max-[850px]:hidden" title="Afficher tous les abonnements"><a href="{{ route('abonnements') }}" class="link">Montant des abonnements</a></th>
                    <th class="tableCell" title="Afficher toutes les dépences"><a href="{{ route('depenses') }}" class="link">Montant des dépences</a></th>
                    <th class="tableCell">Dépences possibles</th>
                    <th class="tableCell">Actions</th>
                </tr>
            </thead>

            <!-- Contenue du tableau -->
            <tbody class="w-full normalText">
                @if (isset($salaires))
                    @foreach ($salaires as $salaire)
                        <tr class="tableRow smallText text-center">
                            <!-- Date du virement -->
                            <td class="tableCell" title="Afficher les salaires du mois de {{ strftime('%B %Y', strtotime($salaire->date_transaction)) }}"><a href="@if (str_contains(strtolower(URL::current()), 'employeur')) {{ route('salaires.date.employeur', [$salaire->date_transaction, $salaire->employeur]) }} @else {{ route('salaires.date', $salaire->date_transaction) }} @endif" class="link">{{ strftime('%d %B %Y',strtotime($salaire->date_transaction)); }}</a></td>
                            
                            <!-- Montant du salaire -->
                            <td class="tableCell" title="Afficher les salaires versé par {{ $salaire->employeur }}"><a href="@if (str_contains(strtolower(URL::current()), 'date')) {{ route('salaires.date.employeur', [$salaire->date_transaction, $salaire->employeur]) }} @else {{ route('salaires.employeur', $salaire->employeur) }} @endif" class="link">{{ number_format($salaire->montant_transaction, 2, ',', ' ') }} €</a></td>

                            <!-- Montant épargné -->
                            @php $montantEpargne = 0; @endphp
                            @foreach ($epargnes as $epargne)
                                @if (date("m",strtotime($epargne->date_transaction)) == date("m",strtotime($salaire->date_transaction)) && date("Y",strtotime($epargne->date_transaction)) == date("Y",strtotime($salaire->date_transaction)))
                                    @php $montantEpargne += $epargne->montant_transaction; @endphp
                                @endif
                            @endforeach
                            <td class="tableCell max-[850px]:hidden" title="Afficher les épargnes du mois de {{ strftime('%B %Y', strtotime($salaire->date_transaction)) }}"><a href="{{ route('epargnes.date', $salaire->date_transaction) }}" class="link">{{ number_format($montantEpargne, 2, ',', ' ') }} €</a></td>

                            <!-- Montant investie -->
                            @php $montantInvestissement = 0; @endphp
                            @foreach ($investissements as $investissement)
                                @if (date("m",strtotime($investissement->date_transaction)) == date("m",strtotime($salaire->date_transaction)))
                                    @php $montantInvestissement += $investissement->montant_transaction; @endphp
                                @endif
                            @endforeach
                            <td class="tableCell max-[850px]:hidden" title="Afficher les investissements du mois de {{ strftime('%B %Y',strtotime($salaire->date_transaction)) }}"><a href="{{ route('investissements.date', $salaire->date_transaction  ) }}" class="link">{{ number_format($montantInvestissement, 2, ',', ' ') }} €</a></td>

                            <!-- Montant des abonnements -->
                            @php $montantAbonnements = 0; @endphp
                            @foreach ($abonnementsHistories as $abonnement)
                                @if (date("m",strtotime($abonnement->date_transaction)) == date("m",strtotime($salaire->date_transaction)))
                                    @php $montantAbonnements += $abonnement->montant_transaction; @endphp
                                @endif
                            @endforeach
                            <td class="tableCell max-[850px]:hidden" title="Afficher les abonnements du mois de {{ strftime('%B %Y',strtotime($salaire->date_transaction)) }}"><a href="{{ route('abonnements_histories.date', $salaire->date_transaction) }}" class="link">{{ number_format($montantAbonnements, 2, ',', ' ') }} €</a></td>

                            <!-- Montant des dépences -->
                            @php $montantDepenses = 0; @endphp
                            @foreach ($depenses as $depense)
                                @if (date("m",strtotime($depense->date_transaction)) == date("m",strtotime($salaire->date_transaction)))
                                    @php $montantDepenses += $depense->montant_transaction; @endphp
                                @endif
                            @endforeach
                            <td class="tableCell" title="Afficher les dépences du mois de {{ strftime('%B %Y',strtotime($salaire->date_transaction)) }}"><a href="{{ route('depenses.date', $salaire->date_transaction) }}" class="link">{{ number_format($montantDepenses, 2, ',', ' ') }} €</a></td>

                            <!-- Montant des dépences possible -->
                            @php $montantEmprunt = 0; $totalSalairesMentuel = 0; $montantPret = 0; @endphp
                            @foreach ($empruntsHistories as $emprunt)
                                @if (date("m",strtotime($emprunt->date_transaction)) == date("m",strtotime($salaire->date_transaction)))
                                    @php $montantEmprunt += $emprunt->montant_transaction; @endphp
                                @endif
                            @endforeach
                            @foreach ($salaires as $salaireMensuel)
                                @if (date("m",strtotime($salaireMensuel->date_transaction)) == date("m",strtotime($salaire->date_transaction)))
                                    @php $totalSalairesMentuel += $salaireMensuel->montant_transaction; @endphp
                                @endif
                            @endforeach
                            @foreach ($prets as $pret)
                                @if (date("m",strtotime($pret->date_transaction)) == date("m",strtotime($salaire->date_transaction)))
                                    @php $montantPret += $pret->montant_pret - $pret->montant_rembourse; @endphp
                                @endif
                            @endforeach
                            @php
                                $montantDepensesPossible = $totalSalairesMentuel - $montantEpargne - $montantInvestissement - $montantAbonnements - $montantEmprunt - $montantDepenses - $montantPret;
                            @endphp
                            <td class="tableCell @if ($montantDepensesPossible < 0) fontColorError @endif">{{ number_format($montantDepensesPossible, 2, ',', ' ') }} €</td>

                            <!-- Actions -->
                            <td class="smallRowCenterContainer px-1 min-[460px]:px-2 min-[500px]:px-4 py-2">
                                <!-- Modifier -->
                                <button onclick="editSalaire('{{ strftime('%Y-%m-%d', strtotime($salaire->date_transaction)) }}', '{{ $salaire->montant_transaction }}', '{{ str_replace('\'', '\\\'', $salaire->employeur) }}','{{ $salaire->id }}')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgBleuLogo hover:bgBleuFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tinySizeIcons">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>

                                <!-- Supprimer -->
                                <a href="{{ route('salaire.remove', $salaire->id) }}" onclick="return confirm('Êtes-vous sûr de vouloir supprimer le salaire du {{ strftime('%A %d %B %Y',strtotime($salaire->date_transaction)) }} ? Cette action est irréversible.')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgError hover:bgErrorFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2 ml-1 min-[500px]:ml-2">
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

        <!-- Formulaire pour ajouter un salaire -->
        <form id="form" action="{{ route('salaire.add') }}" method="POST" class="rowStartContainer hidden">
            @csrf
            <div class="colCenterContainer">
                <div class="colStartContainer sm:rowStartContainer">
                    <input id="date_transaction"    name="date_transaction"    required type="date" value="{{ date('Y-m-d') }}" max="{{ date('Y-m-d') }}"  class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="montant_transaction" name="montant_transaction" required type="number" step="0.01" placeholder="Montant du salaire" min="0" class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="employeur"           name="employeur"           required type="text" placeholder="Nom de l'employeur"                       class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                </div>
                <button id="formButton" class="buttonForm mx-2 min-[500px]:mx-4 my-2">Ajouter</button>
                <div class="w-full tableRowTop"></div>
            </div>
        </form>

        <!-- Bouton pour ajouter un salaire -->
        <button onclick="showForm('Ajouter un revenu', 'Ajouter', '{{ route('salaire.add') }}')" id="button" class="buttonForm mt-8">Ajouter un salaire</a>
    </div>
</section>
@endsection

@section('scripts')
<script src="{{ asset('js/showForm.js') }}"></script>
<script>
    oldId = 0;
    /* Fonction pour modifier un salaire */
    function editSalaire(date, montant, employeur, id) {
        /* Affichage du formulaire */
        hidden = document.getElementById('form').classList.contains('hidden');
        if (hidden || oldId == id) {
            showForm('Ajouter un revenu', 'Modifier', '{{ route('salaire.edit') }}');
        } else {
            document.getElementById('formButton').innerText = 'Modifier';
            document.getElementById('form').action = '{{ route('salaire.edit') }}';
        }

        /* Remplissage du formulaire */
        document.getElementById('date_transaction').value = date;
        document.getElementById('montant_transaction').value = montant;
        document.getElementById('employeur').value = employeur;

        if (document.getElementById('id') != null) {
            document.getElementById('id').remove();
        }
        document.getElementById('form').insertAdjacentHTML('beforeend', '<input type="hidden" id="id" name="id" value="' + id + '">');
        document.getElementById('form').scrollIntoView();

        oldId = id;
    }
</script>
@endsection
