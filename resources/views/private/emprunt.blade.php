{{--
emprunt.blade.php

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
    Emprunts
@endsection

@section('content')
<!-- Titre de la page -->
<livewire:page-title :title="'Emprunts'" />

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

        <!-- Nombre de d'opérations -->
        <div class="rowCenterContainer">
            <span class="normalText">Nombre d'emprunt : <span class="normalTextBleuLogo font-bold">{{ $emprunts->count() }}</span></span>
        </div>

        <!-- Montant mensuel des emprunts -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant mensuel des emprunts : <span class="normalTextBleuLogo font-bold">{{ number_format($emprunts->sum('mensualite'), 2, ',', ' ') }} €</span></span>
        </div>

        <!-- Montant total des emprunts -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total des emprunts : <span class="normalTextBleuLogo font-bold">{{ number_format($emprunts->sum('montant_transaction'), 2, ',', ' ') }} €</span></span>
        </div>
    </div>

    <!-- Barre de séparation -->
    <livewire:horizontal-separation />

    <!-- Détails des emprunt mois par mois -->
    <div class="colCenterContainer">
        <h2 class="w-full bigTextBleuLogo text-center mb-3">Liste de mes emprunts</h2>
        <table class="w-full mt-2">
            <!-- Entête du tableau -->
            <thead class="w-full">
                <tr class="tableRow smallText text-center font-bold">
                    @php request()->get('order') == 'asc' ? $order = 'desc' : $order = 'asc'; @endphp
                    <th class="tableCell" title="Trier les emprunts par date de souscription"><a href="{{ URL::current() . '?sort=date_debut' . '&order=' . $order }}" class="link">Date d'emprunt</a></th>
                    <th class="tableCell max-[850px]:hidden" title="Trier les emprunts par date de fun de remboursement"><a href="{{ URL::current() . '?sort=date_fin' . '&order=' . $order }}" class="link">Date de fin d'emprunt</a></th>
                    <th class="tableCell" title="Trier les emprunts par nom d'emprunt"><a href="{{ URL::current() . '?sort=nom_actif' . '&order=' . $order }}" class="link">Nom de l'emprunt</a></th>
                    <th class="tableCell max-[850px]:hidden" title="Trier les emprunts par nom de banque"><a href="{{ URL::current() . '?sort=banque' . '&order=' . $order }}" class="link">Banque</a></th>
                    <th class="tableCell" title="Trier les emprunts par montant emprunté"><a href="{{ URL::current() . '?sort=montant_transaction' . '&order=' . $order }}" class="link">Montant emprunté</a></th>
                    <th class="tableCell" title="Trier les emprunts par montant des mensualités"><a href="{{ URL::current() . '?sort=mensualite' . '&order=' . $order }}" class="link">Mensualité</a></th>
                    <th class="tableCell max-[850px]:hidden" title="Trier les emprunts par taux d'intéret annuel"><a href="{{ URL::current() . '?sort=taux_interet_annuel' . '&order=' . $order }}" class="link">Taux d'intéret annuel</a></th>
                    <th class="tableCell">Actions</th>
                </tr>
            </thead>

            <!-- Contenue du tableau -->
            <tbody class="w-full normalText">
                @if (isset($emprunts))
                    @foreach ($emprunts as $emprunt)
                        <tr class="tableRow smallText text-center">
                            <!-- Date de l'emprunt -->
                            <td class="tableCell">{{ strftime('%d %B %Y', strtotime($emprunt->date_debut)) }}</td>

                            <!-- Date de fin de l'emprunt -->
                            <td class="tableCell max-[850px]:hidden">{{ strftime('%d %B %Y', strtotime($emprunt->date_fin)) }}</td>

                            <!-- Nom de l'actif -->
                            <td class="tableCell" title="Afficher l'historique des transactions de l'emprunt {{ $emprunt->nom_actif }}"><a href="{{ route('emprunts_histories') }}" class="link">{{ $emprunt->nom_actif }}</a></td>

                            <!-- Banque -->
                            @if (str_contains(strtolower(URL::current()), 'banque'))
                                <td class="tableCell max-[850px]:hidden">{{ $emprunt->banque }}</td>
                            @else
                                <td class="tableCell max-[850px]:hidden" title="Afficher les emprunts souscrit auprès de la banque {{ $emprunt->banque }}"><a href="{{ route('emprunts.banque', $emprunt->banque) }}" class="link">{{ $emprunt->banque }}</a></td>
                            @endif

                            <!-- Montant emprunté -->
                            <td class="tableCell">{{ number_format($emprunt->montant_transaction, 2, ',', ' ') }} €</td>

                            <!-- Mensualité -->
                            <td class="tableCell">{{ number_format($emprunt->mensualite, 2, ',', ' ') }} €</td>

                            <!-- Taux d'intérêt annuel -->
                            <td class="tableCell max-[850px]:hidden">{{ number_format($emprunt->taux_interet_annuel, 2, ',', ' ') }} %</td>

                            <!-- Actions -->
                            <td class="smallRowCenterContainer px-1 min-[460px]:px-2 min-[500px]:px-4 py-2">
                                <!-- Modifier -->
                                <button onclick="editEmprunt('{{ strftime('%Y-%m-%d', strtotime($emprunt->date_debut)) }}', '{{ strftime('%Y-%m-%d', strtotime($emprunt->date_fin)) }}', '{{ str_replace('\'', '\\\'', $emprunt->nom_actif) }}', '{{ $emprunt->banque }}', '{{ $emprunt->montant_transaction }}', '{{ $emprunt->mensualite }}', '{{ $emprunt->taux_interet_annuel }}', '{{ $emprunt->id }}')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgBleuLogo hover:bgBleuFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tinySizeIcons">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>

                                <!-- Supprimer -->
                                <a href="{{ route('emprunt.remove', $emprunt->id) }}" onclick="return confirm('Êtes-vous sûr de vouloir supprimer l\'emprunt à {{ str_replace('\'', '\\\'', $emprunt->nom_actif) }} du {{ strftime('%A %d %B %Y',strtotime($emprunt->date_debut)) }} ? Cette action est irréversible.')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgError hover:bgErrorFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2 ml-1 min-[500px]:ml-2">
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

        <!-- Formulaire pour ajouter un emprunt -->
        <form id="form" action="{{ route('emprunt.add') }}" method="POST" class="rowStartContainer hidden">
            @csrf
            <div class="colCenterContainer">
                <div class="colStartContainer xl:rowStartContainer">
                    <input id="date_debut"          name="date_debut"          required type="date" value="{{ date('Y-m-d') }}"                                 class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="date_fin"            name="date_fin"            required type="date"                                                             class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="nom_actif"           name="nom_actif"           required type="text" placeholder="Nom de l'emprunt"                              class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="banque"              name="banque"              required type="text" placeholder="Nom de la banque"                              class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="montant_transaction" name="montant_transaction" required type="number" step="0.01" placeholder="Montant de l'emprunt" min="0"    class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="mensualite"          name="mensualite"          required type="number" step="0.01" placeholder="Mensualité" min="0"              class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="taux_interet_annuel" name="taux_interet_annuel" required type="number" step="0.01" placeholder="Taux d'intérêt annuel" min="0"   class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                </div>
                <button id="formButton" class="buttonForm mx-2 min-[500px]:mx-4 my-2">Ajouter</button>
                <div class="w-full tableRowTop"></div>
            </div>
        </form>

        <!-- Bouton pour ajouter un emprunt -->
        <button onclick="showForm('Ajouter un emprunt', 'Ajouter', '{{ route('emprunt.add') }}')" id="button" class="buttonForm mt-8">Ajouter un emprunt</a>
    </div>
</section>
@endsection

@section('scripts')
<script src="{{ asset('js/showForm.js') }}"></script>
<script>
    oldId = 0;
    /* Fonction pour modifier un emprunt */
    function editEmprunt(date_debut, date_fin, nom_actif, banque, montant_transaction, mensualite, taux_interet, id)
    {
        /* Affichage du formulaire */
        hidden = document.getElementById('form').classList.contains('hidden');
        if (hidden || oldId == id) {
            showForm('Ajouter un emprunt', 'Modifier', '{{ route('emprunt.edit') }}');
        } else {
            document.getElementById('formButton').innerText = 'Modifier';
            document.getElementById('form').action = '{{ route('emprunt.edit') }}';
        }

        /* Remplissage du formulaire */
        document.getElementById('date_debut').value = date_debut;
        document.getElementById('date_fin').value = date_fin;
        document.getElementById('nom_actif').value = nom_actif;
        document.getElementById('banque').value = banque;
        document.getElementById('montant_transaction').value = montant_transaction;
        document.getElementById('mensualite').value = mensualite;
        document.getElementById('taux_interet_annuel').value = taux_interet;

        if (document.getElementById('id') != null) {
            document.getElementById('id').remove();
        }
        document.getElementById('form').insertAdjacentHTML('beforeend', '<input type="hidden" id="id" name="id" value="' + id + '">');
        document.getElementById('form').scrollIntoView();

        oldId = id;
    }
</script>
@endsection
