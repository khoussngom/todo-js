import { model } from './model.js';
import { service } from "./todoService.js";

const input = document.querySelector("#inp");
const ul = document.querySelector("ul");
const btn = document.querySelector("#btn");
const errorlongeur = document.querySelector("#error");

let tache;
let taches = [];
let indexchoisi = null;



function ajouter(tache) {
    if (!tache) return;



    if (indexchoisi === null) {
        const ajoutResult = model.ajouterTaches(tache);
        if (ajoutResult === false) {
            input.value = "";
            input.classList.add("inp");
            errorlongeur.style.display = "block";
            errorlongeur.textContent = "Le titre doit être compris entre 3 et 20 caractères";
            setTimeout(() => {
                error.remove();
                input.classList.remove("inp");
            }, 5000);

        } else {
            taches = ajoutResult;
        }

    } else {
        taches = model.modifierTaches(tache, indexchoisi);
        indexchoisi = null;
        btn.textContent = "+";
    }
}


function afficher() {
    ul.innerHTML = "";
    taches = model.afficherTaches();

    taches.forEach((tache, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="tache">${tache}</span>
            <span>
                <button class="modifier"><i class='bx bxs-edit'></i></button>
                <button class="supprimer"><i class='bx bxs-trash-alt'></i></button>
            </span>`;

        const btnModifier = li.querySelector(".modifier");
        const btnSupprimer = li.querySelector(".supprimer");


        btnModifier.addEventListener("click", () => {
            input.value = tache;
            indexchoisi = index;

        });


        btnSupprimer.addEventListener("click", () => {
            taches = model.supprimerTaches(index);
            afficher();
        });

        ul.appendChild(li);
    });
}

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        tache = input.value;
        ajouter(tache);
        afficher();
        input.value = "";
    }
});


btn.addEventListener("click", function() {
    tache = input.value;
    ajouter(tache);
    afficher();
    input.value = "";
});


afficher();