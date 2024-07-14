document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.vehicle-select').forEach(select => {
        select.addEventListener('change', function() {
            updateFuelOptions(this);
        });
    });

    document.querySelectorAll('.home-day').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            handleHomeOption(this);
        });
    });
});

function updateFuelOptions(vehicleSelect) {
    const row = vehicleSelect.closest('.form-row, .lease-form-row');
    const fuelSelect = row.querySelector('.fuel-select');
    const kilometersInput = row.querySelector('.kilometers-input') || row.querySelector('input[name="lease_kilometers"]');
    const vehicleType = vehicleSelect.value;

    // Clear existing options
    while (fuelSelect.options.length > 0) {
        fuelSelect.remove(0);
    }

    let options = [];
    if (vehicleType === 'Auto' || vehicleType === 'Motor') {
        options = ['Diesel', 'Benzine', 'Overige brandstoffen', 'Hybride', '100% Elektrisch'];
    } else if (vehicleType === 'Bromfiets') {
        options = ['Diesel', 'Benzine'];
    } else if (vehicleType === 'Fiets') {
        options = ['nvt']; // Not applicable
    } else {
        options = ['nvt']; // Not applicable for other types like 'Geen'
    }

    // Populate new options
    options.forEach(option => {
        let newOption = new Option(option, option);
        fuelSelect.appendChild(newOption);
    });

    // Handle special case for "Geen" option
    if (vehicleType === 'Geen') {
        kilometersInput.value = 0; // Set kilometers to 0
        kilometersInput.setAttribute('readonly', true); // Make field readonly
    } else {
        kilometersInput.removeAttribute('readonly'); // Allow input again if "Geen" is not selected
        kilometersInput.value = ''; // Clear the kilometers input
    }
}

function handleHomeOption(checkbox) {
    const row = checkbox.closest('.form-row');
    const vehicleSelect = row.querySelector('.vehicle-select');
    const fuelSelect = row.querySelector('.fuel-select');
    const kilometersInput = row.querySelector('.kilometers-input');

    if (checkbox.checked) {
        vehicleSelect.value = 'Geen';
        updateFuelOptions(vehicleSelect); // Ensure we update the fuel options and kilometers based on the new vehicle select state
    } else {
        vehicleSelect.value = ''; // Reset vehicle select
        updateFuelOptions(vehicleSelect);
    }
}
