jQuery(async function () {
    await getTableWithUsers();
    /*    getNewUserForm();
        getDefaultModal();
        addNewUser();*/
})

const Service = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    // bodyAdd : async function(user) {return {'method': 'POST', 'headers': this.head, 'body': user}},
    findAllUsers: async () => await fetch('/rest/users'),
    /*findOneUser: async (id) => await fetch(`rest/users/${id}`),
    addNewUser: async (user) => await fetch('rest/users', {method: 'POST', headers: userFetchService.head, body: JSON.stringify(user)}),
    updateUser: async (user, id) => await fetch(`rest/users/${id}`, {method: 'PUT', headers: userFetchService.head, body: JSON.stringify(user)}),
    deleteUser: async (id) => await fetch(`rest/users/${id}`, {method: 'DELETE', headers: userFetchService.head})*/
}

async function getTableWithUsers() {
    let table = $('#mainTable tbody');
    table.empty();

    await Service.findAllUsers()
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                let tableFilling = `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td>${user.rolesToString}</td>     
                            <td>
                                <button type="button" data-userid="${user.id}" data-action="edit" class="btn btn-outline-secondary" 
                                data-toggle="modal" data-target="#someDefaultModal"></button>
                            </td>
                            <td>
                                <button type="button" data-userid="${user.id}" data-action="delete" class="btn btn-outline-danger" 
                                data-toggle="modal" data-target="#someDefaultModal"></button>
                            </td>
                        </tr>`;
                table.append(tableFilling);
            })
        });



    /*// обрабатываем нажатие на любую из кнопок edit или delete
    // достаем из нее данные и отдаем модалке, которую к тому же открываем
    $("#mainTableWithUsers").find('button').on('click', (event) => {
        let defaultModal = $('#someDefaultModal');

        let targetButton = $(event.target);
        let buttonUserId = targetButton.attr('data-userid');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-userid', buttonUserId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })*/
}

/*console.log(data)
let jsonData = data;

jsonData.forEach(function(item) {
    let row = tableUsers.insertRow();

    var idCell = row.insertCell();
    idCell.textContent = item.id;

    // Добавляем ячейки и заполняем их данными из JSON
    var firsNameCell = row.insertCell();
    firsNameCell.textContent = item.firstName;

    var lastNameCell = row.insertCell();
    lastNameCell.textContent = item.lastName;

    var userNameCell = row.insertCell();
    userNameCell.textContent = item.username;

    var emailCell = row.insertCell();
    emailCell.textContent = item.email;

    var RolesCell = row.insertCell();
    RolesCell.textContent = item.rolesToString;

    var buttonEdit = document.createElement("button");
    buttonEdit.textContent = "Edit";
    buttonDel.textContent = "Del";
    buttonDel.classList.add("btn")
    buttonDel.classList.add("btn-primary")
    buttonEdit.addEventListener("click", function() {
        // Код для обработки нажатия на кнопку
        console.log("Нажата кнопка Edit IdUser" + item.id);

    });
    var buttonCell = row.insertCell();
    buttonCell.appendChild(buttonEdit);

    var buttonDel = document.createElement("button");
    buttonDel.textContent = "Del";
    buttonDel.classList.add("btn")
    buttonDel.classList.add("btn-danger")
    buttonDel.classList.add("link-light")
    buttonDel.addEventListener("click", function() {
        // Код для обработки нажатия на кнопку
        console.log("Нажата кнопка Del IdUser " + item.id);

    });
    var buttonCell = row.insertCell();
    buttonCell.appendChild(buttonDel);

        /!*!// Заполнение таблицы данными из JSON
        var tableUsers = table.createTBody();
        jsonData.forEach(function (item) {
            var row = tableBody.insertRow();
            row.insertCell().textContent = item.username;
            row.insertCell().textContent = item.firstName;
            row.insertCell().textContent = item.lastName;
        });*!/
    })
    .catch(error => {
        // Обработка ошибок
        console.error('Ошибка:', error);
    });*/







