document.addEventListener('DOMContentLoaded', function () {
    const formData = {
        email: null,
        zohoData: null,
        userInputs: {},
    };

    function handleEmailForm() {
        const emailForm = document.getElementById('email-form');
        if (!emailForm) {
            console.error('Email form element not found');
            return;
        }

        emailForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const emailInput = document.getElementById('input--sections--21194190717258__footer--contactemail');
            if (!emailInput) {
                console.error('Email input element not found');
                return;
            }

            const email = emailInput.value;
            formData.email = email;

            const loadingMessage = document.getElementById('loading-message');
            if (loadingMessage) {
                loadingMessage.style.display = 'block';
            }

            console.log(`Fetching data for email: ${email}`);

            fetch('https://zoho-calls-e0dc91dd8cf4.herokuapp.com/fetch-achternaam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            })
                .then((response) => {
                    console.log('Response received from Zoho CRM:', response);
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Data received from Zoho CRM:', data);
                    formData.zohoData = data.data[0];
                    if (loadingMessage) {
                        loadingMessage.style.display = 'none';
                    }
                    console.log('Updated formData with Zoho data:', formData);

                    // Continue to the next form section
                    if (emailForm) emailForm.style.display = 'none';
                    const introductionSection = document.getElementById('introduction-section');
                    if (introductionSection) introductionSection.style.display = 'block';
                })
                .catch((error) => {
                    console.error('Error:', error);
                    if (loadingMessage) {
                        loadingMessage.style.display = 'none';
                    }
                    alert('There was an error fetching data from Zoho. Please try again later.');
                });
        });
    }

    function handleIntroductionSection() {
        const agreeBtn = document.getElementById('agree-btn');
        if (!agreeBtn) {
            console.error('Agree button not found');
            return;
        }

        agreeBtn.addEventListener('click', function () {
            console.log('Agree button clicked');
            const introductionSection = document.getElementById('introduction-section');
            if (introductionSection) introductionSection.style.display = 'none';
            const loginForm = document.getElementById('login-form');
            if (loginForm) loginForm.style.display = 'block';
        });
    }

    function handleUserInputForm() {
        const loginForm = document.getElementById('login-form');
        if (!loginForm) {
            console.error('User input form element not found');
            return;
        }

        const submitTransportInfoButton = document.getElementById('submit-transport-info');
        if (!submitTransportInfoButton) {
            console.error('Submit transport info button not found');
            return;
        }

        submitTransportInfoButton.addEventListener('click', function (event) {
            console.log('Submit transport info button clicked');
            event.preventDefault();

            const daysOfWeek = [
                'zondag',
                'maandag',
                'dinsdag',
                'woensdag',
                'donderdag',
                'vrijdag',
                'zaterdag',
            ];
            daysOfWeek.forEach((day) => {
                const vehicle = document.querySelector(`select[name="vehicle_${day}"]`);
                const fuel = document.querySelector(`select[name="fuel_${day}"]`);
                const kilometers = document.querySelector(`input[name="kilometers_${day}"]`);

                if (vehicle && fuel && kilometers) {
                    formData.userInputs[`vehicle_${day}`] = vehicle.value;
                    formData.userInputs[`fuel_${day}`] = fuel.value;
                    formData.userInputs[`kilometers_${day}`] = kilometers.value;
                } else {
                    console.error(`Input elements for ${day} not found`);
                }
            });

            console.log('User inputs captured:', formData.userInputs);

            // Continue to the next form section
            if (loginForm) loginForm.style.display = 'none';
            const newQuestionSection = document.getElementById('new-question-section');
            if (newQuestionSection) newQuestionSection.style.display = 'block';
        });
    }

    function handleNewQuestionSection() {
        const newQuestionForm = document.getElementById('new-question-section');
        if (!newQuestionForm) {
            console.error('New question form element not found');
            return;
        }

        const submitNewQuestionBtn = document.getElementById('submit-new-question');
        if (!submitNewQuestionBtn) {
            console.error('Submit new question button not found');
            return;
        }

        submitNewQuestionBtn.addEventListener('click', function () {
            const leaseAnswer = document.querySelector('input[name="lease"]:checked');
            if (leaseAnswer) {
                console.log(`Lease answer: ${leaseAnswer.value}`);
                formData.userInputs.lease = leaseAnswer.value;

              if (leaseAnswer.value === 'yes') {
    const leaseDetailsSection = document.getElementById('lease-details-section');
    if (leaseDetailsSection) leaseDetailsSection.style.display = 'block';
} else {
    // Send data to webhook for the "Nee" case
    const finalPayload = {
        ...formData.zohoData,
        ...formData.userInputs,
    };

    fetch('https://testtest-wpm-06c0781a39f1.herokuapp.com/proxy-zoho-flow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalPayload),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error sending data to Zoho Creator: ' + response.statusText);
        }
        return response.json();
    })
    .then((data) => {
        console.log('Data sent to Zoho Creator successfully:', data);
    })
    .catch((error) => {
        console.error('Error sending data to Zoho Creator:', error);
    });

    const thankYouMessage = document.getElementById('thank-you-message');
    if (thankYouMessage) thankYouMessage.style.display = 'block';
}

            } else {
                console.error('Lease answer not found');
            }
        });
    }

    function handleLeaseDetailsSection() {
        const submitLeaseDetailsBtn = document.getElementById('submit-lease-details');
        if (!submitLeaseDetailsBtn) {
            console.error('Submit lease details button not found');
            return;
        }

        submitLeaseDetailsBtn.addEventListener('click', function () {
            const leaseVehicle = document.querySelector('select[name="lease_vehicle"]');
            const leaseFuel = document.querySelector('select[name="lease_fuel"]');
            const leaseKilometers = document.querySelector('input[name="lease_kilometers"]');

            if (leaseVehicle && leaseFuel && leaseKilometers) {
                formData.userInputs.leaseDetails = {
                    vehicle: leaseVehicle.value,
                    fuel: leaseFuel.value,
                    kilometers: leaseKilometers.value,
                };
                console.log('Lease details captured:', formData.userInputs.leaseDetails);

                const thankYouMessage = document.getElementById('thank-you-message');
                if (thankYouMessage) thankYouMessage.style.display = 'block';

                // Prepare for final submission
                const finalPayload = {
                    ...formData.zohoData,
                    ...formData.userInputs,
                };

                console.log('Final payload being sent to Heroku:', finalPayload);

                fetch('https://testtest-wpm-06c0781a39f1.herokuapp.com/proxy-zoho-flow', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(finalPayload),
                })
                    .then((response) => {
                        console.log('Response received from Zoho Flow proxy server:', response);
                        if (!response.ok) {
                            throw new Error('Error sending data to Zoho Creator: ' + response.statusText);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log('Data sent to Zoho Creator successfully:', data);
                    })
                    .catch((error) => {
                        console.error('Error sending data to Zoho Creator:', error);
                    });
            } else {
                console.error('Lease details input elements not found');
            }
        });
    }

    handleEmailForm();
    handleIntroductionSection();
    handleUserInputForm();
    handleNewQuestionSection();
    handleLeaseDetailsSection();
});
