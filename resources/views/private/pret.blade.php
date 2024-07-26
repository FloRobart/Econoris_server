<!-- Page d'accueil -->
@extends('layouts.page_template')
@section('title')
    Prêts
@endsection

@section('content')
<!-- Titre de la page -->
<livewire:page-title :title="'Prêts'" />

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
        <!-- Nombre de prêts reçus -->
        <div class="rowCenterContainer">
            <span class="normalText">Nombre de prêts effectué : <span class="normalTextBleuLogo font-bold">{{ $prets->count() }}</span></span>
        </div>

        <!-- Montant total des prêts reçus -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total des prêts : <span class="normalTextBleuLogo font-bold">{{ number_format($prets->sum('montant_pret'), 2, ',', ' ') }} €</span></span>
        </div>

        <!-- Montant total des prêts remboursés -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total des prêts remboursés : <span class="normalTextBleuLogo font-bold">{{ number_format($prets->sum('montant_rembourse'), 2, ',', ' ') }} €</span></span>
        </div>

        <!-- Montant total des prêts non remboursés -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant total des prêts non remboursés : <span class="normalTextBleuLogo font-bold">{{ number_format($prets->sum('montant_pret') - $prets->sum('montant_rembourse'), 2, ',', ' ') }} €</span></span>
        </div>
    </div>

    <!-- Barre de séparation -->
    <livewire:horizontal-separation />

    <!-- Détails des prêts mois par mois -->
    <div class="colCenterContainer">
        <h2 class="w-full bigTextBleuLogo text-center mb-3">Détails des prêts</h2>
        <table class="w-full mt-2">
            <!-- Entête du tableau -->
            <thead class="w-full">
                <tr class="tableRow smallText text-center font-bold">
                    @php request()->get('order') == 'asc' ? $order = 'desc' : $order = 'asc'; @endphp
                    <th class="tableCell" title="Trier les prêts par date @if ($order == 'asc') croissante @else décroissante @endif"><a href="{{ URL::current() . '?sort=date_transaction' . '&order=' . $order }}" class="link">Date du prêt</a></th>
                    <th class="tableCell" title="Trier les prêts par nom"><a href="{{ URL::current() . '?sort=nom_emprunteur' . '&order=' . $order }}" class="link">Nom de l'emprunteur</a></th>
                    <th class="tableCell" title="Trier les prêts par montant prêté @if ($order == 'asc') croissant @else décroissant @endif"><a href="{{ URL::current() . '?sort=montant_pret' . '&order=' . $order }}" class="link">Montant prêté</a></th>
                    <th class="tableCell" title="Trier les prêts par montant remboursé @if ($order == 'asc') croissant @else décroissant @endif"><a href="{{ URL::current() . '?sort=montant_rembourse' . '&order=' . $order }}" class="link">Montant remboursé</a></th>
                    <th class="tableCell max-sm:hidden" title="Trier les prêts par raison_pret"><a href="{{ URL::current() . '?sort=raison_pret' . '&order=' . $order }}" class="link">Raison du prêt</a></th>
                    <th class="tableCell">Actions</th>
                </tr>
            </thead>

            <!-- Contenue du tableau -->
            <tbody class="w-full normalText">
                @if (isset($prets))
                    @foreach ($prets as $pret)
                        <tr class="tableRow smallText text-center">
                            <!-- Date du virement -->
                            <td class="tableCell" title="Afficher les prêts du mois de {{ strftime('%B %Y', strtotime($pret->date_transaction)) }}"><a href="@if (str_contains(strtolower(URL::current()), 'nom_emprunteur')) {{ route('prets.date.nom_emprunteur', [$pret->date_transaction, $pret->nom_emprunteur]) }}  @else {{ route('prets.date', [$pret->date_transaction]) }}  @endif" class="link">{{ strftime('%d %B %Y',strtotime($pret->date_transaction)); }}</a></td>
                            
                            <!-- Nom de l'emprunteur -->
                            <td class="tableCell" title="Afficher les prêts à {{ $pret->nom_emprunteur }}"><a href="@if (str_contains(strtolower(URL::current()), 'date')) {{ route('prets.date.nom_emprunteur', [$pret->date_transaction, $pret->nom_emprunteur]) }}  @else {{ route('prets.nom_emprunteur', [$pret->nom_emprunteur]) }}  @endif" class="link">{{ $pret->nom_emprunteur }}</a></td>

                            <!-- Montant prêté -->
                            <td class="tableCell">{{ number_format($pret->montant_pret, 2, ',', ' ') }} €</td>

                            <!-- Montant remboursé -->
                            <td class="tableCell">{{ number_format($pret->montant_rembourse, 2, ',', ' ') }} €</td>

                            <!-- Raison du prêt -->
                            <td class="tableCell max-sm:hidden">{{ $pret->raison_pret }}</td>

                            <!-- Actions -->
                            <td class="smallRowCenterContainer px-1 min-[460px]:px-2 min-[500px]:px-4 py-2">
                                <!-- Modifier -->
                                <button onclick="editPret('{{ strftime('%Y-%m-%d', strtotime($pret->date_transaction)) }}', '{{ str_replace('\'', '\\\'', $pret->nom_emprunteur) }}', '{{ $pret->montant_pret }}', '{{ $pret->montant_rembourse }}', '{{ str_replace('\'', '\\\'', $pret->raison_pret) }}', '{{ $pret->id }}')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgBleuLogo hover:bgBleuFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tinySizeIcons">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>

                                <!-- Supprimer -->
                                <a href="{{ route('pret.remove', $pret->id) }}" onclick="return confirm('Êtes-vous sûr de vouloir supprimer le prêt à {{ str_replace('\'', '\\\'', $pret->nom_emprunteur) }} du {{ strftime('%A %d %B %Y',strtotime($pret->date_transaction)) }} ? Cette action est irréversible.')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgError hover:bgErrorFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2 ml-1 min-[500px]:ml-2">
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

        <!-- Formulaire pour ajouter un prêt -->
        <form id="form" action="{{ route('pret.add') }}" method="POST" class="rowStartContainer hidden">
            @csrf
            <div class="colCenterContainer">
                <div class="colStartContainer md:rowStartContainer">
                    <input id="date_transaction"  name="date_transaction"  required type="date" value="{{ date('Y-m-d') }}" max="{{ date('Y-m-d') }}"   class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="nom_emprunteur"    name="nom_emprunteur"    required type="text"                       placeholder="Nom de l'emprunteur" class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="montant_pret"      name="montant_pret"      required type="number" step="0.01" min="0" placeholder="Montant du prêt"     class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="montant_rembourse" name="montant_rembourse" required type="number" step="0.01" min="0" placeholder="Montant remboursé"   class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="raison_pret"       name="raison_pret"       required type="text"                       placeholder="Raison du prêt"      class="w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                </div>
                <button id="formButton" class="buttonForm mx-2 min-[500px]:mx-4 my-2">Ajouter</button>
                <div class="w-full tableRowTop"></div>
            </div>
        </form>

        <!-- Bouton pour ajouter un prêt -->
        <button onclick="showForm('Ajouter un prêt', 'Ajouter', '{{ route('pret.add') }}')" id="button" class="buttonForm mt-8">Ajouter un prêt</a>
    </div>
