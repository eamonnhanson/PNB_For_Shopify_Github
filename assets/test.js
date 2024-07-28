document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('email-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('input--sections--21194190717258__footer--contactemail').value;
        const messageDiv = document.getElementById('loading-message');
        const resultDiv = document.getElementById('result');
        const bedrijfName = document.getElementById('bedrijf-name');

        // Check if elements exist
        console.log('email:', email);
        console.log('messageDiv:', messageDiv);
        console.log('resultDiv:', resultDiv);
        console.log('bedrijfName:', bedrijfName);

        if (!messageDiv || !resultDiv || !bedrijfName) {
            console.error('One or more elements are not found in the DOM');
            return;
        }

        messageDiv.style.display = 'block';
        resultDiv.style.display = 'none';
        messageDiv.innerHTML = 'Even geduld, je informatie wordt opgehaald...';

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
            messageDiv.style.display = 'none';

            if (data.data && data.data.length > 0) {
                const userRecord = data.data[0];
                const bedrijf = userRecord.Bedrijf || 'Bedrijf not found';
                bedrijfName.innerText = bedrijf;

                resultDiv.style.display = 'block';

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
   
