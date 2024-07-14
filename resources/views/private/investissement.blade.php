<!-- Page d'accueil -->
@extends('layouts.page_template')
@section('title')
    {{ $type_investissement }}
@endsection

@section('content')
<!-- Titre de la page -->
<livewire:page-title :title="ucfirst($type_investissement)" />

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
        <h2 class="w-full bigTextBleuLogo text-center mb-3">Information générale {{ parse_url(URL::current(), PHP_URL_QUERY) }}</h2>

        <!-- Nombre de d'opérations d'investissement -->
        <div class="rowCenterContainer">
            <span class="normalText">Nombre d'investissement : <span class="normalTextBleuLogo font-bold">{{ $nombreInvestissement }}</span></span>
        </div>

        <!-- Montant total investie -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total investie : <span class="normalTextBleuLogo font-bold">{{ number_format($montantInvesties, 2, ',', ' ') }} €</span></span>
        </div>

        <!-- Montant total des frais -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total des frais de transaction : <span class="normalTextBleuLogo font-bold">{{ number_format($montantFrais, 2, ',', ' ') }} €</span></span>
        </div>

        <!-- Montant total hors frais -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total hors frais de transaction : <span class="normalTextBleuLogo font-bold">{{ number_format($montantInvesties - $montantFrais, 2, ',', ' ') }} €</span></span>
        </div>
    </div>

    <!-- Barre de séparation -->
    <livewire:horizontal-separation />

    <!-- Détails des investissements mois par mois -->
    <div class="colCenterContainer">
        <h2 class="w-full bigTextBleuLogo text-center mb-3">Détails des investissements mois par mois</h2>
        <table class="w-full mt-2">
            <!-- Entête du tableau -->
            <thead class="w-full">
                <tr class="tableRow smallText text-center font-bold">
                    <th class="tableCell">Date du virement</th>
                    <th class="tableCell">Nom de l'actif</th>
                    <th class="tableCell">Montant investie</th>
                    <th class="tableCell">Montant des frais</th>
                    <th class="tableCell">Montant hors frais</th>
                    <th class="tableCell">Actions</th>
                </tr>
            </thead>

            <!-- Contenue du tableau -->
            <tbody class="w-full normalText">
                @if (isset($investissements))
                    @foreach ($investissements as $investissement)
                        <tr class="tableRow smallText text-center">
                            <!-- Date du virement -->
                            @if (str_contains(strtolower(URL::current()), 'investissement/all'))
                                <td class="tableCell" title="{{ strftime('%A %d %B %Y', strtotime($investissement->date_transaction)); }}"><a href="{{ route('investissement.date', ['investissements', $investissement->date_transaction]) }}" class="link">{{ strftime('%d %B %Y', strtotime($investissement->date_transaction)) }}</a></td>
                            @else
                                @if (str_contains(strtolower(URL::current()), 'investissement/details'))
                                    <td class="tableCell" title="{{ strftime('%A %d %B %Y', strtotime($investissement->date_transaction)); }}"><a href="{{ route('detailsInvestissement.date', [$investissement->type_investissement, $investissement->nom_actif, $investissement->date_transaction]) }}" class="link">{{ strftime('%d %B %Y', strtotime($investissement->date_transaction)) }}</a></td>
                                @else
                                    <td class="tableCell" title="{{ strftime('%A %d %B %Y', strtotime($investissement->date_transaction)); }}"><a href="{{ route('investissement.date', [$investissement->type_investissement, $investissement->date_transaction]) }}" class="link">{{ strftime('%d %B %Y', strtotime($investissement->date_transaction)) }}</a></td>
                                @endif
                            @endif

                            <!-- Nom de l'actif -->
                            <td class="tableCell" title="Voir les détails de {{ $investissement->nom_actif }}"><a href="{{ route('detailsInvestissement', [$investissement->type_investissement, $investissement->nom_actif]) }}" class="link">{{ $investissement->nom_actif }}</a></td>

                            <!-- Montant investie -->
                            <td class="tableCell" title="{{ number_format($investissement->montant_transaction, 2, ',', ' ') }} €">{{ number_format($investissement->montant_transaction, 2, ',', ' ') }} €</td>

                            <!-- Montant des frais -->
                            <td class="tableCell" title="{{ number_format($investissement->frais_transaction, 2, ',', ' ') }} €">{{ number_format($investissement->frais_transaction, 2, ',', ' ') }} €</td>

                            <!-- Montant hors frais -->
                            <td class="tableCell" title="{{ number_format(($investissement->montant_transaction - $investissement->frais_transaction), 2, ',', ' ') }} €">{{ number_format(($investissement->montant_transaction - $investissement->frais_transaction), 2, ',', ' ') }} €</td>
                            
                            <!-- Actions -->
                            <td class="smallRowCenterContainer px-1 min-[460px]:px-2 min-[500px]:px-4 py-2">
                                <!-- Modifier -->
                                <button onclick="editInvestissement('{{ strftime('%Y-%m-%d', strtotime($investissement->date_transaction)) }}', '{{ $investissement->nom_actif }}', '{{ $investissement->montant_transaction }}', '{{ $investissement->frais_transaction }}', '{{ $investissement->id }}')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgBleuLogo hover:bgBleuFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tinySizeIcons">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>

                                <!-- Supprimer -->
                                <a href="{{ route('removeInvestissement', $investissement->id) }}" onclick="return confirm('Êtes-vous sûr de vouloir supprimer l\'investissement en {{ $investissement->type_investissement }} du {{ strftime('%A %d %B %Y',strtotime($investissement->date_transaction)) }} ? Cette action est irréversible.')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgError hover:bgErrorFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2 ml-1 min-[500px]:ml-2">
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

        <!-- Formulaire pour ajouter un investissement -->
        <form id="form" action="{{ route('addInvestissement') }}" method="POST" class="rowStartContainer hidden">
            @csrf
            <div class="colCenterContainer">
                <div class="colStartContainer sm:rowStartContainer">
                    <input id="type_investissement" name="type_investissement" required type="hidden" value="{{ $type_investissement }}">
                    <input id="date_transaction"    name="date_transaction"    required type="date" value="{{ date('Y-m-d') }}" max="{{ date('Y-m-d') }}" class="w-[55%] sm:w-4/12 mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="nom_actif"           name="nom_actif"           required type="text" placeholder="Nom de l'actif"                          class="w-[55%] sm:w-4/12 mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="montant_transaction" name="montant_transaction" required type="number" step="0.01" placeholder="Montant investie" min="0"  class="w-[55%] sm:w-4/12 mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="frais_transaction"   name="frais_transaction"   required type="number" step="0.01" placeholder="Montant des frais" min="0" class="w-[55%] sm:w-4/12 mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                </div>
                <button id="formButton" class="buttonForm mx-2 min-[500px]:mx-4 my-2">Ajouter</button>
                <div class="w-full tableRowTop"></div>
            </div>
        </form>

        <!-- Bouton pour ajouter un investissement -->
        <button onclick="showForm('Ajouter un investissement', 'Ajouter', '{{ route('addInvestissement') }}')" id="button" class="buttonForm mt-8">Ajouter un investissement</a>
    </div>
</section>
@endsection

@section('scripts')
<script src="{{ asset('js/showForm.js') }}"></script>
<script>
    oldId = 0;
    /* Fonction pour modifier un investissement */
    function editInvestissement(date, nom_actif, montant, frais, id) {
        /* Affichage du formulaire */
        hidden = document.getElementById('form').classList.contains('hidden');
        if (hidden || oldId == id) {
            showForm('Ajouter un investissement', 'Modifier', '{{ route('editInvestissement') }}');
        } else {
            document.getElementById('formButton').innerText = 'Modifier';
            document.getElementById('form').action = '{{ route('editInvestissement') }}';
        }

        /* Remplissage du formulaire */
        document.getElementById('date_transaction').value = date;
        document.getElementById('nom_actif').value = nom_actif;
        document.getElementById('montant_transaction').value = montant;
        document.getElementById('frais_transaction').value = frais;

        if (document.getElementById('id') != null) {
            document.getElementById('id').remove();
        }
        document.getElementById('form').insertAdjacentHTML('beforeend', '<input type="hidden" id="id" name="id" value="' + id + '">');

        oldId = id;
    }
</script>
@endsection
