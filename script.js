document.addEventListener('DOMContentLoaded', () => {
    const orders = [
        {
            id: 1,
            items: [
                {
                    id: 1,
                    name: 'Classic Burger',
                    bread: { type: 'Sesame Bun', image: './resources/sesame-bun.png' },
                    patty: { type: 'Beef', image: './resources/beef-patty.png' },
                    sauces: [{ type: 'Ketchup', image: './resources/ketchup.png' }],
                    vegetables: [
                        { type: 'Lettuce', image: './resources/lettuce.png' },
                        { type: 'Tomato', image: './resources/tomato.png' },
                    ],
                    quantity: 2,
                },
                {
                    id: 2,
                    name: 'Veggie Burger',
                    bread: { type: 'Whole Wheat Bun', image: './resources/whole-wheat-bun.png' },
                    patty: { type: 'Veggie', image: './resources/veggie-pattie.png' },
                    sauces: [{ type: 'Mustard', image: './resources/mustard.png' }],
                    vegetables: [
                        { type: 'Lettuce', image: './resources/lettuce.png' },
                        { type: 'Onion', image: './resources/onion.png' },
                    ],
                    quantity: 1,
                },
            ],
            status: 'pending',
            timeRemaining: 600,
        },
        {
            id: 2,
            items: [
                {
                    id: 3,
                    name: 'Cheese Burger',
                    bread: { type: 'Brioche Bun', image: './resources/brioche-bun.png' },
                    patty: { type: 'Beef', image: './resources/beef-patty.png' },
                    sauces: [
                        { type: 'Mayo', image: './resources/mayo.png' },
                        { type: 'BBQ', image: './resources/bbq-sauce.png' },
                    ],
                    vegetables: [{ type: 'Pickles', image: './resources/pickles.png' }],
                    quantity: 1,
                },
            ],
            status: 'progress',
            timeRemaining: 300,
        },
        {
            id: 3,
            items: [
                {
                    id: 4,
                    name: 'Spicy Chicken Burger',
                    bread: { type: 'Potato Bun', image: './resources/potato-bun.png' },
                    patty: { type: 'Chicken', image: './resources/chicken-patty.png' },
                    sauces: [{ type: 'Spicy Mayo', image: './resources/spicy-mayo.png' }],
                    vegetables: [
                        { type: 'Lettuce', image: './resources/lettuce.png' },
                        { type: 'Jalapenos', image: './resources/jalapenos.png' },
                    ],
                    quantity: 2,
                },
            ],
            status: 'pending',
            timeRemaining: 450,
        },
        {
            id: 4,
            items: [
                {
                    id: 5,
                    name: 'Mushroom Swiss Burger',
                    bread: { type: 'Pretzel Bun', image: './resources/pretzel-bun.png' },
                    patty: { type: 'Beef', image: './resources/beef-patty.png' },
                    sauces: [{ type: 'Garlic Aioli', image: './resources/garlic-aioli.png' }],
                    vegetables: [
                        { type: 'Sautéed Mushrooms', image: './resources/mushrooms.png' },
                        { type: 'Swiss Cheese', image: './resources/sweese-cheese.png' },
                    ],
                    quantity: 1,
                },
            ],
            status: 'progress',
            timeRemaining: 360,
        },
    ];

    const orderTableBody = document.getElementById('order-table-body');
    const searchInput = document.getElementById('search-input');
    const currentTimeElement = document.getElementById('current-time');

    function updateCurrentTime() {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        currentTimeElement.textContent = now.toLocaleTimeString(undefined, options);
    }

    setInterval(updateCurrentTime, 1000);
    updateCurrentTime();

    let currentFilteredOrders = orders;

    function renderOrders(ordersToRender) {
        currentFilteredOrders = ordersToRender;
        orderTableBody.innerHTML = '';
        if (ordersToRender.length === 0) {
            orderTableBody.innerHTML = '<tr><td colspan="10" class="text-center">No orders found</td></tr>';
            return;
        }
        ordersToRender.forEach(order => {
            order.items.forEach((item, index) => {
                const row = document.createElement('tr');

                let rowContent = '';

                if (index === 0) {
                    rowContent += `
                        <td class="font-medium" rowspan="${order.items.length}">
                            #${order.id}
                        </td>
                    `;
                }

                rowContent += `
                    <td class="font-medium">${item.name}</td>
                    <td class="text-center">
                        <div class="ingredient-cell">
                            <img src="${item.bread.image}" alt="${item.bread.type}" class="ingredient-image">
                            <span class="ingredient-name">${item.bread.type}</span>
                        </div>
                    </td>
                    <td class="text-center">
                        <div class="ingredient-cell">
                            <img src="${item.patty.image}" alt="${item.patty.type}" class="ingredient-image">
                            <span class="ingredient-name">${item.patty.type}</span>
                        </div>
                    </td>
                    <td class="text-center">
                        <div class="flex justify-center space-x-2">
                            ${item.sauces.map(sauce => `
                                <div class="ingredient-cell">
                                    <img src="${sauce.image}" alt="${sauce.type}" class="ingredient-image">
                                    <span class="ingredient-name">${sauce.type}</span>
                                </div>
                            `).join('')}
                        </div>
                    </td>
                    <td class="text-center">
                        <div class="flex justify-center space-x-2">
                            ${item.vegetables.map(vegetable => `
                                <div class="ingredient-cell">
                                    <img src="${vegetable.image}" alt="${vegetable.type}" class="ingredient-image">
                                    <span class="ingredient-name">${vegetable.type}</span>
                                </div>
                            `).join('')}
                        </div>
                    </td>
                    <td class="text-center">${item.quantity}</td>
                `;

                if (index === 0) {
                    rowContent += `
                        <td class="text-center" rowspan="${order.items.length}">
                            <span class="badge badge-${order.status}">
                                ${order.status}
                            </span>
                        </td>
                        <td class="text-center" rowspan="${order.items.length}">
                            <span class="time-remaining ${order.timeRemaining <= 120 ? 'text-red-600' : 'text-blue-600'}">
                                ${formatTime(order.timeRemaining)}
                            </span>
                        </td>
                    `;
                }

                rowContent += `
                    <td class="text-right">
                        <button class="btn btn-outline complete-btn" onclick="completeItem(${order.id}, ${item.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            Complete
                        </button>
                    </td>
                `;

                row.innerHTML = rowContent;
                orderTableBody.appendChild(row);
            });
        });
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    window.completeItem = function(orderId, itemId) {
        const orderIndex = orders.findIndex(order => order.id === orderId);
        if (orderIndex !== -1) {
            orders[orderIndex].items = orders[orderIndex].items.filter(item => item.id !== itemId);
            if (orders[orderIndex].items.length === 0) {
                orders[orderIndex].status = 'completed';
            }
            renderOrders(orders);
        }
    };

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        // If the search term is empty, show all orders
        const filteredOrders = searchTerm ? orders.filter(order =>
            order.items.some(item =>
                item.name.toLowerCase().includes(searchTerm)
            )
        ) : orders;

        renderOrders(filteredOrders);
    });

    // Update time remaining for orders
    setInterval(() => {
        orders.forEach(order => {
            if (order.status !== 'completed') {
                order.timeRemaining = Math.max(0, order.timeRemaining - 1);
                if (order.timeRemaining === 0) {
                    order.status = 'completed';
                }
            }
        });
        
        // Re-apply the current filtered state
        const searchTerm = searchInput.value.toLowerCase();
        const filteredOrders = searchTerm ? orders.filter(order =>
            order.items.some(item =>
                item.name.toLowerCase().includes(searchTerm)
            )
        ) : orders;

        renderOrders(filteredOrders);
    }, 1000);

    renderOrders(orders);
});