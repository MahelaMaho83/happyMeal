// mealPlanner.js

let planning = JSON.parse(localStorage.getItem("planning")) || [];  // Récupère le planning des repas depuis le localStorage

// Fonction pour ajouter une recette au planning
function ajouterAuPlanning(nomRecette) {
    const recette = getRecetteParNom(nomRecette);  // Utilise la fonction de recipes.js pour obtenir la recette
    if (!planning.includes(recette)) {
        planning.push(recette);
        localStorage.setItem("planning", JSON.stringify(planning));
        alert(`${recette.nom} a été ajouté à votre planning`);
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
        alert(`${recette.nom} a été supprimé de votre planning`);
    }
}
