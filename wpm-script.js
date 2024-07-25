document.addEventListener('DOMContentLoaded', function() {
    const formData = {
        email: null,
        zohoData: null,
        userInputs: {}
    };

    function handleEmailForm() {
        const emailForm = document.getElementById('email-form');
        if (!emailForm) {
            console.error('Email form element not found');
            return;
        }

        emailForm.addEventListener('submit', function(event) {
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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })
            .then(response => {
                console.log('Response received from Zoho CRM:', response);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received from Zoho CRM:', data);
                formData.zohoData = data.data[0];
                if (loadingMessage) {
                    loadingMessage.style.display = 'none';
                }
                console.log('Updated formData with Zoho data:', formData);

                // Continue to the next form section
                if (emailForm) emailForm.style.display = 'none';
                const userInputForm = document.getElementById('user-input-form');
                if (userInputForm) userInputForm.style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                if (loadingMessage) {
                    loadingMessage.style.display = 'none';
                }
                alert('There was an error fetching data from Zoho. Please try again later.');
            });
        });
    }

    function handleUserInputForm() {
        const userInputForm = document.getElementById('user-input-form');
        if (!userInputForm) {
            console.error('User input form element not found');
            return;
        }

        userInputForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const daysOfWeek = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
            daysOfWeek.forEach(day => {
                const vehicle = document.getElementById(`vehicle_${day}`);
                const fuel = document.getElementById(`fuel_${day}`);
                const kilometers = document.getElementById(`kilometers_${day}`);

                if (vehicle && fuel && kilometers) {
                    formData.userInputs[day] = {
                        vehicle: vehicle.value,
                        fuel: fuel.value,
                        kilometers: kilometers.value
                    };
                } else {
                    console.error(`Input elements for ${day} not found`);
                }
            });

            console.log('User inputs captured:', formData.userInputs);

            // Continue to the next form section
            if (userInputForm) userInputForm.style.display = 'none';
            const newQuestionForm = document.getElementById('new-question-form');
            if (newQuestionForm) newQuestionForm.style.display = 'block';
        });
    }

    function handleHiddenSections() {
        const newQuestionForm = document.getElementById('new-question-form');
        if (!newQuestionForm) {
            console.error('New question form element not found');
            return;
        }

        newQuestionForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const lease = document.querySelector('input[name="lease"]:checked');
            if (lease) {
                formData.userInputs.lease = lease.value;
                console.log('Lease info captured:', formData.userInputs.lease);

                // Continue to the next form section
                if (newQuestionForm) newQuestionForm.style.display = 'none';
                const leaseDetailsForm = document.getElementById('lease-details-form');
                if (leaseDetailsForm) leaseDetailsForm.style.display = 'block';
            } else {
                console.error('Lease input element not found');
            }
        });

        const leaseDetailsForm = document.getElementById('lease-details-form');
        if (!leaseDetailsForm) {
            console.error('Lease details form element not found');
            return;
        }

        leaseDetailsForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const leaseVehicle = document.getElementById('lease_vehicle');
            const leaseFuel = document.getElementById('lease_fuel');
            const leaseKilometers = document.getElementById('lease_kilometers');

            if (leaseVehicle && leaseFuel && leaseKilometers) {
                formData.userInputs.leaseDetails = {
                    vehicle: leaseVehicle.value,
                    fuel: leaseFuel.value,
                    kilometers: leaseKilometers.value
                };
                console.log('Lease details captured:', formData.userInputs.leaseDetails);

                // Prepare for final submission
                if (leaseDetailsForm) leaseDetailsForm.style.display = 'none';
                const thankYouMessage = document.getElementById('thank-you-message');
                if (thankYouMessage) thankYouMessage.style.display = 'block';
            } else {
                console.error('Lease details input elements not found');
            }
        });
    }

    function handleFinalSubmission() {
        const finalSubmitButton = document.getElementById('final-submit');
        if (!finalSubmitButton) {
            console.error('Final submit button not found');
            return;
        }

        finalSubmitButton.addEventListener('click', function(event) {
            event.preventDefault();

            const finalPayload = {
                ...formData.zohoData,
                userInputs: formData.userInputs
            };

            if (!finalPayload) {
                console.error('Final payload is undefined');
                return;
            }

            console.log('Final payload being sent to Heroku:', finalPayload);

            fetch('https://testtest-wpm-06c0781a39f1.herokuapp.com/proxy-zoho-flow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(finalPayload)
            })
            .then(response => {
                console.log('Response received from Zoho Flow proxy server:', response);
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error('Error sending data to Zoho Creator: ' + response.statusText + ' - ' + text);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Data sent to Zoho Creator successfully:', data);
            })
            .catch(error => {
                console.error('Error sending data to Zoho Creator:', error);
            });
        });
    }

    handleEmailForm();
    handleUserInputForm();
    handleHiddenSections();
    handleFinalSubmission();

    // Function to handle form 1 (unchanged)
    function handleForm1() {
        const emailForm = document.getElementById('email-form');
        if (!emailForm) {
            console.error('Email form element not found');
            return;
        }

        emailForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const emailInput = document.getElementById('input--sections--21194190717258__footer--contactemail');
            if (!emailInput) {
                console.error('Email input element not found');
                return;
            }

            const email = emailInput.value;
            const loadingMessage = document.getElementById('loading-message');
            const achternaamDisplay = document.getElementById('achternaam-display');
            const introductionSection = document.getElementById('introduction-section');
            const loginForm = document.getElementById('login-form');

            if (loadingMessage) loadingMessage.style.display = 'block';
            if (achternaamDisplay) achternaamDisplay.style.display = 'none';
            if (introductionSection) introductionSection.style.display = 'none';
            if (loginForm) loginForm.style.display = 'none';

            console.log(`Fetching data for email: ${email}`);

            fetch('https://zoho-calls-e0dc91dd8cf4.herokuapp.com/fetch-achternaam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })
            .then(response => {
                console.log('Response received from Zoho CRM:', response);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received from Zoho CRM:', data);
                if (loadingMessage) loadingMessage.style.display = 'none';

                if (data.data && data.data.length > 0) {
                    const userRecord = data.data[0];
                    const bedrijf = userRecord.Bedrijf || 'Bedrijf not found';
                    if (achternaamDisplay) achternaamDisplay.innerText = bedrijf;

                    if (userRecord.Teller < 6) {
                        if (achternaamDisplay) achternaamDisplay.style.display = 'block';
                        if (introductionSection) introductionSection.style.display = 'block';
                        if (loginForm) loginForm.style.display = 'block';

                        const payload = {
                            Voornaam: userRecord.Voornaam,
                            Achternaam: userRecord.Achternaam,
                            Email: userRecord.Email,
                            Teller: userRecord.Teller,
                            Bedrijf: userRecord.Bedrijf
                        };

                        console.log('Sending data to Zoho Flow proxy server:', payload);

                        fetch('https://testtest-wpm-06c0781a39f1.herokuapp.com/proxy-zoho-flow', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(payload)
                        })
                        .then(response => {
                            console.log('Response received from Zoho Flow proxy server:', response);
                            if (!response.ok) {
                                throw new Error('Error sending data to Zoho Creator: ' + response.statusText);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Data sent to Zoho Creator successfully:', data);
                        })
                        .catch(error => {
                            console.error('Error sending data to Zoho Creator:', error);
                        });
                    } else {
                        if (achternaamDisplay) achternaamDisplay.innerText = 'Teller value is 6 or greater';
                        if (achternaamDisplay) achternaamDisplay.style.display = 'block';
                    }
                } else {
                    if (achternaamDisplay) achternaamDisplay.innerText = 'No matching records found';
                    if (achternaamDisplay) achternaamDisplay.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                if (loadingMessage) loadingMessage.style.display = 'none';
                if (achternaamDisplay) achternaamDisplay.innerText = 'De informatie kan niet opgehaald worden. Stuur een email naar info@planteenboom.nu om de fout te melden.';
                if (achternaamDisplay) achternaamDisplay.style.display = 'block';
            });
        });
    }

    // Call the appropriate function based on the context
    if (document.getElementById('email-form')) {
        handleForm1();
    } else {
        handleForm2();
    }

    // Additional event listeners for the other parts of the form
    const submitTransportInfoButton = document.getElementById('submit-transport-info');
    if (submitTransportInfoButton) {
        submitTransportInfoButton.addEventListener('click', function() {
            const loginForm = document.getElementById('login-form');
            if (loginForm) loginForm.style.display = 'none';
            const newQuestionSection = document.getElementById('new-question-section');
            if (newQuestionSection) newQuestionSection.style.display = 'block';
        });
    }

    const submitNewQuestionButton = document.getElementById('submit-new-question');
    if (submitNewQuestionButton) {
        submitNewQuestionButton.addEventListener('click', function() {
            const leaseAnswer = document.querySelector('input[name="lease"]:checked');
            if (leaseAnswer) {
                console.log(`Lease answer: ${leaseAnswer.value}`);

                if (leaseAnswer.value === 'yes') {
                    const leaseDetailsSection = document.getElementById('lease-details-section');
                    if (leaseDetailsSection) leaseDetailsSection.style.display = 'block';
                } else {
                    const thankYouMessage = document.getElementById('thank-you-message');
                    if (thankYouMessage) thankYouMessage.style.display = 'block';
                    const payload = this.dataset.payload ? JSON.parse(this.dataset.payload) : null;

                    if (!payload) {
                        console.error('Payload is undefined');
                        return;
                    }

                    console.log('Sending final payload to Zoho Flow proxy server:', payload);

                    fetch('https://testtest-wpm-06c0781a39f1.herokuapp.com/proxy-zoho-flow', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    })
                    .then(response => {
                        console.log('Response received from Zoho Flow proxy server:', response);
                        if (!response.ok) {
                            throw new Error('Error sending data to Zoho Creator: ' + response.statusText);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Data sent to Zoho Creator successfully:', data);
                    })
                    .catch(error => {
                        console.error('Error sending data to Zoho Creator:', error);
                    });
                }
            } else {
                console.error('Lease answer not found');
            }
        });
    }

    const submitLeaseDetailsButton = document.getElementById('submit-lease-details');
    if (submitLeaseDetailsButton) {
        submitLeaseDetailsButton.addEventListener('click', function() {
            const thankYouMessage = document.getElementById('thank-you-message');
            if (thankYouMessage) thankYouMessage.style.display = 'block';
            const payload = document.getElementById('submit-new-question').dataset.payload ? JSON.parse(document.getElementById('submit-new-question').dataset.payload) : null;

            if (!payload) {
                console.error('Payload is undefined');
                return;
            }

            console.log('Sending final payload to Zoho Flow proxy server:', payload);

            fetch('https://testtest-wpm-06c0781a39f1.herokuapp.com/proxy-zoho-flow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                console.log('Response received from Zoho Flow proxy server:', response);
                if (!response.ok) {
                    throw new Error('Error sending data to Zoho Creator: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data sent to Zoho Creator successfully:', data);
            })
            .catch(error => {
                console.error('Error sending data to Zoho Creator:', error);
            });
        });
    }

    const moreInfoCheckbox = document.getElementById('more-info-checkbox');
    if (moreInfoCheckbox) {
        moreInfoCheckbox.addEventListener('change', function() {
            const loginForm = document.getElementById('login-form');
            if (loginForm) {
                if (this.checked) {
                    loginForm.style.display = 'block';
                } else {
                    loginForm.style.display = 'none';
                }
            } else {
                console.error('Login form element not found');
            }
        });
    }
});
