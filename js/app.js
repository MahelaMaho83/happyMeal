// app.js

// Charger les recettes depuis un fichier JSON
async function chargerRecettes() {
    try {
        const response = await fetch('./recipes.json'); // Chemin corrigé
        if (!response.ok) {
            throw new Error("Erreur HTTP: " + response.status);
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
        alert(recette.nom + "a été ajouté à vos favoris");
    }
}

// Initialiser l'application au chargement du document
document.addEventListener('DOMContentLoaded', initialiserApp);
