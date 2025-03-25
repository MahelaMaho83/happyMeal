// shoppingList.js

let listeCourses = JSON.parse(localStorage.getItem("listeCourses")) || []; // Récupère la liste de courses depuis le localStorage

// Fonction pour ajouter un ingrédient à la liste de courses
function ajouterIngredientListeCourse(nomIngredient) {
    if (!listeCourses.includes(nomIngredient)) {
        listeCourses.push(nomIngredient);
        localStorage.setItem("listeCourses", JSON.stringify(listeCourses));
        alert(`${nomIngredient} a été ajouté à votre liste de courses`);
    }
}

// Fonction pour supprimer un ingrédient de la liste de courses
function supprimerIngredientListeCourse(nomIngredient) {
    const index = listeCourses.indexOf(nomIngredient);
    if (index > -1) {
        listeCourses.splice(index, 1);
        localStorage.setItem("listeCourses", JSON.stringify(listeCourses));
        alert(`${nomIngredient} a été supprimé de votre liste de courses`);
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
