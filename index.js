let lists = [];

    function createList() {
        const listName = document.getElementById('newListName').value;
        if (listName) {
            lists.push({ name: listName, contacts: [] });
            updateListsDisplay();
            updateListsDropdown();
            document.getElementById('newListName').value = '';
        }
    }

    function addContact() {
        const name = document.getElementById('contactName').value;
        const phone = document.getElementById('contactPhone').value;
        const email = document.getElementById('contactEmail').value;
        const note = document.getElementById('contactNote').value;
        const listIndex = document.getElementById('contactList').value;

        if (name && phone && listIndex !== '') {
            const contact = { name, phone, email, note };
            lists[listIndex].contacts.push(contact);
            updateListsDisplay();
            clearContactForm();
        }
    }

    function updateListsDisplay() {
        const listsContainer = document.getElementById('lists');
        listsContainer.innerHTML = '';

        lists.forEach((list, listIndex) => {
            const listDiv = document.createElement('div');
            listDiv.className = 'list yellow-accent';
            listDiv.innerHTML = `<h3>${list.name}</h3>`;

            list.contacts.forEach((contact, contactIndex) => {
                const contactDiv = document.createElement('div');
                contactDiv.className = 'contact';
                contactDiv.innerHTML = `
                    <strong>${contact.name}</strong><br>
                    Phone: ${contact.phone}<br>
                    Email: ${contact.email}<br>
                    Note: ${contact.note}<br>
                    <button onclick="editContact(${listIndex}, ${contactIndex})">Editar</button>
                    <button onclick="deleteContact(${listIndex}, ${contactIndex})">X</button>
                `;
                listDiv.appendChild(contactDiv);
            });

            listsContainer.appendChild(listDiv);
        });
    }

    function updateListsDropdown() {
        const dropdown = document.getElementById('contactList');
        dropdown.innerHTML = '<option value="">Seleccionar una Lista</option>';
        lists.forEach((list, index) => {
            dropdown.innerHTML += `<option value="${index}">${list.name}</option>`;
        });
    }

    function clearContactForm() {
        document.getElementById('contactName').value = '';
        document.getElementById('contactPhone').value = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactNote').value = '';
        document.getElementById('contactList').value = '';
    }

    function searchContacts() {
        const searchTerm = document.getElementById('searchBar').value.toLowerCase();
        const listsContainer = document.getElementById('lists');
        listsContainer.innerHTML = '';

        lists.forEach((list, listIndex) => {
            const filteredContacts = list.contacts.filter(contact => 
                contact.name.toLowerCase().includes(searchTerm) ||
                contact.phone.includes(searchTerm) ||
                contact.email.toLowerCase().includes(searchTerm)
            );

            if (filteredContacts.length > 0) {
                const listDiv = document.createElement('div');
                listDiv.className = 'list yellow-accent';
                listDiv.innerHTML = `<h3>${list.name}</h3>`;

                filteredContacts.forEach((contact, contactIndex) => {
                    const contactDiv = document.createElement('div');
                    contactDiv.className = 'contact';
                    contactDiv.innerHTML = `
                        <strong>${contact.name}</strong><br>
                        Phone: ${contact.phone}<br>
                        Email: ${contact.email}<br>
                        Note: ${contact.note}<br>
                        <button onclick="editContact(${listIndex}, ${contactIndex})">Edit</button>
                        <button onclick="deleteContact(${listIndex}, ${contactIndex})">Delete</button>
                    `;
                    listDiv.appendChild(contactDiv);
                });

                listsContainer.appendChild(listDiv);
            }
        });
    }

    function editContact(listIndex, contactIndex) {
        const contact = lists[listIndex].contacts[contactIndex];
        document.getElementById('contactName').value = contact.name;
        document.getElementById('contactPhone').value = contact.phone;
        document.getElementById('contactEmail').value = contact.email;
        document.getElementById('contactNote').value = contact.note;
        document.getElementById('contactList').value = listIndex;

        lists[listIndex].contacts.splice(contactIndex, 1);
        updateListsDisplay();
    }

    function deleteContact(listIndex, contactIndex) {
        lists[listIndex].contacts.splice(contactIndex, 1);
        updateListsDisplay();
    }

    function saveContacts() {
        const blob = new Blob([JSON.stringify(lists)], {type: "application/json;charset=utf-8"});
        saveAs(blob, "phonebook_contacts.json");
    }

    function loadContacts() {
        const fileInput = document.getElementById('loadFile');
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                lists = JSON.parse(e.target.result);
                updateListsDisplay();
                updateListsDropdown();
            };
            reader.readAsText(file);
        }
    }

    // Initialize
    updateListsDisplay();
    updateListsDropdown();