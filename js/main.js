const mainElement = document.getElementById("main");

const request = new XMLHttpRequest();
function fetchItems() {
    
    request.open("GET", "data/items.json", false);
    request.send(null)
    return JSON.parse(request.responseText);
    
    if (window.fetch) {
        fetch('data/items.json')
        .then(function(response) {
            console.log(response.json());
            return response.json();
        })
    } else {
        request.open("GET", "data/items.json", false);
        request.send(null)
        return Promise.apply(JSON.parse(request.responseText));
        
    }
}

function createSection(section) {
    const sectionElement = document.createElement("section");
    
    const sectionTitle = document.createElement("h2");
    sectionTitle.classList.add("section-title");
    sectionTitle.textContent = section.title;
    sectionElement.appendChild(sectionTitle);
    
    section.items.forEach(item => {
        sectionElement.appendChild(createItem(item));
    });
    
    mainElement.appendChild(sectionElement);
}

function createItem(item) {
    const link = document.createElement("a");
    link.target = "_blank"
    link.href = item.url;
    link.title = item.title;
    link.classList.add("round-item");

    const img = document.createElement("div");
    img.style.backgroundImage = `url(${item.image})`;
    img.style.borderColor = item.border;
    link.appendChild(img);
    
    return link;
}

const allItems = fetchItems();

allItems.forEach(section => {
    createSection(section);
});
