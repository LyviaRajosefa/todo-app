const input = document.querySelector('#ajout');
const ajouter= document.querySelector("#btn-ajouter");
const affichage = document.querySelector("#affichage");
const supprAll = document.querySelector("#suppr-all")
const tout = document.querySelector("#tout");
const active = document.querySelector("#active");
const complete = document.querySelector("#complete");

let taches = JSON.parse(localStorage.getItem("taches"));
if (taches == null) {
    taches = [];
}

function afficherTaches(filtre = "tout") {
    affichage.innerHTML = "";
    taches.forEach((tache, index) => {
        if (filtre === "active" && tache.fait) return;
        if (filtre === "complete" && !tache.fait) return;
        const p = document.createElement("p");
        const checkbox = document.createElement("input");
        checkbox.type="checkbox";
        checkbox.checked = tache.fait;
        const label = document.createElement("label");
        label.textContent = tache.text;
        label.prepend(checkbox);
       
        if (tache.fait) {
            label.classList.add("barre");
        } else {
            label.classList.remove("barre");
        }

        const btnSuppr = document.createElement("button");
        btnSuppr.textContent = "Supprimer"; 
        checkbox.addEventListener("change", () =>{
            taches[index].fait = checkbox.checked;
            localStorage.setItem("taches", JSON.stringify(taches));
            afficherTaches(filtre);
        })
     
         btnSuppr.addEventListener("click", () => {
            taches.splice(index,1);
            localStorage.setItem("taches", JSON.stringify(taches));
            afficherTaches(filtre);
        });
        p.appendChild(label);
        p.appendChild(btnSuppr);
        
        affichage.appendChild(p);
    });
   
}

ajouter.addEventListener("click", () => {
   
    const text = input.value.trim(); 
    if(text === "") return;
    taches.push({text: text, fait: false});
    localStorage.setItem("taches", JSON.stringify(taches));
    afficherTaches();
    input.value ="";
    
});

supprAll.addEventListener("click", () => {
    taches.splice(0, taches.length);
    localStorage.setItem("taches", JSON.stringify(taches));
    afficherTaches();
})

tout.addEventListener("click", () =>{
    complete.classList.remove("couleur");
    active.classList.remove("couleur");
    tout.classList.add("couleur");
    afficherTaches("tout");
})
active.addEventListener("click", () => {
    affichage.innerHTML = ""; 
    tout.classList.remove("couleur");
    complete.classList.remove("couleur");
    active.classList.add("couleur");
    afficherTaches("active");
});

complete.addEventListener("click", () => {
    affichage.innerHTML = "";
    tout.classList.remove("couleur");
    active.classList.remove("couleur");
    complete.classList.add("couleur");
    afficherTaches("complete");
});

afficherTaches();