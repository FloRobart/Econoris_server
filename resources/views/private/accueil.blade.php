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
<section class="colCenterContainer gap-y-10 bgPage mb-[21rem] min-[400px]:mb-68 md:mb-[30rem] lg:mb-[21rem] xl:mb-52">
    <a href="{{ route('salaires') }}" class="buttonForm">Salaires</a>
    <a href="{{ route('epargnes') }}" class="buttonForm">Épargnes</a>

    <h1 class="titleText">Investissements</h1>
    <a href="{{ route('investissements') }}" class="buttonForm">Tous les investissements</a>
    <a href="{{ route('investissements.type', 'crypto') }}" class="buttonForm">Crypto-monnaies</a>
    <a href="{{ route('investissements.type', 'bourse') }}" class="buttonForm">Bourse</a>
    <a href="{{ route('investissements.type', 'immobilier') }}" class="buttonForm">Immobilier</a>
</section>
@endsection
