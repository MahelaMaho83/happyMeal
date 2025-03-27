// shoppingList.js gestion de la liste de courses

let listeCourses = JSON.parse(localStorage.getItem("listeCourses")) || []; // Récupère la liste de courses depuis le localStorage

// Fonction pour synchroniser la liste de courses avec le serveur
async function synchroniserListeCourses() {
    try {
        const response = await fetch('/api/listeCourses');
        if (response.ok) {
            listeCourses = await response.json();
            localStorage.setItem("listeCourses", JSON.stringify(listeCourses));
            afficherListeCourses();
        } else {
            console.error('Erreur lors de la synchronisation avec le serveur');
        }
    } catch (error) {
        console.error('Erreur réseau:', error);
    }
}

// Fonction pour ajouter un ingrédient à la liste de courses
async function ajouterIngredientListeCourse(nomIngredient) {
    try {
        const response = await fetch('/api/listeCourses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredient: nomIngredient })
        });
        if (response.ok) {
            alert(nomIngredient + "a été ajouté à votre liste de courses");
            await synchroniserListeCourses();
        } else {
            console.error('Erreur lors de l\'ajout de l\'ingrédient');
        }
    } catch (error) {
        console.error('Erreur réseau:', error);
    }
}
// Fonction pour supprimer un ingrédient de la liste de courses
async function supprimerIngredientListeCourse(nomIngredient) {
    try {
        const response = await fetch(`/api/listeCourses/${encodeURIComponent(nomIngredient)}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert(`${nomIngredient} a été supprimé de votre liste de courses`);
            await synchroniserListeCourses();
        } else {
            console.error('Erreur lors de la suppression de l\'ingrédient');
            alert('Une erreur est survenue lors de la suppression.');
        }
    } catch (error) {
        console.error('Erreur réseau:', error);
        alert('Erreur de connexion. Vérifiez votre connexion Internet.');
    }
}

// Fonction pour générer un fichier texte contenant la liste de courses
function genererListeCourses() {
    const blob = new Blob([listeCourses.join('\n')], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'liste_courses.txt';
    link.click();
}

// Fonction pour afficher la liste de courses sur la page
function afficherListeCourses() {
    const listeContainer = document.getElementById('shopping-list-container');
    listeContainer.innerHTML = '';
    listeCourses.forEach(ingredient => {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.innerHTML = `
            <p>${ingredient} <button onclick="supprimerIngredientListeCourse('${ingredient}')">Supprimer</button></p>
        `;
        listeContainer.appendChild(ingredientDiv);
    });
}

// Fonction pour afficher les recettes sous forme de cartes
function afficherRecettesEnCard(recettes) {
    const recettesContainer = document.getElementById('recipes-container');
    recettesContainer.innerHTML = '';
    recettes.forEach(recette => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'recipe-card';
        cardDiv.innerHTML = `
            <h3>${recette.nom}</h3>
            <p>${recette.description}</p>
            <ul>
                ${recette.ingredients.map(ingredient => <li>${ingredient}</li>).join('')}
            </ul>
            <button onclick="ajouterIngredientListeCourse('${recette.ingredients.join(', ')}')">Ajouter les ingrédients</button>
        `;
        recettesContainer.appendChild(cardDiv);
    });
}

// Exemple d'utilisation (à remplacer par un appel réel à une API ou une source de données)
const exemplesRecettes = [
    {
        nom: 'Salade César',
        description: 'Une délicieuse salade avec du poulet, de la laitue et une sauce crémeuse.',
        ingredients: ['Poulet', 'Laitue', 'Croutons', 'Parmesan', 'Sauce César']
    },
    {
        nom: 'Pâtes Carbonara',
        description: 'Des pâtes crémeuses avec du bacon et du parmesan.',
        ingredients: ['Pâtes', 'Bacon', 'Parmesan', 'Crème', 'Oeufs']
    }
];
afficherRecettesEnCard(exemplesRecettes);
