jQuery(async function () {
    await getTableWithUsers();
    //getNewUserForm();
    await getDefaultModal();
    // addNewUser();
    await openProfile()
    await openAdminPage()
    await openUsersPage()
    await openNewUserPage()
})

const Service = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    // bodyAdd : async function(user) {return {'method': 'POST', 'headers': this.head, 'body': user}},
    findAllUsers: async () => await fetch('/rest/users'),
    findOneUserProfile: async () => await fetch('/rest/profile'),
    getAllRoles: async () => await fetch('/rest/roles'),
    findOneUser: async (id) => await fetch(`/rest/users/${id}`),
    addNewUser: async (user) => await fetch('rest/users', {method: 'POST', headers: userFetchService.head, body: JSON.stringify(user)}),
    /*updateUser: async (user, id) => await fetch(`rest/users/${id}`, {method: 'PUT', headers: userFetchService.head, body: JSON.stringify(user)}),
    deleteUser: async (id) => await fetch(`rest/users/${id}`, {method: 'DELETE', headers: userFetchService.head})*/
}

async function getTableWithUsers() {
    let table = $('#mainTable tbody');
    table.empty();
    table.append(`<tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Surname</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Roles</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>`)
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
                                <button type="button" data-userid="${user.id}" data-action="edit" class="btn btn-primary link-light" 
                                data-toggle="modal" data-target="#someDefaultModal">Edit</button>
                            </td>
                            <td>
                                <button type="button" data-userid="${user.id}" data-action="delete" class="btn btn-danger" 
                                data-toggle="modal" data-target="#someDefaultModal">Del</button>
                            </td>
                        </tr>`;
                table.append(tableFilling);
            })
        });


    // обрабатываем нажатие на любую из кнопок edit или delete
    // достаем из нее данные и отдаем модалке, которую к тому же открываем
    $("#mainTable").find('button').on('click', (event) => {
        let defaultModal = $('#someDefaultModal');

        let targetButton = $(event.target);
        let buttonUserId = targetButton.attr('data-userid');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-userid', buttonUserId);
        console.log(buttonUserId)
        defaultModal.attr('data-action', buttonAction);
        console.log(buttonAction)
        defaultModal.modal('show');
    })
}

async function getDefaultModal() {
    $('#someDefaultModal').modal({
        keyboard: true,
        backdrop: "static",
        show: false
    }).on("show.bs.modal", (event) => {
        let thisModal = $(event.target);
        let userid = thisModal.attr('data-userid');
        let action = thisModal.attr('data-action');
        switch (action) {
            case 'edit':
                editUser(thisModal, userid);
                break;
            case 'delete':
                deleteUser(thisModal, userid);
                break;
        }
    }).on("hidden.bs.modal", (e) => {
        let thisModal = $(e.target);
        thisModal.find('.modal-title').html('');
        thisModal.find('.modal-body').html('');
        thisModal.find('.modal-footer').html('');
    })
}

// редактируем юзера из модалки редактирования, забираем данные, отправляем
async function editUser(modal, id) {
    let preuser = await Service.findOneUser(id);
    let user = preuser.json();
    console.log(user)
    modal.find('.modal-title').html('Edit user');

    let editButton = `<button  class="btn btn-outline-success" id="editButton">Edit</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group" id="editUser">
                <input type="text" class="form-control" id="id" name="id" value="${user.id}" disabled><br>
                <input class="form-control" type="text" id="login" value="${user.login}"><br>
                <input class="form-control" type="password" id="password"><br>
                <input class="form-control" id="age" type="number" value="${user.age}">
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#editButton").on('click', async () => {
        let id = modal.find("#id").val().trim();
        let login = modal.find("#login").val().trim();
        let password = modal.find("#password").val().trim();
        let age = modal.find("#age").val().trim();
        let data = {
            id: id,
            login: login,
            password: password,
            age: age
        }
        const response = await userFetchService.updateUser(data, id);

        if (response.ok) {
            getTableWithUsers();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}

// удаляем юзера из модалки удаления
async function deleteUser(modal, id) {
    await Service.deleteUser(id);
    getTableWithUsers();
    modal.find('.modal-title').html('');
    modal.find('.modal-body').html('User was deleted');
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(closeButton);
}

async function openProfile() {
    $('#btnUser').click(async function () {

            console.log('openUserPage')

            await Service.findOneUserProfile()

                .then(res => res.json())
                .then(user =>
                    $('#windows').empty().append(
                        `<div class="col-10 px-0">
        <div class="container-fluid">
            <h1 class="m-3 fw-bold">User information page</h1>
            <div class="card">
                <div class="card-header">
                    <h4><strong>About user</strong></h4>
                </div>
                <div class="card-body">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Username</th>
                            <th scope="col">Roles</th>
                        </tr>
                        </thead>
                        <tbody>
                        <td>${user.id}</td>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td>${user.rolesToString}</td>     
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>`))
        }
    )
}

async function openAdminPage() {
    $('#btnAdmin').click(function () {
            console.log('openAdminPage')
            getTableWithUsers()
            $('#windows').empty().append(
                `<div class="container-fluid">
                    <h1 class="m-3 fw-bold">Admin panel</h1>
                    <div class="tab-content" id="tabContent">
                        <ul class="nav nav-tabs">
                            <a class="nav-link active" data-toggle="tab">Users Table</a>
                            <a class="nav-link" data-toggle="tab" th:href="@{/admin/new}">New User</a>
                        </ul>
                        <div class="card">
                            <div class="card-header">
                                <h4><strong>All users</strong></h4>
                            </div>

                            <div class="card-body">
                                <table id="mainTable" class="table table-striped table-hover">
                                    <tr>

                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>`)
            getTableWithUsers()
        }
    )
}

async function openNewUserPage() {
    $('#btnOpenNewUser').on("click", function () {
        console.log('openNewUserPage')

        $('#cards').empty().append(
            `
                    <div class="card">
                        <div class="card-header">
                            <h4><strong>Add new user</strong></h4>
                        </div>
                    </div>
                    <div class="col-md bg-white border">
                        <form
                        class="offset-md-4 col-md-4 mt-1 mb-1">
                            <label for="name">Name: </label>
                            <input type="text"  id="name"/>
                            <br><br>
                            <label for="surname">Surname: </label>
                            <input type="text"  id="surname"/>
                            <br><br>
                            <label for="email">Email: </label>
                            <input type="email"  id="email"/>
                            <br><br>
                            <label for="username">Username: </label>
                            <input type="text"  id="username"/>
                            <br><br>
                            <label for="password">Password: </label>
                            <input type="password"  id="password"/>
                            <br><br>

                            <p>
                                <label id="labelRole" >Roles:
                                </label>
                            </p>
                            <br/>
                            <input class="btn btn-success" type="submit" value="OK"/>
                        </form>
                    </div>
`)
        Service.getAllRoles()
            .then(res => res.json())
            .then(allRoles => allRoles.forEach(role => {
                        let roles = `
                              <div>
                                <input type="checkbox" id="roles${role.id}" name="roles" />
                                <label for="roles${role.id}">${role.name}</label>
                              </div>
                        `
                        $('#labelRole').append(roles);
                    }
                )
            )
    })
}

async function openUsersPage() {
    $('#btnOpenUsers').on("click", function () {
        console.log('openPageUsers')
        $('#cards').empty().append(
            `
            <div class="card-header">
                <h4><strong>All users</strong></h4>
            </div>
            <div class="card-body">
                <table id="mainTable" class="table table-striped table-hover">
                    <tr>

                    </tr>
                </table>
            </div>
`
        )
        getTableWithUsers()
    })
}




