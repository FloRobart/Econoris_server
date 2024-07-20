<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Salaire;
use App\Models\Epargne;
use App\Models\Investissement;


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
        return view('private.accueil');
    }




    /*===========*/
    /* Dashboard */
    /*===========*/
    /*----------*/
    /* Salaires */
    /*----------*/
    /* Affiche des salaires */
    /**
     * Affiche la page des salaires
     */
    public function salaires(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        /* Récupération des salaires */
        $salaires = PrivateController::getSalaires($sort, $order);
        
        /* Récupération des épargnes */
        $epargnes = PrivateController::getEpargnes($sort);
        
        /* Récupération des investissements */
        $investissements = PrivateController::getInvestissements($sort);

        return view('private.salaire', compact('salaires', 'epargnes', 'investissements'));
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
        $salaires = PrivateController::getSalairesDate($date, $sort);

        /* Récupération des épargnes du mois */
        $epargnes = PrivateController::getEpargnesDate($date, $sort);
        
        /* Récupération des investissements du mois */
        $investissements = PrivateController::getInvestissementsDate($date, 'date_transaction');

        return view('private.salaire', compact('salaires', 'epargnes', 'investissements'));
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
        $salaires = PrivateController::getSalairesEmployeur($employeur, $sort, $order);

        /* Récupération des épargnes du mois */
        $epargnes = PrivateController::getEpargnes($sort);
        
        /* Récupération des investissements du mois */
        $investissements = PrivateController::getInvestissements($sort);

        return view('private.salaire', compact('salaires', 'epargnes', 'investissements'));
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
        $salaires = PrivateController::getSalairesDateEmployeur($date, $employeur, $sort);

        /* Récupération des épargnes du mois */
        $epargnes = PrivateController::getEpargnesDate($date, $sort);
        
        /* Récupération des investissements du mois */
        $investissements = PrivateController::getInvestissementsDate($date, $sort);

        return view('private.salaire', compact('salaires', 'epargnes', 'investissements'));
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
        $salaire->employeur = $request->employeur;
        
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
        $salaire->employeur = $request->employeur;

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
    /* Affiche des épargnes */
    /**
     * Affiche la page des épargnes
     */
    public function epargnes(Request $request)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $epargnes = PrivateController::getEpargnes($sort, $order);
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

        $epargnes = PrivateController::getEpargnesDate($date, $sort, $order);
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

        $epargnes = PrivateController::getEpargnesBanque($banque, $sort, $order);
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

        $epargnes = PrivateController::getEpargnesCompte($compte, $sort, $order);
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

        $epargnes = PrivateController::getEpargnesDateBanque($date, $banque, $sort, $order);
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

        $epargnes = PrivateController::getEpargnesDateCompte($date, $compte, $sort, $order);
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

        $epargnes = PrivateController::getEpargnesBanqueCompte($banque, $compte, $sort, $order);
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

        $epargnes = PrivateController::getEpargnesDateBanqueCompte($date, $banque, $compte, $sort, $order);
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
        $epargne->banque = $request->banque;
        $epargne->compte = $request->compte;
        
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
        $epargne->banque = $request->banque;
        $epargne->compte = $request->compte;

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
    /* Affiche des investissements */
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
        $investissements      = PrivateController::getInvestissements($sort, $order);

        return view('private.investissement', compact('investissements', 'type_investissement'));
    }

    public function investissementsDate(Request $request, string $date)
    {
        setlocale(LC_ALL, 'fr_FR.UTF8', 'fr_FR','fr','fr','fra','fr_FR@euro');

        $sort = $request->query('sort') ?? 'date_transaction';
        $order = $request->query('order') ?? 'desc';

        $type_investissement  = 'investissements';
        $investissements      = PrivateController::getInvestissementsDate($date, $sort, $order);

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
            $investissements      = PrivateController::getInvestissements($sort, $order);
        }
        else
        {
            $type_investissement  = $type;
            $investissements      = PrivateController::getInvestissementsType($type_investissement, $sort, $order);
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
        $investissements      = PrivateController::getInvestissementsNom($nom_actif, $sort, $order);

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
            $investissements      = PrivateController::getInvestissementsDate($date, $sort, $order);
        }
        else
        {
            $type_investissement  = $type;
            $investissements      = PrivateController::getInvestissementsDateType($date, $type_investissement, $sort, $order);
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
        $investissements      = PrivateController::getInvestissementsDateNom($date, $nom_actif, $sort, $order);

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
            $investissements      = PrivateController::getInvestissementsNom($nom_actif, $sort, $order);
        }
        else
        {
            $type_investissement  = $type;
            $investissements      = PrivateController::getInvestissementsTypeNom($type_investissement, $nom_actif, $sort, $order);
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
        $investissements = PrivateController::getInvestissementsDateTypeNom($date, $type_investissement, $nom_actif, $sort, $order);

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
        $investissement->type_investissement = $type_investissement;
        $investissement->nom_actif           = $request->nom_actif;
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
        $investissement->type_investissement = $request->type_investissement;
        $investissement->nom_actif           = $request->nom_actif;
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
     * Récupère tous les salaires
     */
    public function getSalaires(string $sort = 'date_transaction', $order = 'desc')
    {
        $salaires = Salaire::all()->where('user_id', auth()->user()->id);

        return $order == 'asc' ? $salaires->sortBy($sort) : $salaires->sortByDesc($sort);
    }

    /**
     * Récupère les salaires d'une même date
     */
    public function getSalairesDate(string $date, string $sort = 'date_transaction', $order = 'desc')
    {
        $salaires = Salaire::all()->where('user_id', auth()->user()->id)
                                  ->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                                  ->where('date_transaction', '<=', PrivateController::getLastDay($date));

        return $order == 'asc' ? $salaires->sortBy($sort) : $salaires->sortByDesc($sort);
    }

    /**
     * Récupère les salaires d'un même employeur
     */
    public function getSalairesEmployeur(string $employeur, string $sort = 'date_transaction', $order = 'desc')
    {
        $salaires = Salaire::all()->where('user_id', auth()->user()->id)
                                  ->where('employeur', $employeur);

        return $order == 'asc' ? $salaires->sortBy($sort) : $salaires->sortByDesc($sort);
    }

    /**
     * Récupère les salaires d'une même date et d'un même employeur
     */
    public function getSalairesDateEmployeur(string $date, string $employeur, string $sort = 'date_transaction', $order = 'desc')
    {
        $salaires = Salaire::all()->where('user_id', auth()->user()->id)
                                  ->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                                  ->where('date_transaction', '<=', PrivateController::getLastDay($date))
                                  ->where('employeur', $employeur);

        return $order == 'asc' ? $salaires->sortBy($sort) : $salaires->sortByDesc($sort);
    }



    /*---------*/
    /* Épargne */
    /*---------*/
    /**
     * Récupère toutes les épargnes
     */
    public function getEpargnes(string $sort = 'date_transaction', $order = 'desc')
    {
        $epargnes = Epargne::all()->where('user_id', auth()->user()->id);

        return $order == 'asc' ? $epargnes->sortBy($sort) : $epargnes->sortByDesc($sort);
    }

    /**
     * Récupère les épargnes d'une même date
     */
    public function getEpargnesDate(string $date, string $sort = 'date_transaction', $order = 'desc')
    {
        $epargnes = Epargne::all()->where('user_id', auth()->user()->id)
                             ->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                             ->where('date_transaction', '<=', PrivateController::getLastDay($date));

        return $order == 'asc' ? $epargnes->sortBy($sort) : $epargnes->sortByDesc($sort);
    }

    /**
     * Récupère les épargnes d'une même banque
     */
    public function getEpargnesBanque(string $banque, string $sort = 'date_transaction', $order = 'desc')
    {
        $epargnes = Epargne::all()->where('user_id', auth()->user()->id)
                             ->where('banque', $banque);

        return $order == 'asc' ? $epargnes->sortBy($sort) : $epargnes->sortByDesc($sort);
    }

    /**
     * Récupère les épargnes d'un même compte
     */
    public function getEpargnesCompte(string $compte, string $sort = 'date_transaction', $order = 'desc')
    {
        $epargnes = Epargne::all()->where('user_id', auth()->user()->id)
                             ->where('compte', $compte);

        return $order == 'asc' ? $epargnes->sortBy($sort) : $epargnes->sortByDesc($sort);
    }

    /**
     * Récupère les épargnes d'une même date et d'une même banque
     */
    public function getEpargnesDateBanque(string $date, string $banque, string $sort = 'date_transaction', $order = 'desc')
    {
        $epargnes = Epargne::all()->where('user_id', auth()->user()->id)
                             ->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                             ->where('date_transaction', '<=', PrivateController::getLastDay($date))
                             ->where('banque', $banque);

        return $order == 'asc' ? $epargnes->sortBy($sort) : $epargnes->sortByDesc($sort);
    }

    /**
     * Récupère les épargnes d'une même date et d'un même compte
     */
    public function getEpargnesDateCompte(string $date, string $compte, string $sort = 'date_transaction', $order = 'desc')
    {
        $epargnes = Epargne::all()->where('user_id', auth()->user()->id)
                             ->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                             ->where('date_transaction', '<=', PrivateController::getLastDay($date))
                             ->where('compte', $compte);

        return $order == 'asc' ? $epargnes->sortBy($sort) : $epargnes->sortByDesc($sort);
    }

    /**
     * Récupère les épargnes d'une même banque et d'un même compte
     */
    public function getEpargnesBanqueCompte(string $banque, string $compte, string $sort = 'date_transaction', $order = 'desc')
    {
        $epargnes = Epargne::all()->where('user_id', auth()->user()->id)
                             ->where('banque', $banque)
                             ->where('compte', $compte);

        return $order == 'asc' ? $epargnes->sortBy($sort) : $epargnes->sortByDesc($sort);
    }

    /**
     * Récupère les épargnes d'une même date, d'une même banque et d'un même compte
     */
    public function getEpargnesDateBanqueCompte(string $date, string $banque, string $compte, string $sort = 'date_transaction', $order = 'desc')
    {
        $epargnes = Epargne::all()->where('user_id', auth()->user()->id)
                             ->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                             ->where('date_transaction', '<=', PrivateController::getLastDay($date))
                             ->where('banque', $banque)
                             ->where('compte', $compte);

        return $order == 'asc' ? $epargnes->sortBy($sort) : $epargnes->sortByDesc($sort);
    }



    /*----------------*/
    /* Investissement */
    /*----------------*/
    /**
     * Récupère tous les investissements
     */
    public function getInvestissements(string $sort = 'date_transaction', $order = 'desc')
    {
        $investissements = Investissement::all()->where('user_id', auth()->user()->id);

        return $order == 'asc' ? $investissements->sortBy($sort) : $investissements->sortByDesc($sort);
    }

    /**
     * Récupère tous les investissements d'une même date
     */
    public function getInvestissementsDate(string $date, string $sort = 'date_transaction', $order = 'desc')
    {
        $investissements = Investissement::all()->where('user_id', auth()->user()->id)
                                    ->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                                    ->where('date_transaction', '<=', PrivateController::getLastDay($date));

        return $order == 'asc' ? $investissements->sortBy($sort) : $investissements->sortByDesc($sort);
    }

    /**
     * Récupère tous les investissements d'un même type
     */
    public function getInvestissementsType(string $type, string $sort = 'date_transaction', $order = 'desc')
    {
        $investissements = Investissement::all()->where('user_id', auth()->user()->id)
                                    ->where('type_investissement', $type);

        return $order == 'asc' ? $investissements->sortBy($sort) : $investissements->sortByDesc($sort);
    }

    /**
     * Récupère tous les investissements d'un même nom d'actif
     */
    public function getInvestissementsNom(string $nom_actif, string $sort = 'date_transaction', $order = 'desc')
    {
        $investissements = Investissement::all()->where('user_id', auth()->user()->id)
                                    ->where('nom_actif', $nom_actif);

        return $order == 'asc' ? $investissements->sortBy($sort) : $investissements->sortByDesc($sort);
    }

    /**
     * Récupère les investissements d'une même date et d'un même type
     */
    public function getInvestissementsDateType(string $date, string $type, string $sort = 'date_transaction', $order = 'desc')
    {
        $investissements = Investissement::all()->where('user_id', auth()->user()->id)
                                    ->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                                    ->where('date_transaction', '<=', PrivateController::getLastDay($date))
                                    ->where('type_investissement', $type);

        return $order == 'asc' ? $investissements->sortBy($sort) : $investissements->sortByDesc($sort);
    }

    /**
     * Récupère les investissements d'une même date et d'un même nom d'actif
     */
    public function getInvestissementsDateNom(string $date, string $nom_actif, string $sort = 'date_transaction', $order = 'desc')
    {
        $investissements = Investissement::all()->where('user_id', auth()->user()->id)
                                    ->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                                    ->where('date_transaction', '<=', PrivateController::getLastDay($date))
                                    ->where('nom_actif', $nom_actif);

        return $order == 'asc' ? $investissements->sortBy($sort) : $investissements->sortByDesc($sort);
    }

    /**
     * Récupère les investissements d'un même type et d'un même nom d'actif
     */
    public function getInvestissementsTypeNom(string $type, string $nom_actif, string $sort = 'date_transaction', $order = 'desc')
    {
        $investissements = Investissement::all()->where('user_id', auth()->user()->id)
                                    ->where('type_investissement', $type)
                                    ->where('nom_actif', $nom_actif);
                                    
        return $order == 'asc' ? $investissements->sortBy($sort) : $investissements->sortByDesc($sort);
    }

    /**
     * Récupère les investissements d'une même date, d'un même type et d'un même nom d'actif
     */
    public function getInvestissementsDateTypeNom(string $date, string $type, string $nom_actif, string $sort = 'date_transaction', $order = 'desc')
    {
        $investissements = Investissement::all()->where('user_id', auth()->user()->id)
                                    ->where('date_transaction', '>=', PrivateController::getFirstDay($date))
                                    ->where('date_transaction', '<=', PrivateController::getLastDay($date))
                                    ->where('type_investissement', $type)
                                    ->where('nom_actif', $nom_actif);

        return $order == 'asc' ? $investissements->sortBy($sort) : $investissements->sortByDesc($sort);
    }
}