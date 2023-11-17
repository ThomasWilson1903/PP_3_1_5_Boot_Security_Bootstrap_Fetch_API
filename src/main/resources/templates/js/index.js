const url = 'http://localhost:8080/rest/users'
let jsonData
var dwqdq
let dwqd = {}

let table = document.getElementById("table");
var tableHeader = table.createTHead();
var headerRow = tableHeader.insertRow();
headerRow.insertCell().textContent = "username";
headerRow.insertCell().textContent = "firstname";
headerRow.insertCell().textContent = "doblename";

const dsa = document.getElementById('res');
fetch('http://localhost:8080/rest/users')
    .then(response => response.json())
    .then(data => {
        // Обработка данных
        console.log(data)
        dsa.textContent = data
        jsonData = data;

        // Заполнение таблицы данными из JSON
        var tableBody = table.createTBody();
        jsonData.forEach(function (item) {
            var row = tableBody.insertRow();
            row.insertCell().textContent = item.username;
            row.insertCell().textContent = item.firstName;
            row.insertCell().textContent = item.lastName;
        });
    })
    .catch(error => {
        // Обработка ошибок
        console.error('Ошибка:', error);
    });



