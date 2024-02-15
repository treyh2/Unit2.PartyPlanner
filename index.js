document.addEventListener('DOMContentLoaded', () => {
    const baseURL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/room5/events';
    
    const partyForm = document.getElementById('partyForm');
    const partyList = document.getElementById('partyList');


    const fetchParties = async () => {
try {
const response = await fetch(baseURL);
const responseBody = await response.json();

if (Array.isArray(responseBody.data)) {
    // Clear the current list
    partyList.innerHTML = '';

    responseBody.data.forEach(party => {
    const li = document.createElement('li');
    li.innerHTML = `${party.name} - ${party.date} - ${party.time} - ${party.location} - ${party.description} <button data-id="${party._id}" class="deleteButton">Delete</button>`;
    partyList.appendChild(li);
    });

    document.querySelectorAll('.deleteButton').forEach(button => {
        button.addEventListener('click', deleteParty);
    });
} else {
    console.error('Invalid response format. Expected an array within the "data" property.');
        }
    } catch (error) {
        console.error('Error fetching parties:', error);
    }
};
const deleteParty = async (event) => {
    const partyId = event.target.dataset.id;

    try {
      await fetch(`${baseURL}/${partyId}`, {
          method: 'DELETE',
      });

      fetchParties();
    } catch (error) {
        console.error('Error deleting party:', error);
    }
};

partyForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        name: document.getElementById('partyName').value,
        date: document.getElementById('partyDate').value,
        time: document.getElementById('partyTime').value,
        location: document.getElementById('partyLocation').value,
        description: document.getElementById('partyDescription').value,
    };

    try {
      await fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(formData),
      });

      fetchParties();

      partyForm.reset();
    } catch (error) {
        console.error('Error adding party:', error);
    }
});

fetchParties();
        });
