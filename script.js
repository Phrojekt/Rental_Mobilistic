const GetLocalStorage = () => JSON.parse(localStorage.getItem('Car_Database')) ?? []
const SetLocalStorage = (CarDatabase) => localStorage.setItem("Car_Database", JSON.stringify(CarDatabase))

/* ------------------ CRUD ------------------ */

const createCard = (Car, index) => {
    const newCard = document.createElement('tr')
    newCard.innerHTML = 
    `<td>${Car.modelo}</td>
    <td>${Car.nome}</td>
    <td>${Car.tipo}</td>
    <td></td>
    <td>
        <img class="button-edit" data-id="${index}" onclick="EditCar(event)" src="./images/icons/edit.svg" alt="Edit">
    </td>
    <td>
        <img class="button-delete" data-id="${index}" onclick="DeleteCar(event)" src="./images/icons/delete.svg" alt="Delete">
    </td>`

    document.querySelector('#Data-table tbody').appendChild(newCard)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#Data-table>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const UpdateScreen = () => {
    const Car_Database = ReadCar()
    clearTable()
    Car_Database.forEach(createCard)
}

const DeleteCar = (event) => {
    const target = event.target;
    const index = target.dataset.id;
    const CarDatabase = ReadCar();
    CarDatabase.splice(index, 1);
    SetLocalStorage(CarDatabase);
    UpdateScreen();
}

const updateCar = (index, Car) => {
    const CarDatabase = ReadCar()
    CarDatabase[index] = Car
    SetLocalStorage(CarDatabase)
}

const ReadCar = () => GetLocalStorage()

const CreateCar = (Car)  => {
    const CarDatabase = GetLocalStorage()
    CarDatabase.push(Car)
    SetLocalStorage(CarDatabase)
}

const isValidFields = () => {
    document.getElementById('Form').reportValidity()
    return document.getElementById('CarOwner').reportValidity()
}

const clearFields = () => {
    const Fields = document.querySelectorAll('.ModalField')
    Fields.forEach(Field => Field.value = "" )
    const FieldsSelector = document.querySelectorAll('.ModalField2')
    FieldsSelector.forEach(Field => Field.value = "00" )
}

const saveCar = () => {
    if (isValidFields()) {
        let selectType = document.querySelector('#CarType');
        let ModelCar = document.querySelector('#Model');

        const Car = {
            nome: document.getElementById('CarOwner').value,
            tipo: document.getElementById('CarType').value,
            modelo: document.getElementById('Model').value,
        }
        CreateCar(Car)
        UpdateScreen()
        Modal.close()
    }
}

function EditCar(event) {
    const target = event.target;
    const index = target.dataset.id;
    const CarDatabase = GetLocalStorage();
    const Car = CarDatabase[index];

    document.getElementById('CarOwner').value = Car.nome;
    document.getElementById('CarType').value = Car.tipo;
    document.getElementById('Model').value = Car.modelo;

    Modal.open()

    const saveButton = document.getElementById('SaveButton');
    saveButton.addEventListener('click', () => {

        const updatedCar = {
            nome: document.getElementById('CarOwner').value,
            tipo: document.getElementById('CarType').value,
            modelo: document.getElementById('Model').value
        };

        CarDatabase[index] = updatedCar;
        SetLocalStorage(CarDatabase);

        UpdateScreen();
    });
}

UpdateScreen()


// Event
// document.getElementById('SaveButton')
//    .addEventListener('click', saveCar)

const Modal = {
    open(){document.querySelector('.Modal_overlay').classList.add('active')},
    close(){document.querySelector('.Modal_overlay').classList.remove('active')
    clearFields()}
}