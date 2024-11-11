document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('item-form');
    const itemInput = document.getElementById('item-input');
    const itemList = document.getElementById('item-list');

    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addItem(itemInput.value);
        itemInput.value = '';
    });

    itemList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            removeItem(e.target.parentElement);
        }
    });

    function addItem(item) {
        const li = document.createElement('li');
        li.textContent = item;
        const button = document.createElement('button');
        button.textContent = 'Remover';
        li.appendChild(button);
        itemList.appendChild(li);
    }

    function removeItem(item) {
        itemList.removeChild(item);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('item-form');
    const itemInput = document.getElementById('item-input');
    const itemList = document.getElementById('item-list');

    // Carregar itens ao carregar a página
    fetchItems();

    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addItem(itemInput.value);
        itemInput.value = '';
    });

    itemList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            removeItem(e.target.parentElement.dataset.id);
        }
    });

    async function fetchItems() {
        const res = await fetch('http://localhost:5000/api/items');
        const items = await res.json();
        items.forEach(item => addItemToDOM(item));
    }

    async function addItem(name) {
        const res = await fetch('http://localhost:5000/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });
        const item = await res.json();
        addItemToDOM(item);
    }

    async function removeItem(id) {
        await fetch(`http://localhost:5000/api/items/${id}`, {
            method: 'DELETE'
        });
        document.querySelector(`[data-id="${id}"]`).remove();
    }

    function addItemToDOM(item) {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.dataset.id = item._id;
        const button = document.createElement('button');
        button.textContent = 'Remover';
        li.appendChild(button);
        itemList.appendChild(li);
    }
});
