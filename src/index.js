document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("dog-form");
    const table = document.getElementById("table-body");
    
    fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(data => renderList(data))

function renderList(data) {


data.forEach(dog => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.textContent = dog.name;
    const breedCell = document.createElement("td");
    breedCell.textContent = dog.breed;
    const sexCell = document.createElement("td")
    sexCell.textContent = dog.sex
    const editButton = document.createElement("button");
    editButton.textContent = "Edit"

    editButton.addEventListener("click", () => {
    form.dogId = dog.id;
    form.name.value = dog.name;
    form.breed.value = dog.breed;
    form.sex.value = dog.sex; 
});
   

    row.appendChild(nameCell);
    row.appendChild(sexCell);
    row.appendChild(breedCell);
    row.appendChild(editButton)
    table.appendChild(row);
});
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

        const updatedDog = {
            id: form.dogId,
            name: form.name.value,
            breed: form.breed.value,
            sex: form.sex.value
        };
    
    fetch(`http://localhost:3000/dogs/${updatedDog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedDog)
    })
    .then(response => response.json())
    .then(data => {
        const tableRow = table.querySelector(`[data-dog-id="${data.id}"]`);
        tableRow.querySelector("td:nth-child(1)").textContent = data.name;
        tableRow.querySelector("td:nth-child(2)").textContent = data.sex;
        tableRow.querySelector("td:nth-child(3)").textContent = data.breed;
    });
        form.reset();
    });
});