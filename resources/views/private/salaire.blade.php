<!-- Page d'accueil -->
@extends('layouts.page_template')
@section('title')
    Salaires
@endsection

@section('content')
<!-- Titre de la page -->
<livewire:page-title :title="'Salaires'" />

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
        <!-- Nombre de salaires reçus -->
        <div class="rowCenterContainer">
            <span class="normalText">Nombre de salaires reçus : <span class="normalTextBleuLogo font-bold">{{ $nombreSalaires }}</span></span>
        </div>
        <!-- Montant total des salaires reçus -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total des salaires reçus : <span class="normalTextBleuLogo font-bold">{{ number_format($montantSalaires, 2, ',', ' ') }} €</span></span>
        </div>
        <!-- Montant total épargné -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total épargné : <span class="normalTextBleuLogo font-bold">{{ number_format($montantEpargne, 2, ',', ' ') }} €</span></span>
        </div>
        <!-- Montant total investie -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total investie : <span class="normalTextBleuLogo font-bold">{{ number_format($montantInvestissement, 2, ',', ' ') }} €</span></span>
        </div>
    </div>

    <!-- Barre de séparation -->
    <livewire:horizontal-separation />

    <!-- Détails des salaires mois par mois -->
    <div class="colCenterContainer">
        <h2 class="w-full bigTextBleuLogo text-center mb-3">Détails des salaires mois par mois</h2>
        <table class="w-full mt-2">
            <!-- Entête du tableau -->
            <thead class="w-full">
                <tr class="tableRow smallText text-center font-bold">
                    <th class="tableCell">Date du virement</th>
                    <th class="tableCell">Montant du salaire</th>
                    <th class="tableCell">Montant épargné</th>
                    <th class="tableCell">Montant investie</th>
                    <th class="tableCell">Dépences possibles</th>
                    <th class="tableCell max-[460px]:hidden">Actions</th>
                </tr>
            </thead>

            <!-- Contenue du tableau -->
            <tbody class="w-full normalText">
                @if (isset($salaires))
                    @foreach ($salaires as $salaire)
                        <tr class="tableRow smallText text-center">
                            <!-- Date du virement -->
                            <td class="tableCell" title="{{ strftime('%A %d %B %Y',strtotime($salaire->date_transaction)); }}">{{ strftime('%d %B %Y',strtotime($salaire->date_transaction)); }}</td>

                            <!-- Montant du salaire -->
                            <td class="tableCell" title="{{ number_format($salaire->montant_transaction, 2, ',', ' ') }} €">{{ number_format($salaire->montant_transaction, 2, ',', ' ') }} €</td>

                            <!-- Montant épargné -->
                            @php $montantEpargne = 0; @endphp
                            @foreach ($epargnes as $epargne)
                                @if (date("m",strtotime($epargne->date_transaction)) == date("m",strtotime($salaire->date_transaction)))
                                    @php $montantEpargne += $epargne->montant_transaction; @endphp
                                @endif
                            @endforeach
                            <td class="tableCell" title="{{ number_format($montantEpargne, 2, ',', ' ') }} €">{{ number_format($montantEpargne, 2, ',', ' ') }} €</td>

                            <!-- Montant investie -->
                            @php $montantInvestissement = 0; @endphp
                            @foreach ($investissements as $investissement)
                                @if (date("m",strtotime($investissement->date_transaction)) == date("m",strtotime($salaire->date_transaction)))
                                    @php $montantInvestissement += $investissement->montant_transaction; @endphp
                                @endif
                            @endforeach
                            <td class="tableCell" title="{{ number_format($montantInvestissement, 2, ',', ' ') }} €">{{ number_format($montantInvestissement, 2, ',', ' ') }} €</td>

                            <!-- Montant des dépences -->
                            @php
                                $montantDepences = $salaire->montant_transaction - $montantEpargne - $montantInvestissement;
                            @endphp
                            <td class="tableCell @if ($montantDepences < 0) fontColorError @endif" title="{{ number_format($montantDepences, 2, ',', ' ') }} €">{{ number_format($montantDepences, 2, ',', ' ') }} €</td>

                            <!-- Actions -->
                            <td class="smallRowCenterContainer px-1 min-[460px]:px-2 min-[500px]:px-4 py-2">
                                <!-- Modifier -->
                                <button onclick="editSalaire('{{ strftime('%Y-%m-%d', strtotime($salaire->date_transaction)) }}', {{ $salaire->montant_transaction }}, {{ $salaire->id }})" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgBleuLogo hover:bgBleuFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tinySizeIcons">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>

                                <!-- Supprimer -->
                                <a href="{{ route('removeSalaire', $salaire->id) }}" onclick="return confirm('Êtes-vous sûr de vouloir supprimer le salaire du {{ strftime('%A %d %B %Y',strtotime($salaire->date_transaction)) }} ? Cette action est irréversible.')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgError hover:bgErrorFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2 ml-1 min-[500px]:ml-2">
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
        <form id="form" action="{{ route('addSalaire') }}" method="POST" class="rowStartContainer hidden">
            @csrf
            <div class="colCenterContainer">
                <div class="colStartContainer min-[450px]:rowStartContainer">
                    <input id="date_transaction"    name="date_transaction"    required type="date" value="{{ date('Y-m-d') }}" max="{{ date('Y-m-d') }}" class="w-[55%] min-[450px]:w-[28%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="montant_transaction" name="montant_transaction" required type="number" step="0.01" placeholder="Montant du salaire" min="0" class="w-[55%] min-[450px]:w-[28%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <button id="formButton" class="buttonForm mx-2 min-[500px]:mx-4 my-2">Ajouter</button>
                </div>
                <div class="w-full tableRowTop"></div>
            </div>
        </form>

        <!-- Bouton pour ajouter un salaire -->
        <button onclick="showForm('Ajouter un salaire', 'Ajouter', '{{ route('addSalaire') }}')" id="button" class="buttonForm mt-8">Ajouter un salaire</a>
    </div>
</section>
@endsection

@section('scripts')
<script src="{{ asset('js/showForm.js') }}"></script>
<script>
    oldId = 0;
    /* Fonction pour modifier un salaire */
    function editSalaire(date, montant, id) {
        /* Affichage du formulaire */
        hidden = document.getElementById('form').classList.contains('hidden');
        if (hidden || oldId == id) {
            showForm('Ajouter un salaire', 'Modifier', '{{ route('editSalaire') }}');
        } else {
            document.getElementById('formButton').innerText = 'Modifier';
            document.getElementById('form').action = '{{ route('editSalaire') }}';
        }

        /* Remplissage du formulaire */
        document.getElementById('date_transaction').value = date;
        document.getElementById('montant_transaction').value = montant;

        if (document.getElementById('id') != null) {
            document.getElementById('id').remove();
        }
        document.getElementById('form').insertAdjacentHTML('beforeend', '<input type="hidden" id="id" name="id" value="' + id + '">');

        oldId = id;
    }
</script>
@endsection
