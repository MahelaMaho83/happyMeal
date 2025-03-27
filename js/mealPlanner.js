let planning = JSON.parse(localStorage.getItem("planning")) || [];  // Récupère le planning des repas depuis le localStorage

// Fonction pour ajouter une recette au planning
function ajouterAuPlanning(nomRecette) {
    const recette = recettes.find(r => r.nom === nomRecette); // Utilise directement le tableau "recettes"
    if (!planning.includes(recette)) {
        planning.push(recette);
        localStorage.setItem("planning", JSON.stringify(planning));
        alert(recette.nom + "a été ajouté à votre planning");
    }
}

// Fonction pour afficher le planning des repas
function afficherPlanning() {
    const planningContainer = document.getElementById('planning-container');
    planningContainer.innerHTML = '';
    planning.forEach(recette => {
        const recetteDiv = document.createElement('div');
        recetteDiv.innerHTML = `
            <h3>${recette.nom}</h3>
            <button onclick="supprimerDuPlanning('${recette.nom}')">Supprimer du planning</button>
        `;
        planningContainer.appendChild(recetteDiv);
    });
}

// Fonction pour supprimer une recette du planning
function supprimerDuPlanning(nomRecette) {
    const recette = getRecetteParNom(nomRecette);
    const index = planning.indexOf(recette);
    if (index > -1) {
        planning.splice(index, 1);
        localStorage.setItem("planning", JSON.stringify(planning));
        alert(recette.nom + "a été supprimé de votre planning");
    }
}
APP.JS
// app.js

// Charger les recettes depuis un fichier JSON
async function chargerRecettes() {
    try {
        const response = await fetch('./recipes.json'); // Chemin corrigé
        if (!response.ok) {
            throw new Error("Erreur HTTP:" + response.status);
        }
        const data = await response.json();
        initialiserRecettes(data.recettes); // Accès à la clé "recettes"
    } catch (error) {
        console.error("Erreur lors du chargement des recettes :", error);
    }
}

// Fonction pour initialiser les recettes dans l'application
function initialiserRecettes(recettes) {
    // Exemple : Stocker les recettes dans une variable globale ou les afficher
    window.recettes = recettes; // Stockage global
    afficherRecettes(); // Appeler la fonction pour afficher les recettes
}

// Charger les recettes et initialiser les autres composants
function initialiserApp() {
    chargerRecettes();  // Charger les recettes depuis recipes.js
    afficherRecettes(); // Afficher toutes les recettes depuis recipes.js

    // Afficher les listes et plannings
    afficherListeCourses();  // Depuis shoppingList.js
    afficherPlanning();      // Depuis mealPlanner.js
}

// Fonction pour afficher les détails d'une recette
function afficherDetailsRecette(nomRecette) {
    const recette = getRecetteParNom(nomRecette);  // Depuis recipes.js
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
        <h2>${recette.nom}</h2>
        <p><strong>Catégorie:</strong> ${recette.categorie}</p>
        <p><strong>Temps de préparation:</strong> ${recette.temps_preparation}</p>
        <h3>Ingrédients</h3>
        <ul>
            ${recette.ingredients.map(ingredient => <li>${ingredient.quantite} ${ingredient.nom} <button onclick="ajouterIngredientListeCourse('${ingredient.nom}')">Ajouter à la liste de courses</button></li>).join('')}
        </ul>
        <h3>Étapes</h3>
        <ol>
            ${recette.etapes.map(etape => <li>${etape}</li>).join('')}
        </ol>
        <button onclick="ajouterAuxFavoris('${recette.nom}')">Ajouter aux favoris</button>
    `;
}

// Ajouter une recette aux favoris
function ajouterAuxFavoris(nomRecette) {
    const recette = getRecetteParNom(nomRecette);  // Depuis recipes.js
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    if (!favoris.includes(recette)) {
        favoris.push(recette);
        localStorage.setItem("favoris", JSON.stringify(favoris));
        alert(recette.nom + " a été ajouté à vos favoris");
    }
}

// Initialiser l'application au chargement du document
document.addEventListener('DOMContentLoaded', initialiserApp);

