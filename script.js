let fishRecords = JSON.parse(localStorage.getItem("fishRecords")) || [];

function displayFish() {
    const tableBody = document.getElementById("fishTableBody");
    const emptyMessage = document.getElementById("emptyMessage");

    tableBody.innerHTML = "";

    if (fishRecords.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    fishRecords.forEach((fish, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${fish.name}</td>
            <td>${fish.species}</td>
            <td>${fish.waterType}</td>
            <td>${fish.quantity}</td>
            <td>${fish.tankNumber}</td>
            <td>${fish.status}</td>
            <td>
                <button class="edit-btn" onclick="editFish(${fish.id})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteFish(${fish.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function saveFish() {
    const fishId = document.getElementById("fishId").value;
    const name = document.getElementById("fishName").value.trim();
    const species = document.getElementById("species").value.trim();
    const waterType = document.getElementById("waterType").value;
    const quantity = document.getElementById("quantity").value;
    const tankNumber = document.getElementById("tankNumber").value.trim();
    const status = document.getElementById("status").value;

    if (
        !name ||
        !species ||
        !waterType ||
        !quantity ||
        !tankNumber ||
        !status
    ) {
        alert("Please fill in all fields.");
        return;
    }

    if (fishId) {

        const fish = fishRecords.find(
            fish => fish.id == fishId
        );

        fish.name = name;
        fish.species = species;
        fish.waterType = waterType;
        fish.quantity = quantity;
        fish.tankNumber = tankNumber;
        fish.status = status;

        alert("Fish record updated successfully!");

    } else {

        const newFish = {
            id: Date.now(),
            name: name,
            species: species,
            waterType: waterType,
            quantity: quantity,
            tankNumber: tankNumber,
            status: status
        };

        fishRecords.push(newFish);

        alert("Fish added successfully!");
    }

    localStorage.setItem(
        "fishRecords",
        JSON.stringify(fishRecords)
    );

    clearForm();
    displayFish();
}

function editFish(id) {
    const fish = fishRecords.find(
        fish => fish.id === id
    );

    if (!fish) {
        return;
    }

    document.getElementById("fishId").value = fish.id;
    document.getElementById("fishName").value = fish.name;
    document.getElementById("species").value = fish.species;
    document.getElementById("waterType").value = fish.waterType;
    document.getElementById("quantity").value = fish.quantity;
    document.getElementById("tankNumber").value = fish.tankNumber;
    document.getElementById("status").value = fish.status;

    document.getElementById("saveButton").textContent =
        "Update Fish";

    document.getElementById("cancelButton").style.display =
        "block";
}

function deleteFish(id) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this fish record?"
    );

    if (!confirmDelete) {
        return;
    }

    fishRecords = fishRecords.filter(
        fish => fish.id !== id
    );

    localStorage.setItem(
        "fishRecords",
        JSON.stringify(fishRecords)
    );

    displayFish();

    alert("Fish record deleted successfully!");
}

function cancelEdit() {
    clearForm();
}

function clearForm() {
    document.getElementById("fishId").value = "";
    document.getElementById("fishName").value = "";
    document.getElementById("species").value = "";
    document.getElementById("waterType").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("tankNumber").value = "";
    document.getElementById("status").value = "";

    document.getElementById("saveButton").textContent =
        "Add Fish";

    document.getElementById("cancelButton").style.display =
        "none";
}

displayFish();