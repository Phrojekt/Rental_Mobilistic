const Modal = {
    open(){document.querySelector('.Modal_overlay').classList.add('active')},
    close(){document.querySelector('.Modal_overlay').classList.remove('active')
        clearFields()}
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_car')) ??  []
const setLocalStorage = (dbCar) => localStorage.setItem('db_car', JSON.stringify(dbCar))


// ---------- Crud ------------

const deleteCar = (index) => {
    const dbCar = readCar()
    dbCar.splice(index, 1)
    setLocalStorage(dbCar)
}

const updateCar = (index, car) => {
    const dbCar = readCar()
    dbCar[index] = car
    setLocalStorage(dbCar)
}

const readCar = () => getLocalStorage()

const createCar = (car) => {
    const dbCar = getLocalStorage()
    dbCar.push(car)
    setLocalStorage(dbCar)
};

const isValidFields = () => {


    const TypeValue = document.querySelector('#CarType').value;
    const CarType = TypeValue[0].toUpperCase() + TypeValue.substring(1).toLowerCase();
    
    console.log(CarType)

    if (CarType !== 'Sedan' && CarType !== 'Suv' && CarType !== 'Hatch') {
        alert('Ocorreu um erro, por favor escolha Sedan, Suv ou Hatch.');
        return;
    }

    return document.querySelector('#Form').reportValidity();
}

const clearFields = () => {
   const fields = document.querySelectorAll('.Input_Style')
   fields.forEach(field => field.value = "")
}

function generateId() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `${timestamp}`;
  }

const saveCar = () => {
    if (isValidFields()) {

        const TypeValue = document.querySelector('#CarType').value;
        const CarType = TypeValue[0].toUpperCase() + TypeValue.substring(1).toLowerCase();

        const car = {
            nome: document.querySelector('#CarOwner').value,
            modelo: document.querySelector('#CarModel').value, 
            tipo: CarType,
            isRented: false,
            ID: generateId()
          };

        const index = document.getElementById('CarOwner').dataset.index
        if( index == 'new') {
            createCar(car)
            window.location.reload()
            updateScreen()
            updateCard()
            countLockedCars()
            Modal.close()
        } else {
            updateCar(index, car)
            window.location.reload()
            countLockedCars()
            updateScreen()
            updateCard()
            Modal.close()
        }

    }
}


const createCard = (car, index) => {
    const newCard = document.createElement('div')
    newCard.innerHTML = `
    <div class="CarCard">
        <div class="CarCard_Container">
            <div class="First_Line">
                <div class="CarCard_Title"> ${car.nome} </div>
                <div class="CarCard_States" id="state-${index}">
                    <img src="./images/icons/unlock_icon.svg" alt="" id="state-${index}" class="State_Icon">
                </div>
            </div>
        </div>
        <div class="Image_Line">
            <img src="./images/icons/Sedan_icon.svg" alt="">
        </div>
        <div class="DataSection">
            <div class="DataSectionFirst">
                <div id="model"> 0${index} &nbsp; | &nbsp;  ${car.modelo}</div>
            </div>
            <div id="ID_Registered">ID: ${car.ID}</div>
            <div class="CarType">${car.tipo}</div>
        </div>
        <div class="Crud_Buttons">
            <button class="DeleteButton" id="delete-${index}">
                Excluir 
                <img src="./images/icons/delete.svg" id="delete-${index}"  alt="">
            </button>
            <button class="EditButton" id="edit-${index}">
                Editar
                <img src="./images/icons/edit.svg" id="edit-${index}" alt="" >
            </button>
        </div>
    </div>`

    document.querySelector('#CarsSection').appendChild(newCard)

}

