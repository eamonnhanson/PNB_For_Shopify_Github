document.addEventListener('DOMContentLoaded', function() {
  // Function to handle form 1
  function handleForm1() {
      document.getElementById('email-form').addEventListener('submit', function(event) {
          event.preventDefault();

          const email = document.getElementById('input--sections--21194190717258__footer--contactemail').value;
          const loadingMessage = document.getElementById('loading-message');
          const achternaamDisplay = document.getElementById('achternaam-display');
          const introductionSection = document.getElementById('introduction-section');
          const loginForm = document.getElementById('login-form');

          loadingMessage.style.display = 'block';
          achternaamDisplay.style.display = 'none';
          introductionSection.style.display = 'none';
          loginForm.style.display = 'none';

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
              loadingMessage.style.display = 'none';

              if (data.data && data.data.length > 0) {
                  const userRecord = data.data[0];
                  const bedrijf = userRecord.Bedrijf || 'Bedrijf not found';
                  achternaamDisplay.innerText = bedrijf;

                  if (userRecord.Teller < 6) {
                      achternaamDisplay.style.display = 'block';
                      introductionSection.style.display = 'block';
                      loginForm.style.display = 'block';

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
                      achternaamDisplay.innerText = 'Teller value is 6 or greater';
                      achternaamDisplay.style.display = 'block';
                  }
              } else {
                  achternaamDisplay.innerText = 'No matching records found';
                  achternaamDisplay.style.display = 'block';
              }
          })
          .catch(error => {
              console.error('Error:', error);
              loadingMessage.style.display = 'none';
              achternaamDisplay.innerText = 'De informatie kan niet opgehaald worden. Stuur een email naar info@planteenboom.nu om de fout te melden.';
              achternaamDisplay.style.display = 'block';
          });
      });
  }

  // Function for form 2 (originally test.js)
  function handleForm2() {
      document.getElementById('email-form').addEventListener('submit', function(event) {
          event.preventDefault();

          const email = document.getElementById('input--sections--21194190717258__footer--contactemail').value;
          const loadingMessage = document.getElementById('loading-message');
          const resultDiv = document.getElementById('result');
          const bedrijfName = document.getElementById('bedrijf-name');

          loadingMessage.style.display = 'block';
          resultDiv.style.display = 'none';
          loadingMessage.innerHTML = 'Even geduld, je informatie wordt opgehaald...';

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
              loadingMessage.style.display = 'none';

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

                  return fetch('https://testtest-wpm-06c0781a39f1.herokuapp.com/proxy-zoho-flow', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(payload)
                  });
              } else {
                  bedrijfName.innerText = 'No matching records found';
                  resultDiv.style.display = 'block';
                  return null;
              }
          })
          .then(response => {
              if (response) {
                  console.log('Response received from Zoho Flow proxy server:', response);
                  if (!response.ok) {
                      throw new Error('Error sending data to Zoho Creator: ' + response.statusText);
                  }
                  return response.json();
              }
          })
          .then(data => {
              if (data) {
                  console.log('Data sent to Zoho Creator successfully:', data);
              }
          })
          .catch(error => {
              console.error('Error:', error);
              loadingMessage.style.display = 'none';
              bedrijfName.innerText = 'De informatie kan niet opgehaald worden. Stuur een email naar info@planteenboom.nu om de fout te melden.';
              resultDiv.style.display = 'block';
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
  document.getElementById('submit-transport-info').addEventListener('click', function() {
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('new-question-section').style.display = 'block';
  });

  document.getElementById('submit-new-question').addEventListener('click', function() {
      const leaseAnswer = document.querySelector('input[name="lease"]:checked').value;
      console.log(`Lease answer: ${leaseAnswer}`);

      if (leaseAnswer === 'yes') {
          document.getElementById('lease-details-section').style.display = 'block';
      } else {
          document.getElementById('thank-you-message').style.display = 'block';
      }
  });

  document.getElementById('submit-lease-details').addEventListener('click', function() {
      document.getElementById('thank-you-message').style.display = 'block';
  });

  document.getElementById('more-info-checkbox').addEventListener('change', function() {
      const loginForm = document.getElementById('login-form');
      if (this.checked) {
          loginForm.style.display = 'block';
      } else {
          loginForm.style.display = 'none';
      }
  });
});
