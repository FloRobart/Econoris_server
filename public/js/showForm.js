/* Fonction pour afficher le formulaire d'ajout d'un salaire, épargne ou autre */
function showForm(message, buttonText, action) {
    /* Récupération du formulaire et du bouton */
    let form = document.getElementById('form');
    let button = document.getElementById('button');
    let formButton = document.getElementById('formButton');

    /* Affichage et masquage du formulaire */
    if (form.classList.contains('hidden'))
    {
        /* Affichage du formulaire */
        form.classList.remove('hidden');
        form.action = action;

        /* Changement du texte du bouton */
        button.textContent = 'Masquer le formulaire';
        formButton.textContent = buttonText;
    }
    else
    {
        /* Masquage du formulaire */
        form.classList.add('hidden');

        /* Changement du texte du bouton */
        button.textContent = message;
    }
}