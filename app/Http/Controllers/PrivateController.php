<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Salaire;
use App\Models\Epargne;
use App\Models\Investissement;
use App\Models\Abonnement;
use App\Models\Abonnement_history;
use App\Models\Emprunt;
use App\Models\Emprunt_history;
use App\Models\Depense;
use App\Models\Pret;


class PrivateController extends Controller
{
    /*=========*/
    /* Accueil */
    /*=========*/
    /**
     * Affiche la page d'accueil
     */
    public function accueil()
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Récupération des différents type d'investissements */
        $investissements = Investissement::select('type_investissement')->distinct()->get();

        return view('private.accueil', compact('investissements'));
    }




    /*===========*/
    /* Dashboard */
    /*===========*/
    /*----------*/
    /* Salaires */
    /*----------*/
    /* Affichage des salaires */
    /**
     * Affiche la page des salaires
     */
    public function salaires(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        /* Récupération des salaires */
        $salaires = PrivateController::getSalaires('', '', $sort, $order);
        
        /* Récupération des épargnes */
        $epargnes = PrivateController::getEpargnes('', '', '', $sort);
        
        /* Récupération des investissements */
        $investissements = PrivateController::getInvestissements('', '', '', $sort);

        /* Récupération de l'historique des abonnements */
        $abonnementsHistories = PrivateController::getAbonnementsHistories('', '', '', $sort);

        /* Récupération de l'historique des emprunts */
        $empruntsHistories = PrivateController::getEmpruntsHistories('', '', $sort);

        /* Récupération du montant total emprunté */
        $totalEmprunte = Emprunt::where('user_id', auth()->user()->id)->sum('montant_transaction');

        /* Récupération des dépenses */
        $depenses = PrivateController::getDepenses('', '', $sort);

        return view('private.salaire', compact('salaires', 'epargnes', 'investissements', 'abonnementsHistories', 'empruntsHistories', 'totalEmprunte', 'depenses'));
    }

    /**
     * Affiche les salaires d'un même mois
     */
    public function salairesDate(Request $request, string $date)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        /* Récupération des salaires du mois */
        $salaires = PrivateController::getSalaires($date, '', $sort, $order);

        /* Récupération des épargnes du mois */
        $epargnes = PrivateController::getEpargnes($date, '', '', $sort);
        
        /* Récupération des investissements du mois */
        $investissements = PrivateController::getInvestissements($date, '', '', $sort);

        /* Récupération de l'historique des abonnements */
        $abonnementsHistories = PrivateController::getAbonnementsHistories('', '', '', $sort);

        /* Récupération de l'historique des emprunts */
        $empruntsHistories = PrivateController::getEmpruntsHistories('', '', $sort);

        /* Récupération du montant total emprunté */
        $totalEmprunte = Emprunt::where('user_id', auth()->user()->id)->sum('montant_transaction');

        /* Récupération des dépenses */
        $depenses = PrivateController::getDepenses('', '', $sort);

        return view('private.salaire', compact('salaires', 'epargnes', 'investissements', 'abonnementsHistories', 'empruntsHistories', 'totalEmprunte', 'depenses'));
    }

    /**
     * Affiche les salaires d'un même employeur
     */
    public function salairesEmployeur(Request $request, string $employeur)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        /* Récupération des salaires du mois */
        $salaires = PrivateController::getSalaires('', $employeur, $sort, $order);

        /* Récupération des épargnes du mois */
        $epargnes = PrivateController::getEpargnes('', '', '', $sort);
        
        /* Récupération des investissements du mois */
        $investissements = PrivateController::getInvestissements('', '', '', $sort);

        /* Récupération de l'historique des abonnements */
        $abonnementsHistories = PrivateController::getAbonnementsHistories('', '', '', $sort);

        /* Récupération de l'historique des emprunts */
        $empruntsHistories = PrivateController::getEmpruntsHistories('', '', $sort);

        /* Récupération du montant total emprunté */
        $totalEmprunte = Emprunt::where('user_id', auth()->user()->id)->sum('montant_transaction');

        /* Récupération des dépenses */
        $depenses = PrivateController::getDepenses('', '', $sort);

        return view('private.salaire', compact('salaires', 'epargnes', 'investissements', 'abonnementsHistories', 'empruntsHistories', 'totalEmprunte', 'depenses'));
    }

    /**
     * Affiche les salaires d'un même mois et d'un même employeur
     */
    public function salairesDateEmployeur(Request $request, string $date, string $employeur)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        /* Récupération des salaires du mois */
        $salaires = PrivateController::getSalaires($date, $employeur, $sort, $order);

        /* Récupération des épargnes du mois */
        $epargnes = PrivateController::getEpargnes($date, '', '', $sort);
        
        /* Récupération des investissements du mois */
        $investissements = PrivateController::getInvestissements($date, '', '', $sort);

        /* Récupération de l'historique des abonnements */
        $abonnementsHistories = PrivateController::getAbonnementsHistories('', '', '', $sort);

        /* Récupération de l'historique des emprunts */
        $empruntsHistories = PrivateController::getEmpruntsHistories('', '', $sort);

        /* Récupération du montant total emprunté */
        $totalEmprunte = Emprunt::where('user_id', auth()->user()->id)->sum('montant_transaction');

        /* Récupération des dépenses */
        $depenses = PrivateController::getDepenses('', '', $sort);

        return view('private.salaire', compact('salaires', 'epargnes', 'investissements', 'abonnementsHistories', 'empruntsHistories', 'totalEmprunte', 'depenses'));
    }


    /* Édition des salaires */
    /**
     * Ajoute un salaire
     */
    public function addSalaire(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        $request->validate([
            'date_transaction' => 'required|date|before:tomorrow',
            'montant_transaction' => 'required|numeric|min:0',
            'employeur' => 'required|string|max:255'
        ], [
            'date_transaction.required' => 'La date est obligatoire.',
            'date_transaction.date' => 'La date doit être une date.',
            'date_transaction.before' => 'La date doit être antérieure à la date du jour.',
            'montant_transaction.required' => 'Le montant est obligatoire.',
            'montant_transaction.numeric' => 'Le montant doit être un nombre.',
            'montant_transaction.min' => 'Le montant doit être supérieur ou égal à 0.',
            'employeur.required' => 'L\'employeur est obligatoire.',
            'employeur.string' => 'L\'employeur doit être une chaîne de caractères.',
            'employeur.max' => 'L\'employeur ne doit pas dépasser 255 caractères.'
        ]);

        /* Message de confirmation */
        if (Salaire::where('date_transaction', $request->date_transaction)->first()) {
            $message = 'Attention, un salaire a déjà été ajouté pour cette date. 🤔';
        } else {
            $message = '';
        }

        /* Ajout du salaire */
        $salaire = new Salaire();
        $salaire->user_id = auth()->user()->id;
        $salaire->date_transaction = $request->date_transaction;
        $salaire->montant_transaction = $request->montant_transaction;
        $salaire->employeur = ucfirst($request->employeur);
        
        if ($salaire->save()) {
            return back()->with('success', 'Le salaire a bien été ajouté 👍.')->with('message', $message);
        } else {
            return back()->with('error', 'Une erreur est survenue lors de l\'ajout du salaire ❌.');
        }
    }

    /**
     * Modifie un salaire
     */
    public function editSalaire(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        $request->validate([
            'id' => 'required|numeric|min:1|exists:finance_dashboard.salaires,id',
            'date_transaction' => 'required|date|before:tomorrow',
            'montant_transaction' => 'required|numeric|min:0',
            'employeur' => 'required|string|max:255'
        ], [
            'id.required' => 'L\'id est obligatoire.',
            'id.numeric' => 'L\'id doit être un nombre.',
            'id.min' => 'L\'id doit être supérieur ou égal à 1.',
            'id.exists' => 'L\'id n\'existe pas.',
            'date_transaction.required' => 'La date est obligatoire.',
            'date_transaction.date' => 'La date doit être une date.',
            'date_transaction.before' => 'La date doit être antérieure à la date du jour.',
            'montant_transaction.required' => 'Le montant est obligatoire.',
            'montant_transaction.numeric' => 'Le montant doit être un nombre.',
            'montant_transaction.min' => 'Le montant doit être supérieur ou égal à 0.',
            'employeur.required' => 'L\'employeur est obligatoire.',
            'employeur.string' => 'L\'employeur doit être une chaîne de caractères.',
            'employeur.max' => 'L\'employeur ne doit pas dépasser 255 caractères.'
        ]);

        /* Message de confirmation */
        if (Salaire::where('date_transaction', $request->date_transaction)->first()) {
            $message = 'Attention, un salaire similaire a déjà été ajouté pour cette date. 🤔';
        } else {
            $message = '';
        }

        /* Modification du salaire */
        $salaire = Salaire::find($request->id);
        if ($salaire->user_id != auth()->user()->id) { back()->with('error', 'Le salaire ne vous appartient pas ❌.'); }

        $salaire->date_transaction = $request->date_transaction;
        $salaire->montant_transaction = $request->montant_transaction;
        $salaire->employeur = ucfirst($request->employeur);

        if ($salaire->save()) {
            return back()->with('success', 'Le salaire a bien été modifié 👍.')->with('message', $message);
        } else {
            return back()->with('error', 'Une erreur est sur venue lors de la modification du salaire ❌.');
        }
    }

    /**
     * Supprime un salaire
     */
    public function removeSalaire(string $id)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        if ($id == null) { back()->with('error', 'l\'id est null ❌.'); }
        if (!is_numeric($id)) { back()->with('error', 'l\'id n\'est pas un nombre ❌.'); }
        if ($id <= 0) { back()->with('error', 'l\'id est inférieur ou égal à 0 ❌.'); }

        $salaire = Salaire::find($id);
        if (!$salaire) { back()->with('error', 'Le salaire n\'existe pas ❌.'); }
        if ($salaire->user_id != auth()->user()->id) { back()->with('error', 'Le salaire ne vous appartient pas ❌.'); }

        /* Suppression du salaire */
        if ($salaire->delete()) {
            return back()->with('success', 'Le salaire a bien été supprimé 👍.');
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la suppression du salaire ❌.');
        }
    }




    /*----------*/
    /* Épargnes */
    /*----------*/
    /* Affichage des épargnes */
    /**
     * Affiche la page des épargnes
     */
    public function epargnes(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $epargnes = PrivateController::getEpargnes('', '', '', $sort, $order);
        return view('private.epargne', compact('epargnes'));
    }

    /**
     * Affiche les épargnes d'un même mois
     */
    public function epargnesDate(Request $request, string $date)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $epargnes = PrivateController::getEpargnes($date, '', '', $sort, $order);
        return view('private.epargne', compact('epargnes'));
    }

    /**
     * Affiche les épargnes d'une même banque
     */
    public function epargnesBanque(Request $request, string $banque)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $epargnes = PrivateController::getEpargnes('', $banque, '', $sort, $order);
        return view('private.epargne', compact('epargnes'));
    }

    /**
     * Affiche les épargnes d'un même compte
     */
    public function epargnesCompte(Request $request, string $compte)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $epargnes = PrivateController::getEpargnes('', '', $compte, $sort, $order);
        return view('private.epargne', compact('epargnes'));
    }

    /**
     * Affiche les épargnes d'un même mois et d'une même banque
     */
    public function epargnesDateBanque(Request $request, string $date, string $banque)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $epargnes = PrivateController::getEpargnes($date, $banque, '', $sort, $order);
        return view('private.epargne', compact('epargnes'));
    }

    /**
     * Affiche les épargnes d'une même date et d'un même compte
     */
    public function epargnesDateCompte(Request $request, string $date, string $compte)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $epargnes = PrivateController::getEpargnes($date, '', $compte, $sort, $order);
        return view('private.epargne', compact('epargnes'));
    }

    /**
     * Affiche les épargnes d'une même banque et d'un même compte
     */
    public function epargnesBanqueCompte(Request $request, string $banque, string $compte)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $epargnes = PrivateController::getEpargnes('', $banque, $compte, $sort, $order);
        return view('private.epargne', compact('epargnes'));
    }

    /**
     * Récupère les épargnes d'une même date, d'une même banque et d'un même compte
     */
    public function epargnesDateBanqueCompte(Request $request, string $date, string $banque, string $compte)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $epargnes = PrivateController::getEpargnes($date, $banque, $compte, $sort, $order);
        return view('private.epargne', compact('epargnes'));
    }


    /* Édition des épargnes */
    /**
     * Ajoute une épargne
     */
    public function addEpargne(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        $request->validate([
            'date_transaction' => 'required|date|before:tomorrow',
            'montant_transaction' => 'required|numeric|min:0',
            'banque' => 'required|string|max:255',
            'compte' => 'required|string|max:255'
        ], [
            'date_transaction.required' => 'La date est obligatoire.',
            'date_transaction.date' => 'La date doit être une date.',
            'date_transaction.before' => 'La date doit être antérieure à la date du jour.',
            'montant_transaction.required' => 'Le montant est obligatoire.',
            'montant_transaction.numeric' => 'Le montant doit être un nombre.',
            'montant_transaction.min' => 'Le montant doit être supérieur ou égal à 0.',
            'banque.required' => 'La banque est obligatoire.',
            'banque.string' => 'La banque doit être une chaîne de caractères.',
            'banque.max' => 'La banque ne doit pas dépasser 255 caractères.',
            'compte.required' => 'Le compte est obligatoire.',
            'compte.string' => 'Le compte doit être une chaîne de caractères.',
            'compte.max' => 'Le compte ne doit pas dépasser 255 caractères.'
        ]);

        /* Message de confirmation */
        if (Epargne::where('date_transaction', $request->date_transaction)->where('montant_transaction', $request->montant_transaction)->where('banque', $request->banque)->where('compte', $request->compte)->first()) {
            $message = 'Attention, une épargne similaire a déjà été ajoutée pour cette date. 🤔';
        } else {
            $message = '';
        }

        /* Ajout de l'épargne */
        $epargne = new Epargne();
        $epargne->user_id = auth()->user()->id;
        $epargne->date_transaction = $request->date_transaction;
        $epargne->montant_transaction = $request->montant_transaction;
        $epargne->banque = ucfirst($request->banque);
        $epargne->compte = ucfirst($request->compte);
        
        if ($epargne->save()) {
            return back()->with('success', 'L\'épargne a bien été ajoutée 👍.')->with('message', $message);
        } else {
            return back()->with('error', 'Une erreur est survenue lors de l\'ajout de l\'épargne ❌.');
        }
    }

    /**
     * Modifie une épargne
     */
    public function editEpargne(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        $request->validate([
            'id' => 'required|numeric|min:1|exists:finance_dashboard.epargnes,id',
            'date_transaction' => 'required|date|before:tomorrow',
            'montant_transaction' => 'required|numeric|min:0',
            'banque' => 'required|string|max:255',
            'compte' => 'required|string|max:255'
        ], [
            'id.required' => 'L\'id est obligatoire.',
            'id.numeric' => 'L\'id doit être un nombre.',
            'id.min' => 'L\'id doit être supérieur ou égal à 1.',
            'id.exists' => 'L\'id n\'existe pas.',
            'date_transaction.required' => 'La date est obligatoire.',
            'date_transaction.date' => 'La date doit être une date.',
            'date_transaction.before' => 'La date doit être antérieure à la date du jour.',
            'montant_transaction.required' => 'Le montant est obligatoire.',
            'montant_transaction.numeric' => 'Le montant doit être un nombre.',
            'montant_transaction.min' => 'Le montant doit être supérieur ou égal à 0.',
            'banque.required' => 'La banque est obligatoire.',
            'banque.string' => 'La banque doit être une chaîne de caractères.',
            'banque.max' => 'La banque ne doit pas dépasser 255 caractères.',
            'compte.required' => 'Le compte est obligatoire.',
            'compte.string' => 'Le compte doit être une chaîne de caractères.',
            'compte.max' => 'Le compte ne doit pas dépasser 255 caractères.'
        ]);

        /* Message de confirmation */
        if (Epargne::where('date_transaction', $request->date_transaction)->where('montant_transaction', $request->montant_transaction)->where('banque', $request->banque)->where('compte', $request->compte)->first()) {
            $message = 'Attention, une épargne similaire a déjà été ajoutée pour cette date. 🤔';
        } else {
            $message = '';
        }

        /* Modification de l'épargne */
        $epargne = Epargne::find($request->id);
        if ($epargne->user_id != auth()->user()->id) { back()->with('error', 'L\'épargne ne vous appartient pas ❌.'); }

        $epargne->date_transaction = $request->date_transaction;
        $epargne->montant_transaction = $request->montant_transaction;
        $epargne->banque = ucfirst($request->banque);
        $epargne->compte = ucfirst($request->compte);

        if ($epargne->save()) {
            return back()->with('success', 'L\'épargne a bien été modifiée 👍.')->with('message', $message);
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la modification de l\'épargne ❌.');
        }
    }

    /**
     * Supprime une épargne
     */
    public function removeEpargne(string $id)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        if ($id == null) { back()->with('error', 'l\'id est null ❌.'); }
        if (!is_numeric($id)) { back()->with('error', 'l\'id n\'est pas un nombre ❌.'); }
        if ($id <= 0) { back()->with('error', 'l\'id est inférieur ou égal à 0 ❌.'); }

        $epargne = Epargne::find($id);
        if (!$epargne) { back()->with('error', 'L\'épargne n\'existe pas ❌.'); }
        if ($epargne->user_id != auth()->user()->id) { back()->with('error', 'L\'épargne ne vous appartient pas ❌.'); }

        /* Suppression de l'épargne */
        if ($epargne->delete()) {
            return back()->with('success', 'L\'épargne a bien été supprimée 👍.');
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la suppression de l\'épargne ❌.');
        }
    }



    /*-----------------*/
    /* Investissements */
    /*-----------------*/
    /* Affichage des investissements */
    /**
     * Affiche tous les investissements
     */
    public function investissements(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        /* Récupération des investissements */
        $type_investissement  = 'investissements';
        $investissements      = PrivateController::getInvestissements('', '', '', $sort, $order);

        return view('private.investissement', compact('investissements', 'type_investissement'));
    }

    public function investissementsDate(Request $request, string $date)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $type_investissement  = 'investissements';
        $investissements      = PrivateController::getInvestissements($date, '', '', $sort, $order);

        return view('private.investissement', compact('investissements', 'type_investissement'));
    }

    /**
     * Affiche tous les investissements d'un même type
     */
    public function investissementsType(Request $request, string $type)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        if ($type == 'investissements')
        {
            $type_investissement  = 'investissements';
            $investissements      = PrivateController::getInvestissements('', '', '', $sort, $order);
        }
        else
        {
            $type_investissement  = $type;
            $investissements      = PrivateController::getInvestissements('', $type_investissement, '', $sort, $order);
        }

        return view('private.investissement', compact('investissements', 'type_investissement'));
    }

    /**
     * Affiche tous les investissements d'un même nom d'actif
     */
    public function investissementsNom(Request $request, string $nom_actif)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $type_investissement  = 'investissements';
        $investissements      = PrivateController::getInvestissements('', '', $nom_actif, $sort, $order);

        return view('private.investissement', compact('investissements', 'type_investissement'));
    }

    /**
     * Affiche les investissements d'une même date et d'un même type
     */
    public function investissementsDateType(Request $request, string $date, string $type)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        if ($type == 'investissements')
        {
            $type_investissement  = 'investissements';
            $investissements      = PrivateController::getInvestissements($date, '', '', $sort, $order);
        }
        else
        {
            $type_investissement  = $type;
            $investissements      = PrivateController::getInvestissements($date, $type_investissement, '', $sort, $order);
        }

        return view('private.investissement', compact('investissements', 'type_investissement'));
    }

    /**
     * Affiche les investissements d'une même date et d'un même nom d'actif
     */
    public function investissementsDateNom(Request $request, string $date, string $nom_actif)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $type_investissement  = 'investissements';
        $investissements      = PrivateController::getInvestissements($date, '', $nom_actif, $sort, $order);

        return view('private.investissement', compact('investissements', 'type_investissement'));
    }

    /**
     * Affiche les investissements d'un même type et d'un même nom d'actif
     */
    public function investissementsTypeNom(Request $request, string $type, string $nom_actif)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        if ($type == 'investissements')
        {
            $type_investissement  = 'investissements';
            $investissements      = PrivateController::getInvestissements('', '', $nom_actif, $sort, $order);
        }
        else
        {
            $type_investissement  = $type;
            $investissements      = PrivateController::getInvestissements('', $type_investissement, $nom_actif, $sort, $order);
        }

        return view('private.investissement', compact('investissements', 'type_investissement'));
    }

    /**
     * Affiche les détails d'un investissement d'un même mois et d'un même type
     */
    public function investissementsDateTypeNom(Request $request, string $date, string $type, string $nom_actif)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $type_investissement  = $type;
        $investissements = PrivateController::getInvestissements($date, $type_investissement, $nom_actif, $sort, $order);

        return view('private.investissement', compact('investissements', 'type_investissement'));
    }


    /* Édition des investissements */
    /**
     * Ajoute un investissement
     */
    public function addInvestissement(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        $request->validate([
            'date_transaction' => 'required|date|before:tomorrow',
            'type_investissement' => 'required|string|max:255',
            'nom_actif' => 'required|string|max:255',
            'montant_transaction' => 'required|numeric|min:0',
            'frais_transaction' => 'required|numeric|min:0',
        ], [
            'date_transaction.required' => 'La date est obligatoire.',
            'date_transaction.date' => 'La date doit être une date.',
            'date_transaction.before' => 'La date doit être antérieure à la date du jour.',
            'type_investissement.required' => 'Le type d\'investissement est obligatoire.',
            'type_investissement.string' => 'Le type d\'investissement doit être une chaîne de caractères.',
            'type_investissement.max' => 'Le type d\'investissement ne doit pas dépasser 255 caractères.',
            'nom_actif.required' => 'Le nom de l\'actif est obligatoire.',
            'nom_actif.string' => 'Le nom de l\'actif doit être une chaîne de caractères.',
            'nom_actif.max' => 'Le nom de l\'actif ne doit pas dépasser 255 caractères.',
            'montant_transaction.required' => 'Le montant est obligatoire.',
            'montant_transaction.numeric' => 'Le montant doit être un nombre.',
            'montant_transaction.min' => 'Le montant doit être supérieur ou égal à 0.',
            'frais_transaction.required' => 'Les frais sont obligatoires.',
            'frais_transaction.numeric' => 'Les frais doivent être un nombre.',
            'frais_transaction.min' => 'Les frais doivent être supérieurs ou égaux à 0.'
        ]);

        /* Message de confirmation */
        if (Investissement::where('date_transaction', $request->date_transaction)->where('type_investissement', $request->type_investissement)->where('nom_actif', $request->nom_actif)->where('montant_transaction', $request->montant_transaction)->where('frais_transaction', $request->frais_transaction)->first()) {
            $message = 'Attention, un investissement en ' . $request->type_investissement . ' similaire a déjà été ajouté pour cette date. 🤔';
        } else {
            $message = '';
        }

        /* Vérification du type d'investissement */
        $type_investissement = $request->type_investissement;
        if ($type_investissement == 'investissements')
        {
            /* Récupération d'un investissement avec le même nom d'actif */
            $investissement = Investissement::where('nom_actif', $request->nom_actif)->first();
            $type_investissement = $investissement->type_investissement ?? 'crypto';
        }
        

        /* Ajout de l'investissement */
        $investissement = new Investissement();
        $investissement->user_id             = auth()->user()->id;
        $investissement->date_transaction    = $request->date_transaction;
        $investissement->type_investissement = ucfirst($type_investissement);
        $investissement->nom_actif           = ucfirst($request->nom_actif);
        $investissement->montant_transaction = $request->montant_transaction;
        $investissement->frais_transaction   = $request->frais_transaction;

        if ($investissement->save()) {
            return back()->with('success', 'L\'investissement a bien été ajouté 👍.')->with('message', $message);
        } else {
            return back()->with('error', 'Une erreur est survenue lors de l\'ajout de l\'investissement ❌.');
        }
    }

    /**
     * Modifie un investissement
     */
    public function editInvestissement(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        $request->validate([
            'id' => 'required|numeric|min:1|exists:finance_dashboard.investissements,id',
            'date_transaction' => 'required|date|before:tomorrow',
            'type_investissement' => 'required|string|max:255',
            'nom_actif' => 'required|string|max:255',
            'montant_transaction' => 'required|numeric|min:0',
            'frais_transaction' => 'required|numeric|min:0',
        ], [
            'id.required' => 'L\'id est obligatoire.',
            'id.numeric' => 'L\'id doit être un nombre.',
            'id.min' => 'L\'id doit être supérieur ou égal à 1.',
            'id.exists' => 'L\'id n\'existe pas.',
            'date_transaction.required' => 'La date est obligatoire.',
            'date_transaction.date' => 'La date doit être une date.',
            'date_transaction.before' => 'La date doit être antérieure à la date du jour.',
            'type_investissement.required' => 'Le type d\'investissement est obligatoire.',
            'type_investissement.string' => 'Le type d\'investissement doit être une chaîne de caractères.',
            'type_investissement.max' => 'Le type d\'investissement ne doit pas dépasser 255 caractères.',
            'nom_actif.required' => 'Le nom de l\'actif est obligatoire.',
            'nom_actif.string' => 'Le nom de l\'actif doit être une chaîne de caractères.',
            'nom_actif.max' => 'Le nom de l\'actif ne doit pas dépasser 255 caractères.',
            'montant_transaction.required' => 'Le montant est obligatoire.',
            'montant_transaction.numeric' => 'Le montant doit être un nombre.',
            'montant_transaction.min' => 'Le montant doit être supérieur ou égal à 0.',
            'frais_transaction.required' => 'Les frais sont obligatoires.',
            'frais_transaction.numeric' => 'Les frais doivent être un nombre.',
            'frais_transaction.min' => 'Les frais doivent être supérieurs ou égaux à 0.'
        ]);

        /* Message de confirmation */
        if (Investissement::where('date_transaction', $request->date_transaction)->where('type_investissement', $request->type_investissement)->where('nom_actif', $request->nom_actif)->where('montant_transaction', $request->montant_transaction)->where('frais_transaction', $request->frais_transaction)->first()) {
            $message = 'Attention, un investissement en ' . $request->type_investissement . ' similaire a déjà été ajouté pour cette date. 🤔';
        } else {
            $message = '';
        }

        /* Modification de l'investissement */
        $investissement = Investissement::find($request->id);
        if ($investissement->user_id != auth()->user()->id) { back()->with('error', 'L\'investissement ne vous appartient pas ❌.'); }

        $investissement->date_transaction    = $request->date_transaction;
        $investissement->type_investissement = ucfirst($request->type_investissement);
        $investissement->nom_actif           = ucfirst($request->nom_actif);
        $investissement->montant_transaction = $request->montant_transaction;
        $investissement->frais_transaction   = $request->frais_transaction;

        if ($investissement->save()) {
            return back()->with('success', 'L\'investissement a bien été modifié 👍.')->with('message', $message);
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la modification de l\'investissement ❌.');
        }
    }

    /**
     * Supprime un investissement
     */
    public function removeInvestissement(string $id)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        if ($id == null) { back()->with('error', 'l\'id est null ❌.'); }
        if (!is_numeric($id)) { back()->with('error', 'l\'id n\'est pas un nombre ❌.'); }
        if ($id <= 0) { back()->with('error', 'l\'id est inférieur ou égal à 0 ❌.'); }

        $investissement = Investissement::find($id);
        if (!$investissement) { back()->with('error', 'L\'investissement n\'existe pas ❌.'); }
        if ($investissement->user_id != auth()->user()->id) { back()->with('error', 'L\'investissement ne vous appartient pas ❌.'); }

        /* Suppression de l'investissement */
        if ($investissement->delete()) {
            return back()->with('success', 'L\'investissement a bien été supprimé 👍.');
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la suppression de l\'investissement ❌.');
        }
    }


    /* Ajout de type d'investissement */
    /**
     * Ajoute un type d'investissement
     */
    public function addTypeInvestissement(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        $request->validate([
            'new_type' => 'required|string|min:1|max:255',
        ], [
            'new_type.required' => 'Le type d\'investissement est obligatoire.',
            'new_type.string' => 'Le type d\'investissement doit être une chaîne de caractères.',
            'new_type.min' => 'Le type d\'investissement doit contenir au moins 1 caractère.',
            'new_type.max' => 'Le type d\'investissement ne doit pas dépasser 255 caractères.'
        ]);

        /* Récupération des investissements */
        $type_investissement = ucfirst($request->new_type);

        /* Message de confirmation */
        if (Investissement::where('type_investissement', $type_investissement)->first()) {
            $message = 'Attention, le type d\'investissement ' . $type_investissement . ' existe déjà. 🤔';
        } else {
            $message = 'Les investissemnts en ' . $type_investissement . ' seront définitivement ajoutés une fois que vous aurez ajouté un investissement sur cette page 👍.';
        }

        return redirect()->route('investissements.type', ['type' => $type_investissement])->with('message', $message);
    }


    /*-------------*/
    /* Abonnements */
    /*-------------*/
    /* Affiche des abonnements */
    /**
     * Affiche tous les abonnements
     */
    public function abonnements(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        /* Récupération des abonnements */
        $abonnements = PrivateController::getAbonnements('', '', '', $sort, $order);

        return view('private.abonnement', compact('abonnements'));
    }

    /**
     * Affiche les abonnements d'un même mois
     */
    public function abonnementsDate(Request $request, string $date)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $abonnements = PrivateController::getAbonnements($date, '', '', $sort, $order);

        return view('private.abonnement', compact('abonnements'));
    }

    /**
     * Affiche les abonnements d'un même nom
     */
    public function abonnementsNom(Request $request, string $nom_actif)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $abonnements = PrivateController::getAbonnements('', $nom_actif, '', $sort, $order);

        return view('private.abonnement', compact('abonnements'));
    }

    /**
     * Affiche les abonnements actifs ou inactifs
     */
    public function abonnementsActif(Request $request, int $actif)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $abonnements = PrivateController::getAbonnements('', '', $actif, $sort, $order);

        return view('private.abonnement', compact('abonnements'));
    }

    /**
     * Affiche les abonnements d'un même mois et d'un même nom
     */
    public function abonnementsDateNom(Request $request, string $date, string $nom_actif)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $abonnements = PrivateController::getAbonnements($date, $nom_actif, '', $sort, $order);

        return view('private.abonnement', compact('abonnements'));
    }

    /**
     * Affiche les abonnements d'un même mois et d'un même état
     */
    public function abonnementsDateActif(Request $request, string $date, string $actif)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $abonnements = PrivateController::getAbonnements($date, '', $actif, $sort, $order);

        return view('private.abonnement', compact('abonnements'));
    }

    /**
     * Affiche les abonnements d'un même nom et d'un même état
     */
    public function abonnementsNomActif(Request $request, string $nom_actif, string $actif)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $abonnements = PrivateController::getAbonnements('', $nom_actif, $actif, $sort, $order);

        return view('private.abonnement', compact('abonnements'));
    }

    /**
     * Affiche les abonnements d'un même mois, d'un même nom et d'un même état
     */
    public function abonnementsDateNomActif(Request $request, string $date, string $nom_actif, string $actif)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $abonnements = PrivateController::getAbonnements($date, $nom_actif, $actif, $sort, $order);

        return view('private.abonnement', compact('abonnements'));
    }


    /* Édition des abonnements */
    /**
     * Ajoute un abonnement
     */
    public function addAbonnement(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        $request->validate([
            'date_transaction' => 'required|date|before:tomorrow',
            'nom_actif' => 'required|string|max:255',
            'montant_transaction' => 'required|numeric|min:0',
            'abonnement_actif' => 'required'
        ], [
            'date_transaction.required' => 'La date est obligatoire.',
            'date_transaction.date' => 'La date doit être une date.',
            'date_transaction.before' => 'La date doit être antérieure à la date du jour.',
            'nom_actif.required' => 'Le nom de l\'actif est obligatoire.',
            'nom_actif.string' => 'Le nom de l\'actif doit être une chaîne de caractères.',
            'nom_actif.max' => 'Le nom de l\'actif ne doit pas dépasser 255 caractères.',
            'montant_transaction.required' => 'Le montant est obligatoire.',
            'montant_transaction.numeric' => 'Le montant doit être un nombre.',
            'montant_transaction.min' => 'Le montant doit être supérieur ou égal à 0.',
            'abonnement_actif.required' => 'L\'état est obligatoire.'
        ]);

        /* Message de confirmation */
        if (Abonnement::where('date_transaction', $request->date_transaction)->where('nom_actif', $request->nom_actif)->where('montant_transaction', $request->montant_transaction)->where('abonnement_actif', $request->abonnement_actif)->first()) {
            $message = 'Attention, un abonnement similaire a déjà été ajouté pour cette date. 🤔';
        } else {
            $message = '';
        }

        /* Ajout de l'abonnement */
        $abonnement = new Abonnement();
        $abonnement->user_id             = auth()->user()->id;
        $abonnement->date_transaction    = $request->date_transaction;
        $abonnement->nom_actif           = ucfirst($request->nom_actif);
        $abonnement->montant_transaction = $request->montant_transaction;
        $abonnement->abonnement_actif    = filter_var($request->abonnement_actif, FILTER_VALIDATE_BOOLEAN);

        if ($abonnement->save()) {
            return back()->with('success', 'L\'abonnement a bien été ajouté 👍.')->with('message', $message);
        } else {
            return back()->with('error', 'Une erreur est survenue lors de l\'ajout de l\'abonnement ❌.');
        }
    }

    /**
     * Modifie un abonnement
     */
    public function editAbonnement(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        $request->validate([
            'id' => 'required|numeric|min:1|exists:finance_dashboard.abonnements,id',
            'date_transaction' => 'required|date|before:tomorrow',
            'nom_actif' => 'required|string|max:255',
            'montant_transaction' => 'required|numeric|min:0',
            'abonnement_actif' => 'required'
        ], [
            'id.required' => 'L\'id est obligatoire.',
            'id.numeric' => 'L\'id doit être un nombre.',
            'id.min' => 'L\'id doit être supérieur ou égal à 1.',
            'id.exists' => 'L\'id n\'existe pas.',
            'date_transaction.required' => 'La date est obligatoire.',
            'date_transaction.date' => 'La date doit être une date.',
            'date_transaction.before' => 'La date doit être antérieure à la date du jour.',
            'nom_actif.required' => 'Le nom de l\'actif est obligatoire.',
            'nom_actif.string' => 'Le nom de l\'actif doit être une chaîne de caractères.',
            'nom_actif.max' => 'Le nom de l\'actif ne doit pas dépasser 255 caractères.',
            'montant_transaction.required' => 'Le montant est obligatoire.',
            'montant_transaction.numeric' => 'Le montant doit être un nombre.',
            'montant_transaction.min' => 'Le montant doit être supérieur ou égal à 0.',
            'abonnement_actif.required' => 'L\'état est obligatoire.'
        ]);

        /* Ajout de l'abonnement */
        $abonnement = Abonnement::find($request->id);
        if ($abonnement->user_id != auth()->user()->id) { back()->with('error', 'L\'abonnement ne vous appartient pas ❌.'); }

        $abonnement->date_transaction    = $request->date_transaction;
        $abonnement->nom_actif           = ucfirst($request->nom_actif);
        $abonnement->montant_transaction = $request->montant_transaction;
        $abonnement->abonnement_actif    = filter_var($request->abonnement_actif, FILTER_VALIDATE_BOOLEAN);

        if ($abonnement->save()) {
            return back()->with('success', 'L\'abonnement a bien été modifié 👍.');
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la modification de l\'abonnement ❌.');
        }
    }

    /**
     * Supprime un abonnement
     */
    public function removeAbonnement(string $id)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        if ($id == null) { back()->with('error', 'l\'id est null ❌.'); }
        if (!is_numeric($id)) { back()->with('error', 'l\'id n\'est pas un nombre ❌.'); }
        if ($id <= 0) { back()->with('error', 'l\'id est inférieur ou égal à 0 ❌.'); }

        $abonnement = Abonnement::find($id);
        if (!$abonnement) { back()->with('error', 'L\'abonnement n\'existe pas ❌.'); }
        if ($abonnement->user_id != auth()->user()->id) { back()->with('error', 'L\'abonnement ne vous appartient pas ❌.'); }

        /* Suppression de l'abonnement */
        if ($abonnement->delete()) {
            return back()->with('success', 'L\'abonnement a bien été supprimé 👍.');
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la suppression de l\'abonnement ❌.');
        }
    }



    /*-------------------------------------------------*/
    /* Historique des transactions lié aux abonnements */
    /*-------------------------------------------------*/
    /* Affichage des historiques d'abonnements */
    /**
     * Affiche tous les historiques d'abonnements
     */
    public function abonnementsHistories(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        /* Récupération d'un abonnement aléatoire */
        $abonnement = Abonnement::inRandomOrder()->first();
        $abonnements_histories = PrivateController::getAbonnementsHistories('', '', $sort, $order);

        return view('private.abonnement_history', compact('abonnements_histories', 'abonnement'));
    }

    /**
     * Affiche les historiques d'abonnements d'une même date
     */
    public function abonnementsHistoriesDate(Request $request, string $date)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $abonnement = Abonnement::inRandomOrder()->first();
        $abonnements_histories = PrivateController::getAbonnementsHistories($date, '', $sort, $order);

        return view('private.abonnement_history', compact('abonnements_histories', 'abonnement'));
    }

    /**
     * Affiche les historiques d'abonnements d'un même nom d'actif
     */
    public function abonnementsHistoriesNom(Request $request, string $nom_actif)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $abonnement = Abonnement::inRandomOrder()->where('nom_actif', $nom_actif)->first();
        $abonnements_histories = PrivateController::getAbonnementsHistories('', $nom_actif, $sort, $order);

        return view('private.abonnement_history', compact('abonnements_histories', 'abonnement'));
    }

    /**
     * Affiche les historiques d'abonnements d'une même date et d'un même nom d'actif
     */
    public function abonnementsHistoriesDateNom(Request $request, string $date, string $nom_actif)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $abonnement = Abonnement::inRandomOrder()->where('nom_actif', $nom_actif)->first();
        $abonnements_histories = PrivateController::getAbonnementsHistories($date, $nom_actif, $sort, $order);

        return view('private.abonnement_history', compact('abonnements_histories', 'abonnement'));
    }

    /* Édition des historiques d'abonnements */
    /**
     * Ajoute un historiques d'abonnement
     */
    public function addAbonnementHistory(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        $request->validate([
            'date_transaction' => 'required|date|before:tomorrow',
            'nom_actif' => 'required|string|max:255',
            'montant_transaction' => 'required|numeric|min:0'
        ], [
            'date_transaction.required' => 'La date est obligatoire.',
            'date_transaction.date' => 'La date doit être une date.',
            'date_transaction.before' => 'La date doit être antérieure à la date du jour.',
            'nom_actif.required' => 'Le nom de l\'actif est obligatoire.',
            'nom_actif.string' => 'Le nom de l\'actif doit être une chaîne de caractères.',
            'nom_actif.max' => 'Le nom de l\'actif ne doit pas dépasser 255 caractères.',
            'montant_transaction.required' => 'Le montant est obligatoire.',
            'montant_transaction.numeric' => 'Le montant doit être un nombre.',
            'montant_transaction.min' => 'Le montant doit être supérieur ou égal à 0.'
        ]);

        /* Message de confirmation */
        if (Abonnement_history::where('date_transaction', $request->date_transaction)->where('nom_actif', $request->nom_actif)->first()) {
            $message = 'Attention, un abonnement similaire a déjà été ajouté pour cette date. 🤔';
        } else {
            $message = '';
        }

        /* Ajout de l'abonnement */
        $abonnement_history = new Abonnement_history();
        $abonnement_history->user_id             = auth()->user()->id;
        $abonnement_history->date_transaction    = $request->date_transaction;
        $abonnement_history->nom_actif           = ucfirst($request->nom_actif);
        $abonnement_history->montant_transaction = $request->montant_transaction;

        if ($abonnement_history->save()) {
            return back()->with('success', 'L\'abonnement a bien été ajouté 👍.')->with('message', $message);
        } else {
            return back()->with('error', 'Une erreur est survenue lors de l\'ajout de la transaction l\'abonnement ❌.');
        }
    }

    /**
     * Modifie un historiques d'abonnement
     */
    public function editAbonnementHistory(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        $request->validate([
            'id' => 'required|numeric|min:1|exists:finance_dashboard.abonnements_histories,id',
            'date_transaction' => 'required|date|before:tomorrow',
            'nom_actif' => 'required|string|max:255',
            'montant_transaction' => 'required|numeric|min:0'
        ], [
            'id.required' => 'L\'id est obligatoire.',
            'id.numeric' => 'L\'id doit être un nombre.',
            'id.min' => 'L\'id doit être supérieur ou égal à 1.',
            'id.exists' => 'L\'id n\'existe pas.',
            'date_transaction.required' => 'La date est obligatoire.',
            'date_transaction.date' => 'La date doit être une date.',
            'date_transaction.before' => 'La date doit être antérieure à la date du jour.',
            'nom_actif.required' => 'Le nom de l\'actif est obligatoire.',
            'nom_actif.string' => 'Le nom de l\'actif doit être une chaîne de caractères.',
            'nom_actif.max' => 'Le nom de l\'actif ne doit pas dépasser 255 caractères.',
            'montant_transaction.required' => 'Le montant est obligatoire.',
            'montant_transaction.numeric' => 'Le montant doit être un nombre.',
            'montant_transaction.min' => 'Le montant doit être supérieur ou égal à 0.'
        ]);

        /* Modification de l'abonnement */
        $abonnement_history = Abonnement_history::find($request->id);
        if ($abonnement_history->user_id != auth()->user()->id) { back()->with('error', 'L\'abonnement ne vous appartient pas ❌.'); }

        $abonnement_history->date_transaction    = $request->date_transaction;
        $abonnement_history->nom_actif           = ucfirst($request->nom_actif);
        $abonnement_history->montant_transaction = $request->montant_transaction;

        if ($abonnement_history->save()) {
            return back()->with('success', 'L\'abonnement a bien été modifié 👍.');
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la modification de l\'abonnement ❌.');
        }
    }

    /**
     * Supprime un historiques d'abonnement
     */
    public function removeAbonnementHistory(string $id)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        if ($id == null) { back()->with('error', 'l\'id est null ❌.'); }
        if (!is_numeric($id)) { back()->with('error', 'l\'id n\'est pas un nombre ❌.'); }
        if ($id <= 0) { back()->with('error', 'l\'id est inférieur ou égal à 0 ❌.'); }

        $abonnement_history = Abonnement_history::find($id);
        if (!$abonnement_history) { back()->with('error', 'L\'abonnement n\'existe pas ❌.'); }
        if ($abonnement_history->user_id != auth()->user()->id) { back()->with('error', 'L\'abonnement ne vous appartient pas ❌.'); }

        /* Suppression de l'abonnement */
        if ($abonnement_history->delete()) {
            return back()->with('success', 'L\'abonnement a bien été supprimé 👍.');
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la suppression de l\'abonnement ❌.');
        }
    }



    /*----------*/
    /* Emprunts */
    /*----------*/
    /* Affichage des emprunts */
    /**
     * Affiche tous les emprunts
     */
    public function emprunts(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_emprunt';
        $order = $request->query('order') ?? 'desc';

        $emprunts = PrivateController::getEmprunts('', $sort, $order);

        return view('private.emprunt', compact('emprunts'));
    }

    /**
     * Affiche les emprunts réalisé auprès d'une même banque
     */
    public function empruntsBanque(Request $request, string $banque)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_emprunt';
        $order = $request->query('order') ?? 'desc';

        $emprunts = PrivateController::getEmprunts($banque, $sort, $order);

        return view('private.emprunt', compact('emprunts'));
    }


    /* Édition des emprunts */
    /**
     * Ajoute un emprunt
     */
    public function addEmprunt(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        $request->validate([
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'nom_actif' => 'required|string|max:255',
            'banque' => 'required|string|max:255',
            'montant_transaction' => 'required|numeric|min:0',
            'mensualite' => 'required|numeric|min:0',
            'taux_interet_annuel' => 'required|numeric|min:0',
        ], [
            'date_debut.required' => 'La date de début est obligatoire.',
            'date_debut.date' => 'La date de début doit être une date.',
            'date_fin.required' => 'La date de fin est obligatoire.',
            'date_fin.date' => 'La date de fin doit être une date.',
            'date_fin.after' => 'La date de fin doit être postérieure à la date de début.',
            'nom_actif.required' => 'Le nom de l\'actif est obligatoire.',
            'nom_actif.string' => 'Le nom de l\'actif doit être une chaîne de caractères.',
            'nom_actif.max' => 'Le nom de l\'actif ne doit pas dépasser 255 caractères.',
            'banque.required' => 'La banque est obligatoire.',
            'banque.string' => 'La banque doit être une chaîne de caractères.',
            'banque.max' => 'La banque ne doit pas dépasser 255 caractères.',
            'montant_transaction.required' => 'Le montant est obligatoire.',
            'montant_transaction.numeric' => 'Le montant doit être un nombre.',
            'montant_transaction.min' => 'Le montant doit être supérieur ou égal à 0.',
            'mensualite.required' => 'La mensualité est obligatoire.',
            'mensualite.numeric' => 'La mensualité doit être un nombre.',
            'mensualite.min' => 'La mensualité doit être supérieure ou égale à 0.',
            'taux_interet_annuel.required' => 'Le taux d\'intérêt annuel est obligatoire.',
            'taux_interet_annuel.numeric' => 'Le taux d\'intérêt annuel doit être un nombre.',
            'taux_interet_annuel.min' => 'Le taux d\'intérêt annuel doit être supérieur ou égal à 0.'
        ]);

        /* Message de confirmation */
        if (Emprunt::where('date_debut', $request->date_debut)->where('date_fin', $request->date_fin)->where('nom_actif', $request->nom_actif)->where('banque', $request->banque)->first()) {
            $message = 'Attention, un emprunt similaire a déjà été ajouté pour cette date. 🤔';
        } else {
            $message = '';
        }

        /* Ajout de l'emprunt */
        $emprunt = new Emprunt();
        $emprunt->user_id             = auth()->user()->id;
        $emprunt->date_debut          = $request->date_debut;
        $emprunt->date_fin            = $request->date_fin;
        $emprunt->nom_actif           = ucfirst($request->nom_actif);
        $emprunt->banque              = ucfirst($request->banque);
        $emprunt->montant_transaction = $request->montant_transaction;
        $emprunt->mensualite          = $request->mensualite;
        $emprunt->taux_interet_annuel = $request->taux_interet_annuel;

        if ($emprunt->save()) {
            return back()->with('success', 'L\'emprunt a bien été ajouté 👍.')->with('message', $message);
        } else {
            return back()->with('error', 'Une erreur est survenue lors de l\'ajout de l\'emprunt ❌.');
        }
    }

    /**
     * Modifie un emprunt
     */
    public function editEmprunt(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        $request->validate([
            'id' => 'required|numeric|min:1|exists:finance_dashboard.emprunts,id',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'nom_actif' => 'required|string|max:255',
            'banque' => 'required|string|max:255',
            'montant_transaction' => 'required|numeric|min:0',
            'mensualite' => 'required|numeric|min:0',
            'taux_interet_annuel' => 'required|numeric|min:0',
        ], [
            'id.required' => 'L\'id est obligatoire.',
            'id.numeric' => 'L\'id doit être un nombre.',
            'id.min' => 'L\'id doit être supérieur ou égal à 1.',
            'id.exists' => 'L\'id n\'existe pas.',
            'date_debut.required' => 'La date de début est obligatoire.',
            'date_debut.date' => 'La date de début doit être une date.',
            'date_fin.required' => 'La date de fin est obligatoire.',
            'date_fin.date' => 'La date de fin doit être une date.',
            'date_fin.after' => 'La date de fin doit être postérieure à la date de début.',
            'nom_actif.required' => 'Le nom de l\'actif est obligatoire.',
            'nom_actif.string' => 'Le nom de l\'actif doit être une chaîne de caractères.',
            'nom_actif.max' => 'Le nom de l\'actif ne doit pas dépasser 255 caractères.',
            'banque.required' => 'La banque est obligatoire.',
            'banque.string' => 'La banque doit être une chaîne de caractères.',
            'banque.max' => 'La banque ne doit pas dépasser 255 caractères.',
            'montant_transaction.required' => 'Le montant est obligatoire.',
            'montant_transaction.numeric' => 'Le montant doit être un nombre.',
            'montant_transaction.min' => 'Le montant doit être supérieur ou égal à 0.',
            'mensualite.required' => 'La mensualité est obligatoire.',
            'mensualite.numeric' => 'La mensualité doit être un nombre.',
            'mensualite.min' => 'La mensualité doit être supérieure ou égale à 0.',
            'taux_interet_annuel.required' => 'Le taux d\'intérêt annuel est obligatoire.',
            'taux_interet_annuel.numeric' => 'Le taux d\'intérêt annuel doit être un nombre.',
            'taux_interet_annuel.min' => 'Le taux d\'intérêt annuel doit être supérieur ou égal à 0.'
        ]);

        /* Modification de l'emprunt */
        $emprunt = Emprunt::find($request->id);
        if ($emprunt->user_id != auth()->user()->id) { back()->with('error', 'L\'emprunt ne vous appartient pas ❌.'); }

        $emprunt->date_debut          = $request->date_debut;
        $emprunt->date_fin            = $request->date_fin;
        $emprunt->nom_actif           = ucfirst($request->nom_actif);
        $emprunt->banque              = ucfirst($request->banque);
        $emprunt->montant_transaction = $request->montant_transaction;
        $emprunt->mensualite          = $request->mensualite;
        $emprunt->taux_interet_annuel = $request->taux_interet_annuel;

        if ($emprunt->save()) {
            return back()->with('success', 'L\'emprunt a bien été modifié 👍.');
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la modification de l\'emprunt ❌.');
        }
    }

    /**
     * Supprime un emprunt
     */
    public function removeEmprunt(string $id)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        if ($id == null) { back()->with('error', 'l\'id est null ❌.'); }
        if (!is_numeric($id)) { back()->with('error', 'l\'id n\'est pas un nombre ❌.'); }
        if ($id <= 0) { back()->with('error', 'l\'id est inférieur ou égal à 0 ❌.'); }

        $emprunt = Emprunt::find($id);
        if (!$emprunt) { back()->with('error', 'L\'emprunt n\'existe pas ❌.'); }
        if ($emprunt->user_id != auth()->user()->id) { back()->with('error', 'L\'emprunt ne vous appartient pas ❌.'); }

        /* Suppression de l'emprunt */
        if ($emprunt->delete()) {
            return back()->with('success', 'L\'emprunt a bien été supprimé 👍.');
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la suppression de l\'emprunt ❌.');
        }
    }



    /*----------------------------------------------*/
    /* Historique des transactions lié aux emprunts */
    /*----------------------------------------------*/
    /* Affichage des historiques d'emprunts */
    /**
     * Affiche tous les historiques d'emprunts
     */
    public function empruntsHistories(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_emprunt';
        $order = $request->query('order') ?? 'desc';

        /* Récupération d'un emprunt aléatoire */
        $emprunt = Emprunt::inRandomOrder()->first();
        $emprunts_histories = PrivateController::getEmpruntsHistories('', '', $sort, $order);

        return view('private.emprunt_history', compact('emprunts_histories', 'emprunt'));
    }

    /**
     * Affiche les historiques d'emprunts d'un même nom d'actif
     */
    public function empruntsHistoriesNom(Request $request, string $nom_actif)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_emprunt';
        $order = $request->query('order') ?? 'desc';

        $emprunt = Emprunt::inRandomOrder()->where('nom_actif', $nom_actif)->first();
        $emprunts_histories = PrivateController::getEmpruntsHistories($nom_actif, '', $sort, $order);

        return view('private.emprunt_history', compact('emprunts_histories', 'emprunt'));
    }

    /**
     * Affiche les historiques d'emprunts réalisé auprès d'une même banque
     */
    public function empruntsHistoriesBanque(Request $request, string $banque)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_emprunt';
        $order = $request->query('order') ?? 'desc';

        $emprunt = Emprunt::inRandomOrder()->where('banque', $banque)->first();
        $emprunts_histories = PrivateController::getEmpruntsHistories('', $banque, $sort, $order);

        return view('private.emprunt_history', compact('emprunts_histories', 'emprunt'));
    }

    /**
     * Affiche les historiques d'emprunts d'un même nom d'actif et d'une même banque
     */
    public function empruntsHistoriesNomBanque(Request $request, string $nom_actif, string $banque)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_emprunt';
        $order = $request->query('order') ?? 'desc';

        $emprunt = Emprunt::inRandomOrder()->where('nom_actif', $nom_actif)->where('banque', $banque)->first();
        $emprunts_histories = PrivateController::getEmpruntsHistories($nom_actif, $banque, $sort, $order);

        return view('private.emprunt_history', compact('emprunts_histories', 'emprunt'));
    }


    /* Édition des historiques d'emprunts */
    /**
     * Ajoute un historiques d'emprunt
     */
    public function addEmpruntHistory(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $request->validate([
            'date_transaction' => 'required|date',
            'nom_actif' => 'required|string|max:255',
            'banque' => 'required|string|max:255',
            'montant_transaction' => 'required|numeric|min:0'
        ], [
            'date_transaction.required' => 'La date est obligatoire.',
            'date_transaction.date' => 'La date doit être une date.',
            'nom_actif.required' => 'Le nom de l\'actif est obligatoire.',
            'nom_actif.string' => 'Le nom de l\'actif doit être une chaîne de caractères.',
            'nom_actif.max' => 'Le nom de l\'actif ne doit pas dépasser 255 caractères.',
            'banque.required' => 'La banque est obligatoire.',
            'banque.string' => 'La banque doit être une chaîne de caractères.',
            'banque.max' => 'La banque ne doit pas dépasser 255 caractères.',
            'montant_transaction.required' => 'Le montant est obligatoire.',
            'montant_transaction.numeric' => 'Le montant doit être un nombre.',
            'montant_transaction.min' => 'Le montant doit être supérieur ou égal à 0.'
        ]);

        /* Message de confirmation */
        if (Emprunt_history::where('date_transaction', $request->date_transaction)->where('nom_actif', $request->nom_actif)->where('banque', $request->banque)->first()) {
            $message = 'Attention, une transaction similaire a déjà été ajouté pour cette date. 🤔';
        } else {
            $message = '';
        }

        /* Ajout de l'emprunt */
        $emprunt_history = new Emprunt_history();
        $emprunt_history->user_id             = auth()->user()->id;
        $emprunt_history->date_transaction    = $request->date_transaction;
        $emprunt_history->nom_actif           = ucfirst($request->nom_actif);
        $emprunt_history->banque              = ucfirst($request->banque);
        $emprunt_history->montant_transaction = $request->montant_transaction;

        if ($emprunt_history->save()) {
            return back()->with('success', 'L\'emprunt a bien été ajouté 👍.')->with('message', $message);
        } else {
            return back()->with('error', 'Une erreur est survenue lors de l\'ajout de la transaction l\'emprunt ❌.');
        }
    }

    /**
     * Modifie un historiques d'emprunt
     */
    public function editEmpruntHistory(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $request->validate([
            'id' => 'required|numeric|min:1|exists:finance_dashboard.emprunts_histories,id',
            'date_transaction' => 'required|date',
            'nom_actif' => 'required|string|max:255',
            'banque' => 'required|string|max:255',
            'montant_transaction' => 'required|numeric|min:0'
        ], [
            'id.required' => 'L\'id est obligatoire.',
            'id.numeric' => 'L\'id doit être un nombre.',
            'id.min' => 'L\'id doit être supérieur ou égal à 1.',
            'id.exists' => 'L\'id n\'existe pas.',
            'date_transaction.required' => 'La date est obligatoire.',
            'date_transaction.date' => 'La date doit être une date.',
            'nom_actif.required' => 'Le nom de l\'actif est obligatoire.',
            'nom_actif.string' => 'Le nom de l\'actif doit être une chaîne de caractères.',
            'nom_actif.max' => 'Le nom de l\'actif ne doit pas dépasser 255 caractères.',
            'banque.required' => 'La banque est obligatoire.',
            'banque.string' => 'La banque doit être une chaîne de caractères.',
            'banque.max' => 'La banque ne doit pas dépasser 255 caractères.',
            'montant_transaction.required' => 'Le montant est obligatoire.',
            'montant_transaction.numeric' => 'Le montant doit être un nombre.',
            'montant_transaction.min' => 'Le montant doit être supérieur ou égal à 0.'
        ]);

        /* Modification de l'emprunt */
        $emprunt_history = Emprunt_history::find($request->id);
        if ($emprunt_history->user_id != auth()->user()->id) { back()->with('error', 'L\'emprunt ne vous appartient pas ❌.'); }

        $emprunt_history->date_transaction    = $request->date_transaction;
        $emprunt_history->nom_actif           = ucfirst($request->nom_actif);
        $emprunt_history->banque              = ucfirst($request->banque);
        $emprunt_history->montant_transaction = $request->montant_transaction;

        if ($emprunt_history->save()) {
            return back()->with('success', 'L\'emprunt a bien été modifié 👍.');
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la modification de l\'emprunt ❌.');
        }
    }

    /**
     * Supprime un historiques d'emprunt
     */
    public function removeEmpruntHistory(string $id)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        if ($id == null) { back()->with('error', 'l\'id est null ❌.'); }
        if (!is_numeric($id)) { back()->with('error', 'l\'id n\'est pas un nombre ❌.'); }
        if ($id <= 0) { back()->with('error', 'l\'id est inférieur ou égal à 0 ❌.'); }

        $emprunt_history = Emprunt_history::find($id);
        if (!$emprunt_history) { back()->with('error', 'L\'emprunt n\'existe pas ❌.'); }
        if ($emprunt_history->user_id != auth()->user()->id) { back()->with('error', 'L\'emprunt ne vous appartient pas ❌.'); }

        /* Suppression de l'emprunt */
        if ($emprunt_history->delete()) {
            return back()->with('success', 'L\'emprunt a bien été supprimé 👍.');
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la suppression de l\'emprunt ❌.');
        }
    }



    /*----------*/
    /* Dépenses */
    /*----------*/
    /* Affichage des dépenses */
    /**
     * Affiche toutes les dépenses
     */
    public function depenses(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $depenses = PrivateController::getDepenses('', '', $sort, $order);

        return view('private.depense', compact('depenses'));
    }

    /**
     * Affiche les dépenses réalisé à une même date
     */
    public function depensesDate(Request $request, string $date)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $depenses = PrivateController::getDepenses($date, '', $sort, $order);

        return view('private.depense', compact('depenses'));
    }

    /**
     * Affiche les dépenses réalisé auprès d'un même nom
     */
    public function depensesNom(Request $request, string $nom_actif)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $depenses = PrivateController::getDepenses('', $nom_actif, $sort, $order);

        return view('private.depense', compact('depenses'));
    }

    /**
     * Affiche les dépenses réalisé auprès d'un même nom et à une même date
     */
    public function depensesDateNom(Request $request, string $date, string $nom_actif)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $depenses = PrivateController::getDepenses($date, $nom_actif, $sort, $order);

        return view('private.depense', compact('depenses'));
    }


    /* Édition des dépenses */
    /**
     * Ajoute une dépense
     */
    public function addDepense(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $request->validate([
            'date_transaction' => 'required|date',
            'nom_actif' => 'required|string|max:255',
            'montant_transaction' => 'required|numeric|min:0'
        ], [
            'date_transaction.required' => 'La date est obligatoire.',
            'date_transaction.date' => 'La date doit être une date.',
            'nom_actif.required' => 'Le nom de l\'actif est obligatoire.',
            'nom_actif.string' => 'Le nom de l\'actif doit être une chaîne de caractères.',
            'nom_actif.max' => 'Le nom de l\'actif ne doit pas dépasser 255 caractères.',
            'montant_transaction.required' => 'Le montant est obligatoire.',
            'montant_transaction.numeric' => 'Le montant doit être un nombre.',
            'montant_transaction.min' => 'Le montant doit être supérieur ou égal à 0.'
        ]);

        /* Message de confirmation */
        if (Depense::where('date_transaction', $request->date_transaction)->where('nom_actif', $request->nom_actif)->first()) {
            $message = 'Attention, une transaction similaire a déjà été ajouté pour cette date. 🤔';
        } else {
            $message = '';
        }

        /* Ajout de la dépense */
        $depense = new Depense();
        $depense->user_id             = auth()->user()->id;
        $depense->date_transaction    = $request->date_transaction;
        $depense->nom_actif           = ucfirst($request->nom_actif);
        $depense->montant_transaction = $request->montant_transaction;

        if ($depense->save()) {
            return back()->with('success', 'La dépense a bien été ajoutée 👍.')->with('message', $message);
        } else {
            return back()->with('error', 'Une erreur est survenue lors de l\'ajout de la transaction la dépense ❌.');
        }
    }

    /**
     * Modifie une dépense
     */
    public function editDepense(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $request->validate([
            'id' => 'required|numeric|min:1|exists:finance_dashboard.depenses,id',
            'date_transaction' => 'required|date',
            'nom_actif' => 'required|string|max:255',
            'montant_transaction' => 'required|numeric|min:0'
        ], [
            'id.required' => 'L\'id est obligatoire.',
            'id.numeric' => 'L\'id doit être un nombre.',
            'id.min' => 'L\'id doit être supérieur ou égal à 1.',
            'id.exists' => 'L\'id n\'existe pas.',
            'date_transaction.required' => 'La date est obligatoire.',
            'date_transaction.date' => 'La date doit être une date.',
            'nom_actif.required' => 'Le nom de l\'actif est obligatoire.',
            'nom_actif.string' => 'Le nom de l\'actif doit être une chaîne de caractères.',
            'nom_actif.max' => 'Le nom de l\'actif ne doit pas dépasser 255 caractères.',
            'montant_transaction.required' => 'Le montant est obligatoire.',
            'montant_transaction.numeric' => 'Le montant doit être un nombre.',
            'montant_transaction.min' => 'Le montant doit être supérieur ou égal à 0.'
        ]);

        /* Modification de la dépense */
        $depense = Depense::find($request->id);
        if ($depense->user_id != auth()->user()->id) { back()->with('error', 'La dépense ne vous appartient pas ❌.'); }

        $depense->date_transaction    = $request->date_transaction;
        $depense->nom_actif           = ucfirst($request->nom_actif);
        $depense->montant_transaction = $request->montant_transaction;

        if ($depense->save()) {
            return back()->with('success', 'La dépense a bien été modifiée 👍.');
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la modification de la dépense ❌.');
        }
    }

    /**
     * Supprime une dépense
     */
    public function removeDepense(string $id)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        if ($id == null) { back()->with('error', 'l\'id est null ❌.'); }
        if (!is_numeric($id)) { back()->with('error', 'l\'id n\'est pas un nombre ❌.'); }
        if ($id <= 0) { back()->with('error', 'l\'id est inférieur ou égal à 0 ❌.'); }

        $depense = Depense::find($id);
        if (!$depense) { back()->with('error', 'La dépense n\'existe pas ❌.'); }
        if ($depense->user_id != auth()->user()->id) { back()->with('error', 'La dépense ne vous appartient pas ❌.'); }

        /* Suppression de la dépense */
        if ($depense->delete()) {
            return back()->with('success', 'La dépense a bien été supprimée 👍.');
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la suppression de la dépense ❌.');
        }
    }



    /*-------*/
    /* prêts */
    /*-------*/
    /* Affichage des prêts */
    /**
     * Affiche tous les prêts
     */
    public function prets(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $prets = PrivateController::getPrets('', '', $sort, $order);

        return view('private.pret', compact('prets'));
    }

    /**
     * Affiche les prêts réalisé à une même date
     */
    public function pretsDate(Request $request, string $date)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $prets = PrivateController::getPrets($date, '', $sort, $order);

        return view('private.pret', compact('prets'));
    }

    /**
     * Affiche les prêts réalisé auprès d'un même nom
     */
    public function pretsNom(Request $request, string $nom_emprunteur)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $prets = PrivateController::getPrets('', $nom_emprunteur, $sort, $order);

        return view('private.pret', compact('prets'));
    }

    /**
     * Affiche les prêts réalisé auprès d'un même nom et à une même date
     */
    public function pretsDateNom(Request $request, string $date, string $nom_emprunteur)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $prets = PrivateController::getPrets($date, $nom_emprunteur, $sort, $order);

        return view('private.pret', compact('prets'));
    }


    /* Édition des prêts */
    /**
     * Ajoute un prêt
     */
    public function addPret(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $request->validate([
            'date_transaction' => 'required|date|before:tomorrow',
            'nom_emprunteur' => 'required|string|max:255',
            'montant_pret' => 'required|string|max:255',
            'montant_rembourse' => 'required|numeric|min:0',
            'raison_pret' => 'required|string|max:255'
        ], [
            'date_transaction.required' => 'La date est obligatoire.',
            'date_transaction.date' => 'La date doit être une date.',
            'date_transaction.before' => 'La date doit être inférieure à la date d\'aujourd\'hui.',
            'nom_emprunteur.required' => 'Le nom de l\'emprunteur est obligatoire.',
            'nom_emprunteur.string' => 'Le nom de l\'emprunteur doit être une chaîne de caractères.',
            'nom_emprunteur.max' => 'Le nom de l\'emprunteur ne doit pas dépasser 255 caractères.',
            'montant_pret.required' => 'Le montant emprunté est obligatoire.',
            'montant_pret.string' => 'Le montant emprunté doit être une chaîne de caractères.',
            'montant_pret.max' => 'Le montant emprunté ne doit pas dépasser 255 caractères.',
            'montant_rembourse.required' => 'Le montant remboursé est obligatoire.',
            'montant_rembourse.numeric' => 'Le montant remboursé doit être un nombre.',
            'montant_rembourse.min' => 'Le montant remboursé doit être supérieur ou égal à 0.',
            'raison_pret.required' => 'La raison du prêt est obligatoire.',
            'raison_pret.string' => 'La raison du prêt doit être une chaîne de caractères.',
            'raison_pret.max' => 'La raison du prêt ne doit pas dépasser 255 caractères.'
        ]);

        /* Message de confirmation */
        if (Pret::where('date_transaction', $request->date_transaction)->where('nom_emprunteur', $request->nom_emprunteur)->where('montant_pret', $request->montant_pret)->first()) {
            $message = 'Attention, une transaction similaire a déjà été ajouté pour cette date. 🤔';
        } else {
            $message = '';
        }

        /* Ajout du prêt */
        $pret = new Pret();
        $pret->user_id           = auth()->user()->id;
        $pret->date_transaction  = $request->date_transaction;
        $pret->nom_emprunteur    = ucfirst($request->nom_emprunteur);
        $pret->montant_pret      = $request->montant_pret;
        $pret->montant_rembourse = $request->montant_rembourse;
        $pret->raison_pret       = ucfirst($request->raison_pret);

        if ($pret->save()) {
            return back()->with('success', 'Le prêt a bien été ajouté 👍.')->with('message', $message);
        } else {
            return back()->with('error', 'Une erreur est survenue lors de l\'ajout de la transaction le prêt ❌.');
        }
    }

    /**
     * Modifie un prêt
     */
    public function editPret(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $request->validate([
            'id' => 'required|numeric|min:1|exists:finance_dashboard.prets,id',
            'date_transaction' => 'required|date|before:tomorrow',
            'nom_emprunteur' => 'required|string|max:255',
            'montant_pret' => 'required|string|max:255',
            'montant_rembourse' => 'required|numeric|min:0',
            'raison_pret' => 'required|string|max:255'
        ], [
            'id.required' => 'L\'id est obligatoire.',
            'id.numeric' => 'L\'id doit être un nombre.',
            'id.min' => 'L\'id doit être supérieur ou égal à 1.',
            'id.exists' => 'L\'id n\'existe pas.',
            'date_transaction.required' => 'La date est obligatoire.',
            'date_transaction.date' => 'La date doit être une date.',
            'date_transaction.before' => 'La date doit être inférieure à la date d\'aujourd\'hui.',
            'nom_emprunteur.required' => 'Le nom de l\'emprunteur est obligatoire.',
            'nom_emprunteur.string' => 'Le nom de l\'emprunteur doit être une chaîne de caractères.',
            'nom_emprunteur.max' => 'Le nom de l\'emprunteur ne doit pas dépasser 255 caractères.',
            'montant_pret.required' => 'Le montant emprunté est obligatoire.',
            'montant_pret.string' => 'Le montant emprunté doit être une chaîne de caractères.',
            'montant_pret.max' => 'Le montant emprunté ne doit pas dépasser 255 caractères.',
            'montant_rembourse.required' => 'Le montant remboursé est obligatoire.',
            'montant_rembourse.numeric' => 'Le montant remboursé doit être un nombre.',
            'montant_rembourse.min' => 'Le montant remboursé doit être supérieur ou égal à 0.',
            'raison_pret.required' => 'La raison du prêt est obligatoire.',
            'raison_pret.string' => 'La raison du prêt doit être une chaîne de caractères.',
            'raison_pret.max' => 'La raison du prêt ne doit pas dépasser 255 caractères.'
        ]);

        /* Modification du prêt */
        $pret = Pret::find($request->id);
        if ($pret->user_id != auth()->user()->id) { back()->with('error', 'Le prêt ne vous appartient pas ❌.'); }

        $pret->date_transaction  = $request->date_transaction;
        $pret->nom_emprunteur    = ucfirst($request->nom_emprunteur);
        $pret->montant_pret      = $request->montant_pret;
        $pret->montant_rembourse = $request->montant_rembourse;
        $pret->raison_pret       = ucfirst($request->raison_pret);

        if ($pret->save()) {
            return back()->with('success', 'Le prêt a bien été modifié 👍.');
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la modification du prêt ❌.');
        }
    }

    /**
     * Supprime un prêt
     */
    public function removePret(string $id)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        /* Validation des données */
        if ($id == null) { back()->with('error', 'l\'id est null ❌.'); }
        if (!is_numeric($id)) { back()->with('error', 'l\'id n\'est pas un nombre ❌.'); }
        if ($id <= 0) { back()->with('error', 'l\'id est inférieur ou égal à 0 ❌.'); }

        $pret = Pret::find($id);
        if (!$pret) { back()->with('error', 'Le prêt n\'existe pas ❌.'); }
        if ($pret->user_id != auth()->user()->id) { back()->with('error', 'Le prêt ne vous appartient pas ❌.'); }

        /* Suppression du prêt */
        if ($pret->delete()) {
            return back()->with('success', 'Le prêt a bien été supprimé 👍.');
        } else {
            return back()->with('error', 'Une erreur est survenue lors de la suppression du prêt ❌.');
        }
    }




    /*======================*/
    /* Fonction Utilitaires */
    /*======================*/
    /*------*/
    /* Date */
    /*------*/
    /**
     * Récupère la première date d'un mois
     */
    public function getFirstDay(string $date) { return date('Y-m-01', strtotime($date)); }

    /**
     * Récupère la dernière date d'un mois
     */
    public function getLastDay(string $date) { return date('Y-m-t', strtotime($date)); }



    /*---------*/
    /* Salaire */
    /*---------*/
    /**
     * Récupère les salaires
     * @param string $date
     * @param string $employeur
     * @param string $sort
     * @param string $order
     */
    public function getSalaires(string $date, string $employeur, string $sort = 'date_transaction', $order = 'desc')
    {
        $salaires = Salaire::all()->where('user_id', auth()->user()->id);

        if ($date != '') {
            $salaires = $salaires->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                                 ->where('date_transaction', '<=', PrivateController::getLastDay($date));
        }

        if ($employeur != '') {
            $salaires = $salaires->where('employeur', $employeur);
        }

        return $order == 'asc' ? $salaires->sortBy($sort) : $salaires->sortByDesc($sort);
    }



    /*---------*/
    /* Épargne */
    /*---------*/
    /**
     * Récupère les épargnes
     * @param string $date
     * @param string $banque
     * @param string $compte
     * @param string $sort
     * @param string $order
     */
    public function getEpargnes(string $date, string $banque, string $compte, string $sort = 'date_transaction', $order = 'desc')
    {
        $epargnes = Epargne::all()->where('user_id', auth()->user()->id);

        if ($date != '') {
            $epargnes = $epargnes->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                                 ->where('date_transaction', '<=', PrivateController::getLastDay($date));
        }

        if ($banque != '') {
            $epargnes = $epargnes->where('banque', $banque);
        }

        if ($compte != '') {
            $epargnes = $epargnes->where('compte', $compte);
        }

        return $order == 'asc' ? $epargnes->sortBy($sort) : $epargnes->sortByDesc($sort);
    }



    /*----------------*/
    /* Investissement */
    /*----------------*/
    /**
     * Récupère les investissements
     * @param string $date
     * @param string $type
     * @param string $nom_actif
     * @param string $sort
     * @param string $order
     */
    public function getInvestissements(string $date, string $type, string $nom_actif, string $sort = 'date_transaction', $order = 'desc')
    {
        $investissements = Investissement::all()->where('user_id', auth()->user()->id);

        if ($date != '') {
            $investissements = $investissements->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                                               ->where('date_transaction', '<=', PrivateController::getLastDay($date));
        }

        if ($type != '') {
            $investissements = $investissements->where('type_investissement', $type);
        }

        if ($nom_actif != '') {
            $investissements = $investissements->where('nom_actif', $nom_actif);
        }

        return $order == 'asc' ? $investissements->sortBy($sort) : $investissements->sortByDesc($sort);
    }



    /*-------------*/
    /* Abonnements */
    /*-------------*/
    /**
     * Récupère les abonnements
     * @param string $date
     * @param string $nom_actif
     * @param bool $abonnement_actif
     * @param string $sort
     * @param string $order
     */
    public function getAbonnements(string $date, string $nom_actif, string $abonnement_actif, string $sort = 'date_transaction', $order = 'desc')
    {
        $abonnements = Abonnement::all()->where('user_id', auth()->user()->id);

        if ($date != '') {
            $abonnements = $abonnements->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                                       ->where('date_transaction', '<=', PrivateController::getLastDay($date));
        }

        if ($nom_actif != '') {
            $abonnements = $abonnements->where('nom_actif', $nom_actif);
        }

        if ($abonnement_actif != '') {
            $abonnements = $abonnements->where('abonnement_actif', filter_var($abonnement_actif, FILTER_VALIDATE_BOOLEAN));
        }

        return $order == 'asc' ? $abonnements->sortBy($sort) : $abonnements->sortByDesc($sort);
    }



    /*-------------------------------------------------*/
    /* Historique des transactions lié aux abonnements */
    /*-------------------------------------------------*/
    /**
     * Récupère les abonnements
     * @param string $date
     * @param string $nom_actif
     * @param string $sort
     * @param string $order
     */
    public function getAbonnementsHistories(string $date, string $nom_actif, string $sort = 'date_transaction', $order = 'desc')
    {
        $abonnements = Abonnement_history::all()->where('user_id', auth()->user()->id);

        if ($date != '') {
            $abonnements = $abonnements->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                                       ->where('date_transaction', '<=', PrivateController::getLastDay($date));
        }

        if ($nom_actif != '') {
            $abonnements = $abonnements->where('nom_actif', $nom_actif);
        }

        return $order == 'asc' ? $abonnements->sortBy($sort) : $abonnements->sortByDesc($sort);
    }



    /*----------*/
    /* Emprunts */
    /*----------*/
    /**
     * Récupère les emprunts
     * @param string $banque
     * @param string $sort
     * @param string $order
     */
    public function getEmprunts(string $banque, string $sort = 'date_debut', $order = 'desc')
    {
        $emprunts = Emprunt::all()->where('user_id', auth()->user()->id);

        if ($banque != '') {
            $emprunts = $emprunts->where('banque', $banque);
        }

        return $order == 'asc' ? $emprunts->sortBy($sort) : $emprunts->sortByDesc($sort);
    }



    /*----------------------------------------------*/
    /* Historique des transactions lié aux emprunts */
    /*----------------------------------------------*/
    /**
     * Récupère les emprunts
     * @param string $nom_actif
     * @param string $banque
     * @param string $sort
     * @param string $order
     */
    public function getEmpruntsHistories(string $nom_actif, string $banque, string $sort = 'date_debut', $order = 'desc')
    {
        $emprunts = Emprunt_history::all()->where('user_id', auth()->user()->id);

        if ($nom_actif != '') {
            $emprunts = $emprunts->where('nom_actif', $nom_actif);
        }

        if ($banque != '') {
            $emprunts = $emprunts->where('banque', $banque);
        }

        return $order == 'asc' ? $emprunts->sortBy($sort) : $emprunts->sortByDesc($sort);
    }



    /*----------*/
    /* Dépenses */
    /*----------*/
    /**
     * Récupère les dépenses
     * @param string $date
     * @param string $nom_actif
     * @param string $sort
     * @param string $order
     */
    public function getDepenses(string $date, string $nom_actif, string $sort = 'date_transaction', $order = 'desc')
    {
        $depenses = Depense::all()->where('user_id', auth()->user()->id);

        if ($date != '') {
            $depenses = $depenses->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                                 ->where('date_transaction', '<=', PrivateController::getLastDay($date));
        }

        if ($nom_actif != '') {
            $depenses = $depenses->where('nom_actif', $nom_actif);
        }

        return $order == 'asc' ? $depenses->sortBy($sort) : $depenses->sortByDesc($sort);
    }



    /*-------*/
    /* Prêts */
    /*-------*/
    /**
     * Récupère les prêts
     * @param string $date
     * @param string $nom_emprunteur
     * @param string $sort
     * @param string $order
     */
    public function getPrets(string $date, string $nom_emprunteur, string $sort = 'date_transaction', $order = 'desc')
    {
        $prets = Pret::all()->where('user_id', auth()->user()->id);

        if ($date != '') {
            $prets = $prets->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                           ->where('date_transaction', '<=', PrivateController::getLastDay($date));
        }

        if ($nom_emprunteur != '') {
            $prets = $prets->where('nom_emprunteur', $nom_emprunteur);
        }

        return $order == 'asc' ? $prets->sortBy($sort) : $prets->sortByDesc($sort);
    }
}