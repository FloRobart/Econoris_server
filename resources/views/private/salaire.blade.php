{{--
 * Ce fichier fait partie du projet Finance Dashboard
 * Copyright (C) 2024 Floris Robart <florobart.github@gmail.com>
--}}

<!-- Page d'accueil -->
@extends('layouts.page_template')
@section('title')
    Revenus
@endsection

@section('content')
<!-- Titre de la page -->
@include('components.page-title', ['title' => 'Revenus'])

<!-- Messages d'erreur et de succès -->
<div class="colCenterContainer mt-8 px-4">
    @include('components.information-message')
</div>


<!-- Contenue de la page -->
<section class="colCenterContainer space-y-12 mt-4 px-6 mb-32 bgPage">
    <!-- Information générale -->
    <div class="colCenterContainer">
        <h2 class="w-full bigTextBleuLogo text-center mb-3">Information générale @if (isset($salaires) && str_contains(strtolower(URL::current()), 'date')) {{ 'du mois de ' . strftime('%B %Y', strtotime($salaires->first()->date_transaction)) }} @endif</h2>
        <!-- Nombre de salaires reçus -->
        <div class="rowCenterContainer">
            <span class="normalText text-center">Nombre de revenus reçus : <span class="normalTextBleuLogo font-bold">{{ $salaires->count() }}</span></span>
        </div>

        <!-- Montant total emprunté -->
        <div class="rowCenterContainer">
            <span class="normalText text-center">Montant total des emprunts : <span class="normalTextBleuLogo font-bold">{{ number_format($totalEmprunte, 2, ',', ' ') }} €</span></span>
        </div>

        <!-- Montant total emprunté -->
        <div class="rowCenterContainer">
            <span class="normalText text-center">Montant total des prêts : <span class="normalTextBleuLogo font-bold">{{ number_format($totalEmprunte, 2, ',', ' ') }} €</span></span>
        </div>

        <br>

        <!-- Montant total des salaires du mois -->
        @php
            $totalSalairesMensuel = 0;
            foreach ($salaires as $salaireMensuel) {
                if (date("m-Y",strtotime($salaireMensuel->date_transaction)) == date("m-Y")) {
                    $totalSalairesMensuel += $salaireMensuel->montant_transaction;
                }
            }
        @endphp
        <div class="rowCenterContainer">
            <span class="normalText text-center">Montant total des revenues du mois de {{ strftime('%B %Y', strtotime(date('Y-m-d'))) }} : <span class="normalTextBleuLogo font-bold">{{ number_format($totalSalairesMensuel, 2, ',', ' ') }} €</span></span>
        </div>

        <br>

        <!-- Indice de gestion d'argent -->
        <div class="rowCenterContainer">
            @php $totalGestionArgent = $depenses->sum('montant_transaction') + $abonnementsHistories->sum('montant_transaction') ? $depenses->sum('montant_transaction') + $abonnementsHistories->sum('montant_transaction') : 1; @endphp
            <span class="normalText text-center">Indice de gestion d'argent : <span class="normalTextBleuLogo font-bold">{{ number_format($salaires->sum('montant_transaction') / $totalGestionArgent, 2, ',', ' ') }}</span></span>
            <div class="ml-3 tooltip">
                <svg class="tinySizeIcons" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>

                <span class="tooltiptext hidden">L'indice de gestion d'argent vous indique si vous géré correctement votre argent. Plus l'indice est élevé plus gérer correctement votre argent. Quand l'indice est à 1 ça veux dire que vous dépensé tous se que vous gagné et si l'indice est en dessous de 1 ça veux dire que vous dépensé plus que se que vous gagné.</span>
            </div>
        </div>
    </div>

    <!-- Barre de séparation -->
    @include('components.horizontal-separation')

    <!-- Détails des revenues mois par mois -->
    <h2 class="w-full bigTextBleuLogo text-center">Détails des Revenus</h2>
    <div class="colCenterContainer">
        <table class="w-full">
            <!-- Entête du tableau -->
            <thead class="w-full">
                <tr class="tableRow smallText text-center font-bold">
                    @php request()->get('order') == 'asc' ? $order = 'desc' : $order = 'asc'; @endphp
                    <th class="tableCell" title="Trier les revenues par date @if ($order == 'asc') croissante @else décroissante @endif"><a href="{{ URL::current() . '?sort=date_transaction' . '&order=' . $order }}" class="link">Date du virement</a></th>
                    <th class="tableCell" title="Trier les revenues par montant @if ($order == 'asc') croissant @else décroissant @endif"><a href="{{ URL::current() . '?sort=montant_transaction' . '&order=' . $order }}" class="link">Revenue</a></th>
                    <th class="tableCell max-[850px]:hidden" title="Afficher toutes les épargnes"><a href="{{ route('epargnes') }}" class="link">Épargné</a></th>
                    <th class="tableCell max-[850px]:hidden" title="Afficher tous les investissements"><a href="{{ route('investissements') }}" class="link">Investie</a></th>
                    <th class="tableCell max-[850px]:hidden" title="Afficher tous les abonnements"><a href="{{ route('abonnements') }}" class="link">Abonnements</a></th>
                    <th class="tableCell" title="Afficher toutes les dépenses du mois"><a href="{{ route('depenses') }}" class="link">Dépenses</a></th>
                    <th class="tableCell" title="Argent qui peut être dépensé dans le mois">Dépenses possibles</th>
                    <th class="tableCell" title="Pourcentage d'argent dépensé par rapport aux revenues">%</th>
                    <th class="tableCell">Actions</th>
                </tr>
            </thead>

            <!-- Contenue du tableau -->
            <tbody class="w-full normalText">
                @php $oldSalaire = null; $totalSalaire = 0; $totalEpargne = 0; $totalInvestissement = 0; $totalAbonnement = 0; $totalDepense = 0; $totalDepensePossible = 0; @endphp
                @if (isset($salaires))
                    @foreach ($salaires as $salaire)
                        @if (!str_contains(strtolower(Request::url()), 'date'))
                            @if ($oldSalaire == null || date("m-Y", strtotime($oldSalaire->date_transaction)) != date("m-Y", strtotime($salaire->date_transaction)))
                                <tr class="tableRow smallText text-center">
                                    <!-- Date du virement -->
                                    <td class="tableCell" title="Afficher les revenues du mois de {{ strftime('%B %Y', strtotime($salaire->date_transaction)) }}"><a href="@if (str_contains(strtolower(URL::current()), 'employeur')) {{ route('salaires.date.employeur', [$salaire->date_transaction, $salaire->employeur]) }} @else {{ route('salaires.date', $salaire->date_transaction) }} @endif" class="link">{{ strftime('%B %Y',strtotime($salaire->date_transaction)); }}</a></td>
                                    
                                    <!-- Montant du revenues -->
                                    {{-- Calcul du montant des revenues du mois --}}
                                    @php $totalSalairesMensuel = 0; @endphp
                                    @foreach ($salaires as $salaireMensuel)
                                        @if (date("m-Y",strtotime($salaireMensuel->date_transaction)) == date("m-Y",strtotime($salaire->date_transaction)))
                                            @php $totalSalairesMensuel += $salaireMensuel->montant_transaction; @endphp
                                        @endif
                                    @endforeach
                                    @php $totalSalaire += $totalSalairesMensuel @endphp
                                    <td class="tableCell" title="Afficher les revenues versé par {{ $salaire->employeur }}"><a href="@if (str_contains(strtolower(URL::current()), 'date')) {{ route('salaires.date.employeur', [$salaire->date_transaction, $salaire->employeur]) }} @else {{ route('salaires.employeur', $salaire->employeur) }} @endif" class="link">{{ number_format($totalSalairesMensuel, 2, ',', ' ') }} €</a></td>

                                    <!-- Montant épargné -->
                                    @php $montantEpargne = 0; @endphp
                                    @foreach ($epargnes as $epargne)
                                        @if (date("m-Y",strtotime($epargne->date_transaction)) == date("m-Y",strtotime($salaire->date_transaction)) && date("Y",strtotime($epargne->date_transaction)) == date("Y",strtotime($salaire->date_transaction)))
                                            @php $montantEpargne += $epargne->montant_transaction; @endphp
                                        @endif
                                    @endforeach
                                    @php $totalEpargne += $montantEpargne; @endphp
                                    <td class="tableCell max-[850px]:hidden" title="Afficher les épargnes du mois de {{ strftime('%B %Y', strtotime($salaire->date_transaction)) }}"><a href="{{ route('epargnes.date', $salaire->date_transaction) }}" class="link">{{ number_format($montantEpargne, 2, ',', ' ') }} €</a></td>

                                    <!-- Montant investie -->
                                    @php $montantInvestissement = 0; @endphp
                                    @foreach ($investissements as $investissement)
                                        @if (date("m-Y",strtotime($investissement->date_transaction)) == date("m-Y",strtotime($salaire->date_transaction)))
                                            @php $montantInvestissement += $investissement->montant_transaction; @endphp
                                        @endif
                                    @endforeach
                                    @php $totalInvestissement += $montantInvestissement; @endphp
                                    <td class="tableCell max-[850px]:hidden" title="Afficher les investissements du mois de {{ strftime('%B %Y',strtotime($salaire->date_transaction)) }}"><a href="{{ route('investissements.date', $salaire->date_transaction  ) }}" class="link">{{ number_format($montantInvestissement, 2, ',', ' ') }} €</a></td>

                                    <!-- Montant des abonnements -->
                                    @php $montantAbonnements = 0; @endphp
                                    @if (date("m-Y", strtotime($salaire->date_transaction)) == date("m-Y"))
                                        @php $montantAbonnementMensuel = 0; $montantAbonnementAnnuel = 0; @endphp
                                        @foreach ($abonnements as $abo)
                                            @if ($abo->abonnement_actif == 1)
                                                @if ($abo->mensuel == 1)
                                                    @php $montantAbonnementMensuel += $abo->montant_transaction; @endphp
                                                @else
                                                    @if (date("m-Y", strtotime($abo->date_transaction)) == date("m-Y"))
                                                        @php $montantAbonnementAnnuel += $abo->montant_transaction; @endphp
                                                    @endif
                                                @endif
                                            @endif
                                        @endforeach

                                        @php $montantAbonnements = $montantAbonnementMensuel + $montantAbonnementAnnuel; @endphp
                                    @else
                                        @foreach ($abonnementsHistories as $abonnement)
                                            @if (date("m-Y",strtotime($abonnement->date_transaction)) == date("m-Y",strtotime($salaire->date_transaction)))
                                                @php $montantAbonnements += $abonnement->montant_transaction; @endphp
                                            @endif
                                        @endforeach
                                    @endif
                                    @php $totalAbonnement += $montantAbonnements; @endphp
                                    <td class="tableCell max-[850px]:hidden" title="Afficher les abonnements du mois de {{ strftime('%B %Y',strtotime($salaire->date_transaction)) }}"><a href="{{ route('abonnements_histories.date', $salaire->date_transaction) }}" class="link">{{ number_format($montantAbonnements, 2, ',', ' ') }} €</a></td>

                                    <!-- Montant des dépenses -->
                                    @php $montantDepenses = 0; @endphp
                                    @foreach ($depenses as $depense)
                                        @if (date("m-Y",strtotime($depense->date_transaction)) == date("m-Y",strtotime($salaire->date_transaction)))
                                            @php $montantDepenses += $depense->montant_transaction; @endphp
                                        @endif
                                    @endforeach
                                    @php $totalDepense += $montantDepenses; @endphp
                                    <td class="tableCell" title="Afficher les dépenses du mois de {{ strftime('%B %Y',strtotime($salaire->date_transaction)) }}"><a href="{{ route('depenses.date', $salaire->date_transaction) }}" class="link">{{ number_format($montantDepenses, 2, ',', ' ') }} €</a></td>

                                    <!-- Montant des dépenses possible -->
                                    @php $montantEmprunt = 0; $montantPret = 0; @endphp

                                    {{-- Calcul du montant des emprunts --}}
                                    @foreach ($empruntsHistories as $emprunt)
                                        @if (date("m-Y",strtotime($emprunt->date_transaction)) == date("m-Y",strtotime($salaire->date_transaction)))
                                            @php $montantEmprunt += $emprunt->montant_transaction; @endphp
                                        @endif
                                    @endforeach

                                    {{-- Calcul du montant des prêts --}}
                                    @foreach ($prets as $pret)
                                        @if (date("m-Y",strtotime($pret->date_transaction)) == date("m-Y",strtotime($salaire->date_transaction)))
                                            @php $montantPret += $pret->montant_pret - $pret->montant_rembourse; @endphp
                                        @endif
                                    @endforeach

                                    @php $montantDepensesPossible = $totalSalairesMensuel - $montantEpargne - $montantInvestissement - $montantEmprunt - $montantDepenses - $montantPret - $montantAbonnements; @endphp
                                    @php $totalDepensePossible += $montantDepensesPossible; @endphp
                                    <td class="tableCell @if ($montantDepensesPossible < 0) fontColorError @endif" title="Vous pouvez dépenser {{ number_format($montantDepensesPossible, 2, ',', ' ') }} € au mois de {{ strftime('%B %Y', strtotime($salaire->date_transaction)) }}">{{ number_format($montantDepensesPossible, 2, ',', ' ') }} €</td>

                                    <!-- Ratio argent gagné / argent dépensé -->
                                    @php
                                        $ratio = (($totalSalairesMensuel - $montantDepensesPossible - $montantEpargne - $montantInvestissement ) / ($totalSalairesMensuel == 0 ? 1 : $totalSalairesMensuel )) * 100;
                                    @endphp
                                    <td class="tableCell @if($ratio < 35) fontColorValid @endif @if($ratio > 90 && $ratio <= 100) fontColorAlert @endif @if($ratio > 100) fontColorError @endif" title="Vous avec dépensé {{ number_format($ratio, 0, ',', ' ') }} % de votre salaire">{{ number_format($ratio, 0, ',', ' ') }} %</td>

                                    <!-- Actions -->
                                    <td class="tableCell px-1 min-[460px]:px-2 min-[500px]:px-4 py-2">
                                        <div class="smallRowCenterContainer">
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
                                        </div>
                                    </td>
                                </tr>
                            @endif
                        @else
                            <tr class="tableRow smallText text-center">
                                <!-- Date du virement -->
                                <td class="tableCell" title="Afficher les revenues du mois de {{ strftime('%B %Y', strtotime($salaire->date_transaction)) }}"><a href="@if (str_contains(strtolower(URL::current()), 'employeur')) {{ route('salaires.date.employeur', [$salaire->date_transaction, $salaire->employeur]) }} @else {{ route('salaires.date', $salaire->date_transaction) }} @endif" class="link">{{ strftime('%d %B %Y',strtotime($salaire->date_transaction)); }}</a></td>
                                
                                <!-- Montant du salaire -->
                                @php $totalSalaire += $salaire->montant_transaction; @endphp
                                <td class="tableCell" title="Afficher les revenues versé par {{ $salaire->employeur }}"><a href="@if (str_contains(strtolower(URL::current()), 'date')) {{ route('salaires.date.employeur', [$salaire->date_transaction, $salaire->employeur]) }} @else {{ route('salaires.employeur', $salaire->employeur) }} @endif" class="link">{{ number_format($salaire->montant_transaction, 2, ',', ' ') }} €</a></td>

                                <!-- Montant épargné -->
                                @php $montantEpargne = 0; @endphp
                                @foreach ($epargnes as $epargne)
                                    @if (date("m-Y",strtotime($epargne->date_transaction)) == date("m-Y",strtotime($salaire->date_transaction)))
                                        @php $montantEpargne += $epargne->montant_transaction; @endphp
                                    @endif
                                @endforeach
                                @php if ($oldSalaire == null || date("m-Y", strtotime($oldSalaire->date_transaction)) != date("m-Y", strtotime($salaire->date_transaction))) { $totalEpargne += $montantEpargne; } @endphp
                                <td class="tableCell max-[850px]:hidden" title="Afficher les épargnes du mois de {{ strftime('%B %Y', strtotime($salaire->date_transaction)) }}"><a href="{{ route('epargnes.date', $salaire->date_transaction) }}" class="link">{{ number_format($montantEpargne, 2, ',', ' ') }} €</a></td>

                                <!-- Montant investie -->
                                @php $montantInvestissement = 0; @endphp
                                @foreach ($investissements as $investissement)
                                    @if (date("m-Y",strtotime($investissement->date_transaction)) == date("m-Y",strtotime($salaire->date_transaction)))
                                        @php $montantInvestissement += $investissement->montant_transaction; @endphp
                                    @endif
                                @endforeach
                                @php if ($oldSalaire == null || date("m", strtotime($oldSalaire->date_transaction)) != date("m", strtotime($salaire->date_transaction))) { $totalInvestissement += $montantInvestissement; } @endphp
                                <td class="tableCell max-[850px]:hidden" title="Afficher les investissements du mois de {{ strftime('%B %Y',strtotime($salaire->date_transaction)) }}"><a href="{{ route('investissements.date', $salaire->date_transaction  ) }}" class="link">{{ number_format($montantInvestissement, 2, ',', ' ') }} €</a></td>

                                <!-- Montant des abonnements -->
                                @php $montantAbonnements = 0; @endphp
                                @if (date("m-Y", strtotime($salaire->date_transaction)) == date("m-Y"))
                                    @php $montantAbonnementMensuel = 0; $montantAbonnementAnnuel = 0; @endphp
                                    @foreach ($abonnements as $abo)
                                        @if ($abo->abonnement_actif == 1)
                                            @if ($abo->mensuel == 1)
                                                @php $montantAbonnementMensuel += $abo->montant_transaction; @endphp
                                            @else
                                                @if (date("m-Y", strtotime($abo->date_transaction)) == date("m-Y"))
                                                    @php $montantAbonnementAnnuel += $abo->montant_transaction; @endphp
                                                @endif
                                            @endif
                                        @endif
                                    @endforeach

                                    @php $montantAbonnements = $montantAbonnementMensuel + $montantAbonnementAnnuel; @endphp
                                @else
                                    @foreach ($abonnementsHistories as $abonnement)
                                        @if (date("m-Y",strtotime($abonnement->date_transaction)) == date("m-Y",strtotime($salaire->date_transaction)))
                                            @php $montantAbonnements += $abonnement->montant_transaction; @endphp
                                        @endif
                                    @endforeach
                                @endif
                                @php if ($oldSalaire == null || date("m-Y", strtotime($oldSalaire->date_transaction)) != date("m-Y", strtotime($salaire->date_transaction))) { $totalAbonnement += $montantAbonnements; } @endphp
                                <td class="tableCell max-[850px]:hidden" title="Afficher les abonnements du mois de {{ strftime('%B %Y',strtotime($salaire->date_transaction)) }}"><a href="{{ route('abonnements_histories.date', $salaire->date_transaction) }}" class="link">{{ number_format($montantAbonnements, 2, ',', ' ') }} €</a></td>

                                <!-- Montant des dépenses -->
                                @php $montantDepenses = 0; @endphp
                                @foreach ($depenses as $depense)
                                    @if (date("m-Y",strtotime($depense->date_transaction)) == date("m-Y",strtotime($salaire->date_transaction)))
                                        @php $montantDepenses += $depense->montant_transaction; @endphp
                                    @endif
                                @endforeach
                                @php if ($oldSalaire == null || date("m-Y", strtotime($oldSalaire->date_transaction)) != date("m-Y", strtotime($salaire->date_transaction))) { $totalDepense += $montantDepenses; } @endphp
                                <td class="tableCell" title="Afficher les dépenses du mois de {{ strftime('%B %Y',strtotime($salaire->date_transaction)) }}"><a href="{{ route('depenses.date', $salaire->date_transaction) }}" class="link">{{ number_format($montantDepenses, 2, ',', ' ') }} €</a></td>

                                <!-- Montant des dépenses possible -->
                                @php $montantEmprunt = 0; $totalSalairesMensuel = 0; $montantPret = 0; @endphp

                                {{-- Calcul du montant des emprunts --}}
                                @foreach ($empruntsHistories as $emprunt)
                                    @if (date("m-Y",strtotime($emprunt->date_transaction)) == date("m-Y",strtotime($salaire->date_transaction)))
                                        @php $montantEmprunt += $emprunt->montant_transaction; @endphp
                                    @endif
                                @endforeach

                                {{-- Calcul du montant des salaires du mois --}}
                                @foreach ($salaires as $salaireMensuel)
                                    @if (date("m-Y",strtotime($salaireMensuel->date_transaction)) == date("m-Y",strtotime($salaire->date_transaction)))
                                        @php $totalSalairesMensuel += $salaireMensuel->montant_transaction; @endphp
                                    @endif
                                @endforeach

                                {{-- Calcul du montant des prêts --}}
                                @foreach ($prets as $pret)
                                    @if (date("m-Y",strtotime($pret->date_transaction)) == date("m-Y",strtotime($salaire->date_transaction)))
                                        @php $montantPret += $pret->montant_pret - $pret->montant_rembourse; @endphp
                                    @endif
                                @endforeach

                                @php $montantDepensesPossible = $totalSalairesMensuel - $montantEpargne - $montantInvestissement - $montantEmprunt - $montantDepenses - $montantPret - $montantAbonnements; @endphp
                                @php if ($oldSalaire == null || date("m-Y", strtotime($oldSalaire->date_transaction)) != date("m-Y", strtotime($salaire->date_transaction))) { $totalDepensePossible += $montantDepensesPossible; } @endphp
                                <td class="tableCell @if ($montantDepensesPossible < 0) fontColorError @endif" title="Vous pouvez dépenser {{ number_format($montantDepensesPossible, 2, ',', ' ') }} € au mois de {{ strftime('%B %Y', strtotime($salaire->date_transaction)) }}">{{ number_format($montantDepensesPossible, 2, ',', ' ') }} €</td>

                                <!-- Ratio argent gagné / argent dépensé -->
                                @php
                                    $ratio = (($totalSalairesMensuel - $montantDepensesPossible - $montantEpargne - $montantInvestissement ) / ($totalSalairesMensuel == 0 ? 1 : $totalSalairesMensuel )) * 100;
                                @endphp
                                <td class="tableCell @if($ratio < 35) fontColorValid @endif @if($ratio > 90 && $ratio <= 100) fontColorAlert @endif @if($ratio > 100) fontColorError @endif" title="Vous avec dépensé {{ number_format($ratio, 0, ',', ' ') }} % de votre salaire">{{ number_format($ratio, 0, ',', ' ') }} %</td>

                                <!-- Actions -->
                                <td class="tableCell px-1 min-[460px]:px-2 min-[500px]:px-4 py-2">
                                    <div class="smallRowCenterContainer">
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
                                    </div>
                                </td>
                            </tr>
                        @endif

                        @php $oldSalaire = $salaire; @endphp
                    @endforeach
                @endif

                <!-- Total des colonnes -->
                <tr class="tableRow smallText text-center">
                    <!-- Total -->
                    <td class="tableCell pt-16">Total</td>
                    
                    <!-- Montant des revenues -->
                    <td class="tableCell pt-16" title="Montant total des revenues">{{ number_format($totalSalaire, 2, ',', ' ') }} €</td>

                    <!-- Montant total épargné -->
                    <td class="tableCell pt-16 max-[850px]:hidden" title="Montant total épargnés">{{ number_format($totalEpargne, 2, ',', ' ') }} €</td>

                    <!-- Montant total investie -->
                    <td class="tableCell pt-16 max-[850px]:hidden" title="Montant total investies">{{ number_format($totalInvestissement, 2, ',', ' ') }} €</td>

                    <!-- Montant total des abonnements -->
                    <td class="tableCell pt-16 max-[850px]:hidden" title="Montant total des abonnements">{{ number_format($totalAbonnement, 2, ',', ' ') }} €</td>

                    <!-- Montant total des dépenses -->
                    <td class="tableCell pt-16" title="Total argent dépensé, épargné ou investie">{{ number_format($totalDepense, 2, ',', ' ') }} €</td>

                    <!-- Montant total des dépenses possible -->
                    <td class="tableCell pt-16 @if ($totalDepensePossible < 0) fontColorError @endif">{{ number_format($totalDepensePossible, 2, ',', ' ') }} €</td>

                    <!-- Ratio argent gagné / argent dépensé -->
                    @php $ratio = (($totalAbonnement + $totalDepense) / ($totalSalaire == 0 ? 1 : $totalSalaire)) * 100; @endphp
                    <td class="tableCell pt-16 @if($ratio < 35) fontColorValid @endif @if($ratio > 90 && $ratio <= 100) fontColorAlert @endif @if($ratio > 100) fontColorError @endif" title="Vous avez dépensé {{ number_format($ratio, 0, ',', ' ') }} % de tous vos revenues">{{ number_format($ratio, 0, ',', ' ') }} %</td>
                </tr>
            </tbody>
        </table>

        <!-- Formulaire pour ajouter un revenu -->
        <form id="form" action="{{ route('salaire.add') }}" method="POST" class="rowStartContainer hidden">
            @csrf
            <div class="colCenterContainer">
                <div class="colStartContainer sm:rowStartContainer">
                    <input id="date_transaction"    name="date_transaction"    required type="date" value="{{ date('Y-m-d') }}" max="{{ date('Y-m-d') }}" class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="montant_transaction" name="montant_transaction" required type="number" step="0.01" placeholder="Montant du revenu" min="0" class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="employeur"           name="employeur"           required type="text" placeholder="Nom de l'employeur"                      class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                </div>
                <button id="formButton" class="buttonForm mx-2 min-[500px]:mx-4 my-2">Ajouter</button>
                <div class="w-full tableRowTop"></div>
            </div>
        </form>

        <!-- Bouton pour ajouter un revenues -->
        <button onclick="showForm('Ajouter un revenu', 'Ajouter', '{{ route('salaire.add') }}')" id="button" class="buttonForm mt-8">Ajouter un revenu</a>
    </div>
</section>
@endsection

@section('styles')
<style>
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 200px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
@endsection

@section('scripts')
<script src="{{ asset('js/showForm.js') }}"></script>
<script>
    oldId = 0;
    /* Fonction pour modifier un revenues */
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
