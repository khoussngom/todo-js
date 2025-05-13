export const service = (() => {
    return {
        longeurChaine(chaine) {
            return chaine.split('').length;
        },

        dateTime() {
            const date = new Date();
            const jour = date.getDate().toString().padStart(2, "0");
            const mois = (date.getMonth() + 1).toString().padStart(2, "0");
            const annee = date.getFullYear();
            const heures = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            const secondes = date.getSeconds().toString().padStart(2, "0");

            return `${jour}/${mois}/${annee} ${heures}:${minutes}:${secondes}`;
        },

        toutCocher() {
            const checkboxes = document.querySelectorAll('.select');

            checkboxes.forEach(checkbox => checkbox.checked = !checkbox.checked);

            return Array.from(checkboxes).map(checkbox => checkbox.checked);
        }

    }
})()