</section>
@endsection

@section('scripts')
<script src="{{ asset('js/showForm.js') }}"></script>
<script>
    oldId = 0;
    /* Fonction pour modifier un prêt */
    function editPret(date_transaction, nom_emprunteur, montant_pret, montant_rembourse, raison_pret, id) {
        /* Affichage du formulaire */
        hidden = document.getElementById('form').classList.contains('hidden');
        if (hidden || oldId == id) {
            showForm('Ajouter un prêt', 'Modifier', '{{ route('pret.edit') }}');
        } else {
            document.getElementById('formButton').innerText = 'Modifier';
            document.getElementById('form').action = '{{ route('pret.edit') }}';
        }

        /* Remplissage du formulaire */
        document.getElementById('date_transaction').value = date_transaction;
        document.getElementById('nom_emprunteur').value = nom_emprunteur;
        document.getElementById('montant_pret').value = montant_pret;
        document.getElementById('montant_rembourse').value = montant_rembourse;
        document.getElementById('raison_pret').value = raison_pret;

        if (document.getElementById('id') != null) {
            document.getElementById('id').remove();
        }
        document.getElementById('form').insertAdjacentHTML('beforeend', '<input type="hidden" id="id" name="id" value="' + id + '">');
        document.getElementById('form').scrollIntoView();

        oldId = id;
    }
</script>
@endsection
