const container = document.getElementById('userDataContainer');
const reloadButton = document.getElementById('reloadButton');

async function fetchAndDisplayUsers() {
    container.innerHTML = '<p>Fetching data from API...</p>';
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const users = await response.json();

        container.innerHTML = ''; 

        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';

            const { street, suite, city, zipcode } = user.address;
            const addressText = `${street}, ${suite}, ${city} ${zipcode}`;

            userCard.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Address:</strong> ${addressText}</p>
            `;

            container.appendChild(userCard);
        });

    } catch (error) {
        console.error('Fetch error:', error);
        
        container.innerHTML = `
            <div class="error-message">
                <h2>⚠️ Failed to Load Data</h2>
                <p>An error occurred while fetching the user data:</p>
                <p><strong>Error Details:</strong> ${error.message}</p>
                <p>Check your network connection and click 'Reload Users'.</p>
            </div>
        `;
    }
}

fetchAndDisplayUsers();

reloadButton.addEventListener('click', fetchAndDisplayUsers);
