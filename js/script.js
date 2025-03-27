// Charger les recettes aléatoires sur la page d'accueil
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('recipesContainer')) {
        afficherRecettesAleatoires();
    }
});