const ChangeState = (index) => {
    const dbCar = JSON.parse(localStorage.getItem("db_car") || "[]");
    const imgPath = document.querySelector(`#state-${index}.State_Icon`)
    const srcValue = imgPath.getAttribute('src');
    const car = dbCar[index];

    if (srcValue === "./images/icons/unlock_icon.svg" ) {
        document.querySelector(`#state-${index}.CarCard_States`).classList.add('Locked')
        imgPath.src = "./images/icons/lock_icon.svg"
        car.isRented = true;
    } else if (srcValue === "./images/icons/lock_icon.svg") {
        document.querySelector(`#state-${index}.CarCard_States`).classList.remove('Locked')
        imgPath.src = "./images/icons/unlock_icon.svg"
        car.isRented = false;
    }

    localStorage.setItem("db_car", JSON.stringify(dbCar));
    window.location.reload()
}  


const clearScreen = () => {
    const Cards = document.querySelectorAll('.CarCard')
    Cards.forEach(div => div.parentNode.removeChild(div))
}

updateScreen = () => {
    const dbCar = readCar();
    clearScreen();
    dbCar.forEach(createCard);

    dbCar.forEach((car, index) => {
        const cardElement = document.querySelector(`#state-${index}.CarCard_States`);
        const imgPath = document.querySelector(`#state-${index}.State_Icon`);

        if (car.isRented) {
            cardElement.classList.add("Locked");
            imgPath.src = "./images/icons/lock_icon.svg";
        } else {
            cardElement.classList.remove("Locked");
            imgPath.src = "./images/icons/unlock_icon.svg";
        }
    });
}


const fillFields = (car) => {
    document.getElementById('CarOwner').value = car.nome
    document.getElementById('CarModel').value = car.modelo
    document.getElementById('CarType').value = car.tipo
    document.getElementById('CarOwner').dataset.index = car.index
}

const editCar = (index) => { 
    const car = readCar()[index]
    car.index = index
    fillFields(car)
    Modal.open()
}

const editDelete = (event) => {
    if(event.target == '.EditButton' || '.DeleteButton' || '.State_Icon') {

        const [action, index] = event.target.id.split('-');
        
        if (action == 'edit') {
            editCar(index)
        } else if (action == 'delete') {
            const car = readCar()[index]
            const response = confirm(`Deseja realmente apagar o cliente ${car.nome}?`)
            if (response) {
                deleteCar(index)
                updateScreen()
                countLockedCars()
                updateCard()
                
                window.location.reload()
            }
        } else if (action == 'state') {
            ChangeState(index)
        }
    }

}

function updateCard() {
    const dbCar = JSON.parse(localStorage.getItem("db_car") || "[]");
    const totalCars = dbCar.length;
    const carTypes = { Sedan: 0, Hatch: 0, Suv: 0 };
    
    dbCar.forEach(car => {
      carTypes[car.tipo] = (carTypes[car.tipo] || 0) + 1;
    });
    
    const card = document.querySelector(".Card");
    const totalCarDiv = card.querySelector(".TotalCar");
    totalCarDiv.innerText = totalCars;
    
    const sedanTotalDiv = card.querySelector(".sedan-total");
    sedanTotalDiv.innerText = carTypes.Sedan;

    const hatchTotalDiv = card.querySelector(".hatch-total");
    hatchTotalDiv.innerText = carTypes.Hatch;

    const suvTotalDiv = card.querySelector(".suv-total");
    suvTotalDiv.innerText = carTypes.Suv;
}

function countLockedCars() {
    const dbCars = JSON.parse(localStorage.getItem("db_car") || "[]");
    let rentedCars = 0;
    let sedanCars = 0;
    let hatchCars = 0;
    let suvCars = 0;

    dbCars.forEach((car) => {
        if (car.isRented) {
            rentedCars++;
            if (car.tipo === 'Sedan') {
                sedanCars++;
            } else if (car.tipo === 'Hatch') {
                hatchCars++;
            } else if (car.tipo === 'Suv') {
                suvCars++;
            }
        }
    });

    document.querySelector('.RentedCars').textContent = rentedCars;
    document.querySelector('.SedanCars').textContent = sedanCars;
    document.querySelector('.HatchCars').textContent = hatchCars;
    document.querySelector('.SUVCars').textContent = suvCars;
}



updateCard()
updateScreen()
countLockedCars()


document.querySelector('#CarsSection')
    .addEventListener('click', editDelete)
