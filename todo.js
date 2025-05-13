import { model } from './model.js';
import { service } from "./todoService.js";

const input = document.querySelector("#inp");
const ul = document.querySelector("ul");
const btn = document.querySelector("#btn");
const errorlongeur = document.querySelector("#error");
const errorDes = document.querySelector("#error1");
const selectAll = document.querySelector("#toutSelec");
const suppAll = document.querySelector("#suppAll");

const Description = document.querySelector("#description");




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

        } else if (ajoutResult === true) {
            Description.value = "";
            Description.classList.add("inp");
            errorDes.style.display = "block";
            errorDes.textContent = "La description doit être au maximum 100 caractères";
            setTimeout(() => {
                error.remove();
                Description.classList.remove("inp");
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


selectAll.addEventListener("click", function() {
    const listSuppression = service.toutCocher();
    suppAll.addEventListener("click", function() {
        model.supprimerListeTaches(listSuppression);
        afficher();
    })
})



function afficher() {
    ul.innerHTML = "";
    taches = model.afficherTaches();

    if (taches.length > 0) {
        document.querySelector('.form').style.display = "flex";
    } else {
        document.querySelector('.form').style.display = "none";
    }


    taches.forEach((tache, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" name="selec" id="selec" class="select">
            <span class="tache">
                <span class="titr">${tache.titre}</span>
                <span class="des">${tache.description}</span>
                <span class="date">${tache.date}</span>
            </span>
            <span>
                <button class="modifier"><i class='bx bxs-edit'></i></button>
                <button class="supprimer"><i class='bx bxs-trash-alt'></i></button>
            </span>`;

        const btnModifier = li.querySelector(".modifier");
        const btnSupprimer = li.querySelector(".supprimer");



        const task = li.querySelector(".titr");
        task.addEventListener("click", () => {
            task.classList.toggle("spa");
        });


        btnModifier.addEventListener("click", () => {
            input.value = tache.titre;
            Description.value = tache.description;
            indexchoisi = index;

        });


        btnSupprimer.addEventListener("click", () => {
            taches = model.supprimerTaches(index);
            afficher();
        });

        ul.appendChild(li);
    });
}

function add() {
    const tache = {
        titre: input.value,
        description: Description.value,
        date: service.dateTime()
    }
    ajouter(tache);
    afficher();
    input.value = "";
    Description.value = "";
}

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        add();
    }
});

Description.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        add();
    }
});

btn.addEventListener("click", function() {
    add();
});



afficher();