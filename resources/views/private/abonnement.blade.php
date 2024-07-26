<!-- Page d'accueil -->
@extends('layouts.page_template')
@section('title')
    Abonnements
@endsection

@section('content')
<!-- Titre de la page -->
<livewire:page-title :title="'Abonnements'" />

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
            <span class="normalText">Nombre d'abonnement : <span class="normalTextBleuLogo font-bold">{{ $abonnements->count() }}</span></span>
        </div>

        <!-- Nombre d'abonnements actifs -->
        <div class="rowCenterContainer">
            <span class="normalText">Nombre d'abonnements actifs : <span class="normalTextBleuLogo font-bold">{{ $abonnements->where('abonnement_actif', 1)->count() }}</span></span>
        </div>

        <!-- Montant mensuel des abonnements actifs -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant mensuel des abonnements actifs : <span class="normalTextBleuLogo font-bold">{{ number_format($abonnements->where('abonnement_actif', 1)->sum('montant_transaction'), 2, ',', ' ') }} €</span></span>
        </div>

        <!-- Montant mensuel des abonnements inactifs -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant mensuel des abonnements inactifs : <span class="normalTextBleuLogo font-bold">{{ number_format($abonnements->where('abonnement_actif', 0)->sum('montant_transaction'), 2, ',', ' ') }} €</span></span>
        </div>

        <!-- Montant mensuel des abonnements -->
        <div class="rowCenterContainer">
            <span class="normalText">Montant mensuel de tout les abonnements : <span class="normalTextBleuLogo font-bold">{{ number_format($abonnements->sum('montant_transaction'), 2, ',', ' ') }} €</span></span>
        </div>
    </div>

    <!-- Barre de séparation -->
    <livewire:horizontal-separation />

    <!-- Détails des abonnements mois par mois -->
    <div class="colCenterContainer">
        <h2 class="w-full bigTextBleuLogo text-center mb-3">Liste de mes abonnements</h2>
        <table class="w-full mt-2">
            <!-- Entête du tableau -->
            <thead class="w-full">
                <tr class="tableRow smallText text-center font-bold">
                    @php request()->get('order') == 'asc' ? $order = 'desc' : $order = 'asc'; @endphp
                    <th class="tableCell" title="Trier les abonnements par date @if ($order == 'asc') croissante @else décroissante @endif"><a href="{{ URL::current() . '?sort=date_transaction' . '&order=' . $order }}" class="link">Date d'abonnement</a></th>
                    <th class="tableCell" title="Trier les abonnements par nom @if ($order == 'asc') alphabétique @else anti-alphabétique @endif"><a href="{{ URL::current() . '?sort=nom_actif' . '&order=' . $order }}" class="link">Nom de l'abonnement</a></th>
                    <th class="tableCell" title="Trier les abonnements par montant mensuel @if ($order == 'asc') croissant @else décroissant @endif"><a href="{{ URL::current() . '?sort=montant_transaction' . '&order=' . $order }}" class="link">Montant mensuel</a></th>
                    <th class="tableCell" title="Trier les abonnements en affichant d'abord les abonnements @if ($order == 'asc') inactif @else actif @endif"><a href="{{ URL::current() . '?sort=abonnement_actif' . '&order=' . $order }}" class="link">Actif</a></th>
                    <th class="tableCell">Actions</th>
                </tr>
            </thead>

            <!-- Contenue du tableau -->
            <tbody class="w-full normalText">
                @if (isset($abonnements))
                    @foreach ($abonnements as $abonnement)
                        <tr class="tableRow smallText text-center">
                            <!-- Date de souscription de l'abonnement -->
                            @if (str_contains(strtolower(URL::current()), 'date'))
                                <td class="tableCell">{{ strftime('%d %B %Y', strtotime($abonnement->date_transaction)); }}</td>
                            @else
                                @if (str_contains(strtolower(URL::current()), 'nom_actif'))
                                    @if (str_contains(strtolower(URL::current()), 'abonnement_actif'))
                                        <td class="tableCell" title="Afficher les abonnements en"><a href="{{ route('abonnements.date.nom_actif.abonnement_actif', [$abonnement->date_transaction, $abonnement->nom_actif, $abonnement->abonnement_actif]) }}" class="link">{{ strftime('%d %B %Y',strtotime($abonnement->date_transaction)); }}</a></td>
                                    @else
                                        <td class="tableCell" title="Afficher les abonnements en"><a href="{{ route('abonnements.date.nom_actif', [$abonnement->date_transaction, $abonnement->nom_actif]) }}" class="link">{{ strftime('%d %B %Y',strtotime($abonnement->date_transaction)); }}</a></td>
                                    @endif
                                @else
                                    @if (str_contains(strtolower(URL::current()), 'abonnement_actif'))
                                        <td class="tableCell" title="Afficher les abonnements"><a href="{{ route('abonnements.date.abonnement_actif', [$abonnement->date_transaction, $abonnement->abonnement_actif]) }}" class="link">{{ strftime('%d %B %Y',strtotime($abonnement->date_transaction)); }}</a></td>
                                    @else
                                        <td class="tableCell" title="Afficher tout les abonnements souscrit au mois de {{ strftime('%B %Y', strtotime($abonnement->date_transaction)) }}"><a href="{{ route('abonnements.date', [$abonnement->date_transaction]) }}" class="link">{{ strftime('%d %B %Y',strtotime($abonnement->date_transaction)); }}</a></td>
                                    @endif
                                @endif
                            @endif

                            <!-- Nom de l'actif -->
                            <td class="tableCell" title="Afficher l'historique des transaction de {{ $abonnement->nom_actif }}"><a href="{{ route('abonnements_histories.nom_actif', $abonnement->nom_actif) }}" class="link">{{ $abonnement->nom_actif }}</a></td>

                            <!-- Montant investie -->
                            <td class="tableCell" title="Montant mensuel de l'abonnement">{{ number_format($abonnement->montant_transaction, 2, ',', ' ') }} €</td>

                            <!-- Abonnement actif -->
                            @if (str_contains(strtolower(URL::current()), 'abonnement_actif'))
                                <td class="tableCell">
                                    <div class="smallRowCenterContainer">
                                        @if ($abonnement->abonnement_actif)
                                            <svg class="smallSizeIcons fontColorValid" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        @else
                                            <svg class="smallSizeIcons fontColorError" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        @endif
                                    </div>
                                </td>
                            @else
                                @if (str_contains(strtolower(URL::current()), 'date'))
                                    @if (str_contains(strtolower(URL::current()), 'nom_actif'))
                                        <td class="tableCell" title="Afficher les abonnements à {{ $abonnement->nom_actif }} toujours actif et souscrit au mois de {{ strftime('%B %Y', strtotime($abonnement->date_transaction)) }}">
                                            <a href="{{ route('abonnements.date.nom_actif.abonnement_actif', [$abonnement->date_transaction, $abonnement->nom_actif, $abonnement->abonnement_actif]) }}" class="smallRowCenterContainer link">
                                                @if ($abonnement->abonnement_actif)
                                                    <svg class="smallSizeIcons fontColorValid" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                @else
                                                    <svg class="smallSizeIcons fontColorError" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                @endif
                                            </a>
                                        </td>
                                    @else
                                        <td class="tableCell" title="Afficher les abonnements toujours actif souscrit au mois de {{ strftime('%B %Y', strtotime($abonnement->date_transaction)) }}">
                                            <a href="{{ route('abonnements.date.abonnement_actif', [$abonnement->date_transaction, $abonnement->abonnement_actif]) }}" class="smallRowCenterContainer link">
                                                @if ($abonnement->abonnement_actif)
                                                    <svg class="smallSizeIcons fontColorValid" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                @else
                                                    <svg class="smallSizeIcons fontColorError" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                @endif
                                            </a>
                                        </td>
                                    @endif
                                @else
                                    @if (str_contains(strtolower(URL::current()), 'nom_actif'))
                                        <td class="tableCell" title="Afficher les abonnements à {{ $abonnement->nom_actif }} toujours actif">
                                            <a href="{{ route('abonnements.nom_actif.abonnement_actif', [$abonnement->nom_actif, $abonnement->abonnement_actif]) }}" class="smallRowCenterContainer link">
                                                @if ($abonnement->abonnement_actif)
                                                    <svg class="smallSizeIcons fontColorValid" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                @else
                                                    <svg class="smallSizeIcons fontColorError" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                @endif
                                            </a>
                                        </td>
                                    @else
                                        <td class="tableCell">
                                            <a href="{{ route('abonnements.abonnement_actif', $abonnement->abonnement_actif) }}" title="Afficher les abonnements @if ($abonnement->abonnement_actif) actif @else inactif @endif" class="smallRowCenterContainer link @if ($abonnement->abonnement_actif) fontColorValid @else fontColorError @endif">
                                                @if ($abonnement->abonnement_actif)
                                                    <svg class="smallSizeIcons fontColorValid" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                @else
                                                    <svg class="smallSizeIcons fontColorError" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                @endif
                                            </a>
                                        </td>
                                    @endif
                                @endif
                            @endif

                            <!-- Actions -->
                            <td class="smallRowCenterContainer px-1 min-[460px]:px-2 min-[500px]:px-4 py-2">
                                <!-- Modifier -->
                                <button onclick="editAbonnement('{{ strftime('%Y-%m-%d', strtotime($abonnement->date_transaction)) }}', '{{ str_replace('\'', '\\\'', $abonnement->nom_actif) }}', '{{ $abonnement->montant_transaction }}', '{{ $abonnement->abonnement_actif }}', '{{ $abonnement->id }}')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgBleuLogo hover:bgBleuFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tinySizeIcons">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>

                                <!-- Supprimer -->
                                <a href="{{ route('abonnement.remove', $abonnement->id) }}" onclick="return confirm('Êtes-vous sûr de vouloir supprimer l\'abonnement à {{ str_replace('\'', '\\\'', $abonnement->nom_actif) }} du {{ strftime('%A %d %B %Y',strtotime($abonnement->date_transaction)) }} ? Cette action est irréversible.')" class="smallRowCenterContainer w-fit smallTextReverse font-bold bgError hover:bgErrorFonce focus:normalScale rounded-lg min-[500px]:rounded-xl py-1 px-1 min-[500px]:px-2 ml-1 min-[500px]:ml-2">
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

        <!-- Formulaire pour ajouter un abonnement -->
        <form id="form" action="{{ route('abonnement.add') }}" method="POST" class="rowStartContainer hidden">
            @csrf
            <div class="colCenterContainer">
                <div class="colStartContainer lg:rowStartContainer">
                    <input id="date_transaction"    name="date_transaction"    required type="date" value="{{ date('Y-m-d') }}" max="{{ date('Y-m-d') }}"       class="w-[65%] min-[350px]:w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="nom_actif"           name="nom_actif"           required type="text" placeholder="Nom de l'abonnement"                           class="w-[65%] min-[350px]:w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <input id="montant_transaction" name="montant_transaction" required type="number" step="0.01" placeholder="Montant de l'abonnement" min="0" class="w-[65%] min-[350px]:w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                    <div class="w-[65%] min-[350px]:w-[55%] mx-2 min-[500px]:mx-4 my-2 text-center inputForm smallText">
                        <input type="radio" id="abonnement_actif" name="abonnement_actif" value="1" checked class="mr-1">
                        <label for="abonnement_actif" class="mr-2">Actif</label>
                        <input type="radio" id="abonnement_inactif" name="abonnement_actif" value="0" class="mr-1">
                        <label for="abonnement_inactif">Inactif</label>
                    </div>
                </div>
                <button id="formButton" class="buttonForm mx-2 min-[500px]:mx-4 my-2">Ajouter</button>
                <div class="w-full tableRowTop"></div>
            </div>
        </form>

        <!-- Bouton pour ajouter un abonnement -->
        <button onclick="showForm('Ajouter un abonnement', 'Ajouter', '{{ route('abonnement.add') }}')" id="button" class="buttonForm mt-8">Ajouter un abonnement</a>
    </div>
