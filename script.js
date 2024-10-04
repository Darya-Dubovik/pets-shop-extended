const items = [
  {
    title: "Игрушка мячик",
    description: "Ваш питомец будет счастлив!",
    tags: ["cat", "dog"],
    price: 500,
    img: "./img/1.jpeg",
    rating: 4.4,
  },
  {
    title: "Игрушка лабиринт",
    description: "Поможет в развитии интеллекта!",
    tags: ["cat", "dog"],
    price: 900,
    img: "./img/2.jpeg",
    rating: 3.1,
  },
  {
    title: "Игрушка для котят",
    description: "Отвлечет вашего питомца!",
    tags: ["cat"],
    price: 300,
    img: "./img/3.jpeg",
    rating: 5.0,
  },
  {
    title: "Миска «Котик»",
    description: "Подойдет и для собак!",
    tags: ["cat", "dog"],
    price: 660,
    img: "./img/4.jpeg",
    rating: 4.7,
  },
  {
    title: "Лоток розовый",
    description: "Теперь вы можете забыть о проблемах с туалетом",
    tags: ["cat"],
    price: 400,
    img: "./img/5.jpeg",
    rating: 4.9,
  },
  {
    title: "Сухой корм для кошек",
    description: "Специальная формула для милых усатиков!",
    tags: ["cat"],
    price: 200,
    img: "./img/6.jpeg",
    rating: 3.2,
  },
  {
    title: "Сухой корм для собак",
    description: "Содержит полный комплекс витаминов",
    tags: ["dog"],
    price: 300,
    img: "./img/7.jpeg",
    rating: 2.9,
  },
  {
    title: "Игрушка для собак",
    description: "Теперь вы можете не переживать за личные вещи",
    tags: ["dog"],
    price: 500,
    img: "./img/8.jpeg",
    rating: 3.4,
  },
  {
    title: "Лежанка",
    description: "Идеальное место для отдыха!",
    tags: ["cat", "dog"],
    price: 1500,
    img: "./img/9.jpeg",
    rating: 4.8,
  },
  {
    title: "Поилка для собак",
    description: "Возьмите с собой в путешествие",
    tags: ["dog"],
    price: 800,
    img: "./img/10.jpeg",
    rating: 3.2,
  },
  {
    title: "Переноска",
    description: "Путешествуйте с комфортом!",
    tags: ["cat", "dog"],
    price: 3500,
    img: "./img/11.jpeg",
    rating: 3.7,
  },
  {
    title: "Поводок для собак",
    description: "Для чудесных прогулок вместе",
    tags: ["dog"],
    price: 800,
    img: "./img/12.jpeg",
    rating: 4.1,
  },
];

const template = document.querySelector("#item-template");
const shopItem = document.querySelector("#shop-items");

const button = document.querySelector("#search-btn");
const input = document.querySelector("#search-input");
const nothingFound = document.querySelector("#nothing-found");


function useTemplate(item) {
  const {title, description, img, price, tags, rating} = item;

  const templateItem = template.content.cloneNode(true);

  templateItem.querySelector("h1").textContent = title;
  templateItem.querySelector("p").textContent = description;
  templateItem.querySelector("img").src = img;
  templateItem.querySelector(".price").textContent = `${price} руб.`;

  const ratingContainer = templateItem.querySelector(".rating");
  for (let i=0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  const tagsContainer = templateItem.querySelector(".tags"); 
  tags.forEach((tag) => {                                    
  const oneTag = document.createElement("span");                
  oneTag.textContent = tag;
  oneTag.classList.add("tag");                            
  tagsContainer.append(oneTag);                           
  });

  return templateItem;
}

let currentState = [...items];

function renderItems(arr) {
  nothingFound.textContent = '';
  shopItem.innerHTML = '';

  arr.forEach((item) => {
    const cardTemplate = useTemplate(item);
    shopItem.append(cardTemplate);
 })

 if (!arr.length) {
  nothingFound.textContent = 'Ничего не найдено';
 }
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }

  if (a.title < b.title) {
    return -1;
  }

  if (a.title === b.title) {
    return 0;
  }
}

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;

  switch (selectedOption) {
    case "expensive": {
      currentState.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentState.sort((a, b) => a.price - b.price);
      break;
    }
    case "rating": {
      currentState.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "alphabet": {
      currentState.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }
  renderItems(currentState);
});

function applySearch() {
  const searchResult = input.value.trim().toLowerCase();

  currentState = items.filter((el) =>
    el.title.trim().toLowerCase().includes(searchResult)
  );
  
  currentState.sort((a, b) => sortByAlphabet(a, b));

  sortControl.selectedIndex = 0;

  renderItems(currentState);
}

button.addEventListener("click", applySearch);
input.addEventListener("search", applySearch);
