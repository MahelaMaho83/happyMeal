// recipes.js gestion des recettes

let recettes = []; // Tableau contenant toutes les recettes

// Charger les recettes depuis le fichier JSON
async function fetchrecipes() {
    try {
        const response = await fetch('./recipes.json');
        if (response.ok) {
            const data = await response.json();
            recettes = data.recettes;
            afficherRecettes(); // Afficher toutes les recettes sur recipes.html
        } else {
            console.error('Erreur lors du chargement des recettes');
        }
    } catch (error) {
        console.error('Erreur réseau:', error);
    }
}

// Retourne une recette par son nom
function getRecetteParNom(nomRecette) {
    return recettes.find(r => r.nom === nomRecette);
}

// Fonction pour afficher une sélection aléatoire de 3 recettes sur la page d'accueil
async function afficherRecettesAleatoires() {
    try {
        const response = await fetch('./recipes.json');
        if (response.ok) {
            const data = await response.json();
            const recettesAleatoires = [];
            while (recettesAleatoires.length < 3) {
                const index = Math.floor(Math.random() * data.recettes.length);
                if (!recettesAleatoires.includes(data.recettes[index])) {
                    recettesAleatoires.push(data.recettes[index]);
                }
            }
            const recipesContainer = document.getElementById('recipesContainer');
            recipesContainer.innerHTML = '';
            recettesAleatoires.forEach(recette => {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'recipe-card';
                cardDiv.innerHTML = `
                    <h3>${recette.nom}</h3>
                    <p>${recette.categorie}</p>
                    <p>Temps de préparation : ${recette.temps_preparation}</p>
                `;
                recipesContainer.appendChild(cardDiv);
            });
        } else {
            console.error('Erreur lors du chargement des recettes aléatoires');
        }
    } catch (error) {
        console.error('Erreur réseau:', error);
    }
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

// Charger les recettes au chargement de la page
if (document.getElementById('recettes-container')) {
    fetchrecipes();
}
if (document.getElementById('recipesContainer')) {
    afficherRecettesAleatoires();
}
