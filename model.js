import { service } from "./todoService.js";

export const model = (() => {
    let taches = [];

    function ajouterTaches(tache) {
        if (!tache.titre || tache.titre.trim() === "") return [...taches];

        const longueur = service.longeurChaine(tache.titre);
        const longueurDes = service.longeurChaine(tache.description);

        if (longueur < 3 || longueur >= 20) return false
        if (longueurDes >= 100) return true



        taches = [tache, ...taches];
        return [...taches];
    }

    function modifierTaches(newtaches, index) {
        if (!newtaches.titre || isNaN(index) || newtaches.titre.trim() === "" || typeof newtaches.titre !== 'string') return [...taches];
        taches = taches.map((tache, i) => i === index ? newtaches : tache);
        return [...taches]
    }

    function supprimerTaches(index) {
        taches = taches.filter((_, i) => i !== index);
        return [...taches]
    }

    function supprimerListeTaches(listeSuppression) {
        taches = taches.filter((tache, index) => !listeSuppression[index]);

        return [...taches];
    }


    function afficherTaches() {
        return [...taches]
    }

    return { ajouterTaches, modifierTaches, supprimerTaches, afficherTaches, supprimerListeTaches };
})();