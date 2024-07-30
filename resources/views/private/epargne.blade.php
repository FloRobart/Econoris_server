{{--
epargne.blade.php

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
    Épargnes
@endsection

@section('content')
<!-- Titre de la page -->
<livewire:page-title :title="'Épargnes'" />

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

        <!-- Nombre de d'opérations d'épargne -->
        <div class="rowCenterContainer">
            <span class="normalText">Nombre d'opérations d'épargne : <span class="normalTextBleuLogo font-bold">{{ $epargnes->count() }}</span></span>
        </div>

        <!-- Montant total épargné -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total épargné : <span class="normalTextBleuLogo font-bold">{{ number_format($epargnes->sum('montant_transaction'), 2, ',', ' ') }} €</span></span>
        </div>
    </div>

    <!-- Barre de séparation -->
    <livewire:horizontal-separation />

    <!-- Détails des épargne mois par mois -->
    <div class="colCenterContainer">
        <h2 class="w-full bigTextBleuLogo text-center mb-3">Détails des épargnes mois par mois</h2>
        <table class="w-full mt-2">
            <!-- Entête du tableau -->
            <thead class="w-full">
                <tr class="tableRow smallText text-center font-bold">
                    @php request()->get('order') == 'asc' ? $order = 'desc' : $order = 'asc'; @endphp
                    <th class="tableCell" title="Trier les épargnes par date @if ($order == 'asc') croissante @else décroissante @endif"><a href="{{ URL::current() . '?sort=date_transaction'    . '&order=' . $order }}">Date du virement</a></th>
                    <th class="tableCell" title="Trier les épargnes par montant @if ($order == 'asc') croissant @else décroissant @endif"><a href="{{ URL::current() . '?sort=montant_transaction' . '&order=' . $order }}">Montant épargné </a></th>
                    <th class="tableCell" title="Trier les épargnes par nom de banque @if ($order == 'asc') alphabétique @else anti-alphabétique @endif"><a href="{{ URL::current() . '?sort=banque'              . '&order=' . $order }}">Nom de la banque</a></th>
                    <th class="tableCell" title="Trier les épargnes par nom de compte @if ($order == 'asc') alphabétique @else anti-alphabétique @endif"><a href="{{ URL::current() . '?sort=compte'              . '&order=' . $order }}">Nom du compte   </a></th>
                    <th class="tableCell">Actions</th>
                </tr>
            </thead>

            <!-- Contenue du tableau -->
            <tbody class="w-full normalText">
                @if (isset($epargnes))
                    @foreach ($epargnes as $epargne)
                        <tr class="tableRow smallText text-center">
                            <!-- Date de la transaction -->
                            @if (str_contains(strtolower(URL::current()), 'date'))
                                <td class="tableCell">{{ strftime('%d %B %Y', strtotime($epargne->date_transaction)); }}</td>
                            @else
                                @if (str_contains(strtolower(URL::current()), 'banque'))
                                    @if (str_contains(strtolower(URL::current()), 'compte'))
                                        <td class="tableCell" title="Afficher les épargnes du mois de {{ strftime('%B %Y', strtotime($epargne->date_transaction)) }} placé sur le {{ $epargne->compte }} du {{ $epargne->banque }}"><a href="{{ route('epargnes.date.banque.compte', [$epargne->date_transaction, $epargne->banque, $epargne->compte]) }}" class="link">{{ strftime('%d %B %Y',strtotime($epargne->date_transaction)); }}</a></td>
                                    @else
                                        <td class="tableCell" title="Afficher les épargnes du mois de {{ strftime('%B %Y', strtotime($epargne->date_transaction)) }} au {{ $epargne->banque }}"><a href="{{ route('epargnes.date.banque', [$epargne->date_transaction, $epargne->banque]) }}" class="link">{{ strftime('%d %B %Y',strtotime($epargne->date_transaction)); }}</a></td>
                                    @endif
                                @else
                                    @if (str_contains(strtolower(URL::current()), 'compte'))
                                        <td class="tableCell" title="Afficher les épargnes du mois de {{ strftime('%B %Y', strtotime($epargne->date_transaction)) }} placé sur le {{ $epargne->compte }}"><a href="{{ route('epargnes.date.compte', [$epargne->date_transaction, $epargne->compte]) }}" class="link">{{ strftime('%d %B %Y',strtotime($epargne->date_transaction)); }}</a></td>
                                    @else
                                        <td class="tableCell" title="Afficher les épargnes du mois de {{ strftime('%B %Y', strtotime($epargne->date_transaction)) }}"><a href="{{ route('epargnes.date', [$epargne->date_transaction]) }}" class="link">{{ strftime('%d %B %Y',strtotime($epargne->date_transaction)); }}</a></td>
                                    @endif
                                @endif
                            @endif
                            
                            <!-- Montant de la transaction -->
                            <td class="tableCell">{{ number_format($epargne->montant_transaction, 2, ',', ' ') }} €</td>
                            
                            <!-- Nom de la banque -->
                            @if (str_contains(strtolower(URL::current()), 'banque'))
                                <td class="tableCell">{{ $epargne->banque }}</td>
                            @else
                                @if (str_contains(strtolower(URL::current()), 'date'))
                                    @if (str_contains(strtolower(URL::current()), 'compte'))
                                        <td class="tableCell" title="Afficher les épargnes du mois de {{ strftime('%B %Y', strtotime($epargne->date_transaction)) }} placé sur le {{ $epargne->compte }} du {{ $epargne->banque }}"><a href="{{ route('epargnes.date.banque.compte', [$epargne->date_transaction, $epargne->banque, $epargne->compte]) }}" class="link">{{ $epargne->banque }}</a></td>
                                    @else
                                        <td class="tableCell" title="Afficher les épargnes du mois de {{ strftime('%B %Y', strtotime($epargne->date_transaction)) }} au {{ $epargne->banque }}"><a href="{{ route('epargnes.date.banque', [$epargne->date_transaction, $epargne->banque]) }}" class="link">{{ $epargne->banque }}</a></td>
                                    @endif
                                @else
                                    @if (str_contains(strtolower(URL::current()), 'compte'))
                                        <td class="tableCell" title="Afficher les épargnes placé sur le {{ $epargne->compte }} du {{ $epargne->banque }}"><a href="{{ route('epargnes.banque.compte', [$epargne->banque, $epargne->compte]) }}" class="link">{{ $epargne->banque }}</a></td>
                                    @else
                                        <td class="tableCell" title="Afficher les épargnes placé sur {{ $epargne->banque }}"><a href="{{ route('epargnes.banque', $epargne->banque) }}" class="link">{{ $epargne->banque }}</a></td>
                                    @endif
                                @endif
                            @endif
                            
                            <!-- Nom du compte -->
                            @if (str_contains(strtolower(URL::current()), 'compte'))
                                <td class="tableCell">{{ $epargne->compte }}</td>
                            @else
                                @if (str_contains(strtolower(URL::current()), 'banque'))
                                    @if (str_contains(strtolower(URL::current()), 'date'))
                                        <td class="tableCell" title="Afficher les épargnes du mois de {{ strftime('%B %Y', strtotime($epargne->date_transaction)) }} placé sur le {{ $epargne->compte }} du {{ $epargne->banque }}"><a href="{{ route('epargnes.date.banque.compte', [$epargne->date_transaction, $epargne->banque, $epargne->compte]) }}" class="link">{{ $epargne->compte }}</a></td>
                                    @else
                                        <td class="tableCell" title="Afficher les épargnes placé sur le {{ $epargne->compte }} du {{ $epargne->banque }}"><a href="{{ route('epargnes.banque.compte', [$epargne->banque, $epargne->compte]) }}" class="link">{{ $epargne->compte }}</a></td>
                                    @endif
                                @else
                                    @if (str_contains(strtolower(URL::current()), 'date'))
                                        <td class="tableCell" title="Afficher les épargnes du mois de {{ strftime('%B %Y', strtotime($epargne->date_transaction)) }} placé sur le {{ $epargne->compte }}"><a href="{{ route('epargnes.date.compte', [$epargne->date_transaction, $epargne->compte]) }}" class="link">{{ $epargne->compte }}</a></td>
                                    @else
                                        <td class="tableCell" title="Afficher les épargnes placé sur le {{ $epargne->compte }}"><a href="{{ route('epargnes.compte', $epargne->compte) }}" class="link">{{ $epargne->compte }}</a></td>
                                    @endif
                                @endif
                            @endif

                            <!-- Actions -->
                            <td class="smallRowCenterContainer px-1 min-[460px]:px-2 min-[500px]:px-4 py-2">
                                <!-- Modifier -->
                                <button onclick="editEpargne('{{ strftime('%Y-%m-%d', strtotime($epargne->date_transaction)) }}', '{{ $epargne->montant_transaction }}', '{{ str_replace('\'', '\\\'', $epargne->banque) }}', '{{ str_replace('\'', '\\\'', $epargne->compte) }}', '{{ $epargne->id }}')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgBleuLogo hover:bgBleuFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tinySizeIcons">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>

                                <!-- Supprimer -->
                                <a href="{{ route('epargne.remove', $epargne->id) }}" onclick="return confirm('Êtes-vous sûr de vouloir supprimer l\'épargne du {{ strftime('%A %d %B %Y',strtotime($epargne->date_transaction)) }} ? Cette action est irréversible.')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgError hover:bgErrorFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2 ml-1 min-[500px]:ml-2">
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

        <!-- Formulaire pour ajouter une épargne -->
        <form id="form" action="{{ route('epargne.add') }}" method="POST" class="rowStartContainer hidden">
            @csrf
            <div class="colCenterContainer">
                <div class="colStartContainer lg:rowStartContainer">
                    <input id="date_transaction"    name="date_transaction"    required type="date" value="{{ date('Y-m-d') }}" max="{{ date('Y-m-d') }}"    class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="montant_transaction" name="montant_transaction" required type="number" step="0.01" placeholder="Montant du versement" min="0" class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="banque"              name="banque"              required type="text" placeholder="Nom de la banque"                           class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="compte"              name="compte"              required type="text" placeholder="Nom du compte"                              class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                </div>
                <button id="formButton" class="buttonForm mx-2 min-[500px]:mx-4 my-2">Ajouter</button>
                <div class="w-full tableRowTop"></div>
            </div>
        </form>

        <!-- Bouton pour ajouter une épargne -->
        <button onclick="showForm('Ajouter une épargne', 'Ajouter', '{{ route('epargne.add') }}')" id="button" class="buttonForm mt-8">Ajouter une épargne</a>
    </div>
</section>
@endsection

@section('scripts')
<script src="{{ asset('js/showForm.js') }}"></script>
<script>
    oldId = 0;
    /* Fonction pour modifier une épargne */
    function editEpargne(date, montant, banque, compte, id) {
        /* Affichage du formulaire */
        hidden = document.getElementById('form').classList.contains('hidden');
        if (hidden || oldId == id) {
            showForm('Ajouter une épargne', 'Modifier', '{{ route('epargne.edit') }}');
        } else {
            document.getElementById('formButton').innerText = 'Modifier';
            document.getElementById('form').action = '{{ route('epargne.edit') }}';
        }

        /* Remplissage du formulaire */
        document.getElementById('date_transaction').value = date;
        document.getElementById('montant_transaction').value = montant;
        document.getElementById('banque').value = banque;
        document.getElementById('compte').value = compte;

        if (document.getElementById('id') != null) {
            document.getElementById('id').remove();
        }
        document.getElementById('form').insertAdjacentHTML('beforeend', '<input type="hidden" id="id" name="id" value="' + id + '">');
        document.getElementById('form').scrollIntoView();

        oldId = id;
    }
</script>
@endsection
