import { service } from "./todoService.js";

export const model = (() => {
    let taches = [];

    function ajouterTaches(tache) {
        if (!tache || tache.trim() === "") return [...taches];

        const longeur = service.longeurChaine(tache)

        if (longeur < 3 || longeur >= 20) return false


        taches = [tache, ...taches];
        return [...taches];
    }

    function modifierTaches(newtaches, index) {
        if (!newtaches || isNaN(index) || newtaches.trim() === "" || typeof newtaches !== 'string') return [...taches];
        taches = taches.map((tache, i) => i === index ? newtaches : tache);
        return [...taches]
    }

    function supprimerTaches(index) {
        taches = taches.filter((_, i) => i !== index);
        return [...taches]
    }

    function afficherTaches() {
        return [...taches]
    }

    return { ajouterTaches, modifierTaches, supprimerTaches, afficherTaches };
})();