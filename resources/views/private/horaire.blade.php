{{--
 * Ce fichier fait partie du projet Finance Dashboard
 * Copyright (C) 2024 Floris Robart <florobart.github@gmail.com>
--}}

<!-- Page d'accueil -->
@extends('layouts.page_template')
@section('title')
    Horaires
@endsection

@section('content')
<!-- Titre de la page -->
<livewire:page-title :title="'Horaires'" />

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

        <!-- Nombre d'heure total travaillé -->
        <div class="rowCenterContainer">
            @php
                $totalHeure = 0;
                foreach ($horaires as $horaire) {
                    $totalHeure += ($horaire->heure_soir - $horaire->heure_apres_midi) + ($horaire->heure_apres_midi - $horaire->heure_matin);
                }
            @endphp
            <span class="normalText">Nombre d'heure total : <span class="normalTextBleuLogo font-bold">{{ $totalHeure }} heures</span></span>
        </div>

        <!-- Nombre d'heure travaillé dans le mois -->
        <div class="rowCenterContainer">
            @php
                $totalHeureMois = 0;
                foreach ($horaires as $horaire) {
                    if (date('m', strtotime($horaire->date_transaction)) == date('m')) {
                        $totalHeureMois += ($horaire->heure_soir - $horaire->heure_apres_midi) + ($horaire->heure_apres_midi - $horaire->heure_matin);
                    }
                }
            @endphp
            <span class="normalText">Nombre d'heure total pendant le mois de {{ strftime('%B %Y', strtotime(date('Y-m-d'))) }} : <span class="normalTextBleuLogo font-bold">{{ $totalHeureMois }} heures</span></span>
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
                    <th class="tableCell" title="Trier par date @if ($order == 'asc') croissante @else décroissante @endif"><a href="{{ URL::current() . '?sort=date_transaction' . '&order=' . $order }}">Date</a></th>
                    <th class="tableCell" title="Trier par heure de début de travail @if ($order == 'asc') croissant @else décroissant @endif"><a href="{{ URL::current() . '?sort=heure_matin' . '&order=' . $order }}">Heure de début</a></th>
                    <th class="tableCell" title="Trier par heure de fin de travail @if ($order == 'asc') croissant @else décroissant @endif"><a href="{{ URL::current() . '?sort=heure_soir' . '&order=' . $order }}">Heure de fin</a></th>
                    <th class="tableCell">Nombre d'heure dans la journée</th>
                    <th class="tableCell">Nombre d'heure dans la semaine</th>
                    <th class="tableCell">Actions</th>
                </tr>
            </thead>

            <!-- Contenue du tableau -->
            <tbody class="w-full normalText">
                @if (isset($horaires))
                    @foreach ($horaires as $horaire)
                        <tr class="tableRow smallText text-center">
                            <!-- Date de la transaction -->
                            <td class="tableCell"><a href="{{ route('horaires.date', $horaire->date_transaction) }}">{{ strftime('%d %B %Y', strtotime($horaire->date_transaction)); }}</a></td>
                            
                            <!-- Heure de début de travail -->
                            <td class="tableCell">{{ $horaire->heure_matin }}</td>
                            
                            <!-- Heure de fin de travail -->
                            <td class="tableCell">{{ $horaire->heure_soir }}</td>
                            
                            <!-- Nombre d'heure dans la journée -->
                            <td class="tableCell">{{ ($horaire->heure_soir - $horaire->heure_apres_midi) + ($horaire->heure_apres_midi - $horaire->heure_matin) }}</td>

                            <!-- Nombre d'heure dans la semaine -->
                             @php
                                $totalHeureSemaine = 0;
                                foreach ($horaires as $horaire) {
                                    if (date('W', strtotime($horaire->date_transaction)) == date('W')) {
                                        $totalHeureSemaine += ($horaire->heure_soir - $horaire->heure_apres_midi) + ($horaire->heure_apres_midi - $horaire->heure_matin);
                                    }
                                }
                            @endphp
                            <td class="tableCell">{{ $totalHeureSemaine }}</td>

                            <!-- Actions -->
                            <td class="smallRowCenterContainer px-1 min-[460px]:px-2 min-[500px]:px-4 py-2">
                                <!-- Modifier -->
                                <button onclick="editHoraire('{{ strftime('%Y-%m-%d', strtotime($horaire->date_transaction)) }}', '{{ $horaire->heure_matin }}', '{{ $horaire->heure_midi }}', '{{ $horaire->heure_apres_midi }}', '{{ $horaire->heure_soir }}', '{{ $horaire->id }}')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgBleuLogo hover:bgBleuFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tinySizeIcons">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>

                                <!-- Supprimer -->
                                <a href="{{ route('horaire.remove', $horaire->id) }}" onclick="return confirm('Êtes-vous sûr de vouloir supprimer l\'horaire du {{ strftime('%A %d %B %Y',strtotime($horaire->date_transaction)) }} ? Cette action est irréversible.')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgError hover:bgErrorFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2 ml-1 min-[500px]:ml-2">
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
        <form id="form" action="{{ route('horaire.add') }}" method="POST" class="rowStartContainer hidden">
            @csrf
            <div class="colCenterContainer">
                <div class="colStartContainer lg:rowStartContainer">
                    <input id="date_transaction" name="date_transaction" required type="date" value="{{ date('Y-m-d') }}" max="{{ date('Y-m-d') }}" class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="heure_matin"      name="heure_matin"      required type="time" placeholder="Heure de début" min="00:00" max="23:59"  class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="heure_midi"       name="heure_midi"                type="time" placeholder="Heure du midi"  min="00:00" max="23:59"  class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="heure_apres_midi" name="heure_apres_midi"          type="time" placeholder="Heure de début" min="00:00" max="23:59"  class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="heure_soir"       name="heure_soir"       required type="time" placeholder="Heure de début" min="00:00" max="23:59"  class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                </div>
                <button id="formButton" class="buttonForm mx-2 min-[500px]:mx-4 my-2">Ajouter</button>
                <div class="w-full tableRowTop"></div>
            </div>
        </form>

        <!-- Bouton pour ajouter une épargne -->
        <button onclick="showForm('Ajouter un horaire', 'Ajouter', '{{ route('horaire.add') }}')" id="button" class="buttonForm mt-8">Ajouter un horaire</a>
    </div>
</section>
@endsection

@section('scripts')
<script src="{{ asset('js/showForm.js') }}"></script>
<script>
    oldId = 0;
    /* Fonction pour modifier une épargne */
    function editHoraire(date, matin, midi, apres_midi, soir, id) {
        /* Affichage du formulaire */
        hidden = document.getElementById('form').classList.contains('hidden');
        if (hidden || oldId == id) {
            showForm('Ajouter un horaire', 'Modifier', '{{ route('horaire.edit') }}');
        } else {
            document.getElementById('formButton').innerText = 'Modifier';
            document.getElementById('form').action = '{{ route('horaire.edit') }}';
        }

        /* Remplissage du formulaire */
        document.getElementById('date_transaction').value = date;
        document.getElementById('heure_matin').value = matin;
        document.getElementById('heure_midi').value = midi;
        document.getElementById('heure_apres_midi').value = apres_midi;
        document.getElementById('heure_soir').value = soir;

        if (document.getElementById('id') != null) {
            document.getElementById('id').remove();
        }
        document.getElementById('form').insertAdjacentHTML('beforeend', '<input type="hidden" id="id" name="id" value="' + id + '">');
        document.getElementById('form').scrollIntoView();

        oldId = id;
    }
</script>
@endsection