</section>
@endsection

@section('scripts')
<script src="{{ asset('js/showForm.js') }}"></script>
<script>
    oldId = 0;
    /* Fonction pour modifier un abonnement */
    function editAbonnement(date, nom_actif, montant, actif, id) {
        /* Affichage du formulaire */
        hidden = document.getElementById('form').classList.contains('hidden');
        if (hidden || oldId == id) {
            showForm('Ajouter un abonnement', 'Modifier', '{{ route('abonnement.edit') }}');
        } else {
            document.getElementById('formButton').innerText = 'Modifier';
            document.getElementById('form').action = '{{ route('abonnement.edit') }}';
        }

        /* Remplissage du formulaire */
        document.getElementById('date_transaction').value = date;
        document.getElementById('nom_actif').value = nom_actif;
        document.getElementById('montant_transaction').value = montant;
        if (actif == 0) {
            document.getElementById('abonnement_inactif').checked = true;
        } else {
            document.getElementById('abonnement_actif').checked = true;
        }

        if (document.getElementById('id') != null) {
            document.getElementById('id').remove();
        }
        document.getElementById('form').insertAdjacentHTML('beforeend', '<input type="hidden" id="id" name="id" value="' + id + '">');
        document.getElementById('form').scrollIntoView();

        oldId = id;
    }
</script>
@endsection
