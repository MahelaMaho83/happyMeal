// recipes.js

let recettes = [];  // Tableau contenant toutes les recettes

// Charger les recettes depuis le fichier JSON (ou un fichier local si disponible)
function chargerRecettes() {
    fetch('scripts/recipes.json')  // Le fichier contenant les recettes JSON
        .then(response => response.json())
        .then(data => {
            recettes = data;
        })
        .catch(error => console.error('Erreur lors du chargement des recettes:', error));
}

// Retourne une recette par son nom
function getRecetteParNom(nomRecette) {
    return recettes.find(r => r.nom === nomRecette);
}

// Fonction pour afficher une sélection aléatoire de 3 recettes sur la page d'accueil
function afficherRecettesAleatoires() {
    const recettesAleatoires = [];
    while (recettesAleatoires.length < 3) {
        const index = Math.floor(Math.random() * recettes.length);
        if (!recettesAleatoires.includes(recettes[index])) {
            recettesAleatoires.push(recettes[index]);
        }
    }
    return recettesAleatoires;
}

// Fonction pour afficher la liste complète des recettes
function afficherRecettes() {
    const recettesContainer = document.getElementById('recettes-container');
    recettesContainer.innerHTML = '';
    recettes.forEach(recette => {
        const recetteDiv = document.createElement('div');
        recetteDiv.classList.add('recette');
        recetteDiv.innerHTML = `
            <h3>${recette.nom}</h3>
            <p>Catégorie : ${recette.categorie}</p>
            <p>Temps de préparation : ${recette.temps_preparation}</p>
            <button onclick="afficherDetailsRecette('${recette.nom}')">Voir les détails</button>
        `;
        recettesContainer.appendChild(recetteDiv);
    });
}
