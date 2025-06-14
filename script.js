document.addEventListener('DOMContentLoaded', () => {
    // --- Menu Data ---
    // Store image paths relative to your 'assets' folder
    // If an item doesn't have a specific image, you can set it to null
    // or use a generic placeholder image path.
    const menuData = {
        tradicionais: [
            {
                name: "Portuguesa I",
                description: "Mussarela, presunto cozido, calabresa, cebola e ovos cozidos.",
                image: null // Example: "assets/portuguesa1.jpg" if you have one
            },
            {
                name: "Portuguesa II",
                description: "Mussarela, presunto cozido, milho, ervilha, ovos cozidos e palmitos cobertos com Mussarela.",
                image: null
            },
            {
                name: "Margherita",
                description: "Mussarela coberta com folhas de manjericão fresco, molho de tomate especial, salpicada com parmesão.",
                image: null // Example: "assets/margherita.jpg"
            },
            {
                name: "Napolitana",
                description: "Mussarela, delicioso molho de tomate da casa, rodelas de tomate fresco, salpicada com parmesão e alho.",
                image: null
            },
            {
                name: "Calabresa",
                description: "Calabresa fatiada de primeira qualidade, coberta com rodelas de cebola e azeitonas.",
                image: null // Example: "assets/calabresa_cebola.jpg"
            }
        ],
        especiais: [
            {
                name: "Parma Crocante",
                description: "Molho de tomate especial, mussarela de búfala, presunto parma crocante, lascas de parmesão e um toque de rúcula fresca.",
                image: "img/pizzapequena1.jpg", // Your Parma image
                imageStyle: "polaroid" // To identify for specific styling if needed
            },
            {
                name: "Caprese Suprema",
                description: "Molho de tomate italiano, mussarela de búfala fresca, rodelas de tomate caqui, generosas porções de pesto de manjericão artesanal e folhas de manjericão.",
                image: "img/pizzapequena2.jpg", // Your Caprese image
                imageStyle: "polaroid"
            },
            {
                name: "Quatro Queijos Especiais",
                description: "Uma harmoniosa combinação de mussarela, provolone defumado, gorgonzola cremoso e catupiry original.",
                image: null // Example: "assets/quatro_queijos.jpg"
            }
        ],
        doces: [
            {
                name: "Chocolate com Morango",
                description: "Deliciosa camada de chocolate ao leite derretido, coberta com morangos frescos e chocolate granulado.",
                image: null // Example: "assets/chocolate_morango.jpg"
            },
            {
                name: "Banana com Canela",
                description: "Fatias de banana caramelizadas, polvilhadas com açúcar e canela, sobre uma base de mussarela doce.",
                image: null
            }
        ],
        bebidas: [
            {
                name: "Refrigerante Lata",
                description: "Coca-Cola, Guaraná Antarctica, Fanta Laranja, Sprite. (350ml)",
                image: null
            },
            {
                name: "Refrigerante 2L",
                description: "Coca-Cola, Guaraná Antarctica. (2 Litros)",
                image: null
            },
            {
                name: "Água Mineral",
                description: "Com gás ou sem gás. (500ml)",
                image: null
            },
            {
                name: "Cerveja Long Neck",
                description: "Heineken, Budweiser, Stella Artois.",
                image: null
            }
        ]
    };

    const categoriesList = document.querySelector('.menu-categories ul');
    const categoryItems = categoriesList.querySelectorAll('li');
    const menuItemsDisplay = document.querySelector('.menu-items-display');

    function displayMenuItems(category) {
        menuItemsDisplay.innerHTML = ''; // Clear current items

        const itemsToDisplay = menuData[category];

        if (!itemsToDisplay || itemsToDisplay.length === 0) {
            menuItemsDisplay.innerHTML = '<p>Nenhum item nesta categoria por enquanto.</p>';
            return;
        }

        itemsToDisplay.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('menu-item');

            let imageHtml = '';
            if (item.image) {
                const imageClass = item.imageStyle === 'polaroid' ? 'menu-item-image' : 'menu-item-image full';
                imageHtml = `
                    <div class="${imageClass}">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                `;
            }

            itemElement.innerHTML = `
                ${imageHtml}
                <div class="menu-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            menuItemsDisplay.appendChild(itemElement);
        });
    }

    categoriesList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            // Remove active class from all category items
            categoryItems.forEach(li => li.classList.remove('active'));
            // Add active class to the clicked one
            event.target.classList.add('active');

            const selectedCategory = event.target.dataset.category;
            displayMenuItems(selectedCategory);
        }
    });

    // --- Smooth Scroll for Nav Links ---
    document.querySelectorAll('header nav a[href^="#"], .btn-primary[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Set current year in footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Initial display (e.g., first category) ---
    const initialCategory = categoriesList.querySelector('li.active')?.dataset.category || 'tradicionais';
    displayMenuItems(initialCategory);

});