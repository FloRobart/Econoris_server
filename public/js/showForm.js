/* Fonction pour afficher le formulaire d'ajout d'un salaire, épargne ou autre */
function showForm(message) {
    /* Récupération du formulaire et du bouton */
    let form = document.getElementById('form');
    let button = document.getElementById('button');

    /* Affichage et masquage du formulaire */
    if (form.classList.contains('hidden'))
    {
        /* Affichage du formulaire */
        form.classList.remove('hidden');

        /* Changement du texte du bouton */
        button.textContent = 'Masquer le formulaire';
    }
    else
    {
        /* Masquage du formulaire */
        form.classList.add('hidden');

        /* Changement du texte du bouton */
        button.textContent = message;
    }
}