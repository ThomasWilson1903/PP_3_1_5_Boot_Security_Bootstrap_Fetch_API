jQuery(async function () {
    await getTableWithUsers();
    //getNewUserForm();
    await openModalEdit();
    // addNewUser();
    await openProfile();
    await openAdminPage();
    await openUsersPage();
    await openNewUserPage();
    await openModalDel();
    await getEnterUser();

})


const Service = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },


    findAllUsers: async () => await fetch('/rest/users'),
    findOneUserProfile: async () => await fetch('/rest/profile'),
    getAllRoles: async () => await fetch('/rest/roles'),
    findOneUser: async (id) => await fetch(`/rest/users/${id}`),
    addNewUser: async (user) => await fetch('/rest/save', {
        method: 'POST',
        headers: Service.head,
        body: JSON.stringify(user)
    }),
    updateUser: async (user, id) => await fetch(`/rest/edit/${id}`, {
        method: 'PUT',
        headers: Service.head,
        body: JSON.stringify(user)
    }),
    deleteUser: async (id) => await fetch(`/rest/del/${id}`, {method: 'DELETE', headers: Service.head})
}

async function getEnterUser() {
    await Service.findOneUserProfile()
        .then(res => res.json())
        .then(function (user){
                console.log(user)
                $('#UserEnter').empty().append(`
             <h3><span class="text-white"
                      style="font-weight: bold;">${user.username}</span></h3>
            <h3><span class="text-white" style="display: inline">&nbsp;with roles:&nbsp;</span></h3>
            <h3> <span class="text-white" 
                       style="display: inline;">${user.rolesToString}</span></h3>
                `)

            }
        )
}

async function getTableWithUsers() {
    let table = $('#mainTable tbody');
    table.empty();
    table.append(`
<tr>
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
        let EditModal = $('#ModalEdit');
        let DelModal = $('#ModalDel');

        let targetButton = $(event.target);
        let buttonUserId = targetButton.attr('data-userid');
        let buttonAction = targetButton.attr('data-action');

        EditModal.attr('data-userid', buttonUserId);
        DelModal.attr('data-userid', buttonUserId);
        console.log(buttonAction)
        switch (buttonAction) {
            case 'edit':
                EditModal.modal('show');
                break;
            case 'delete':
                DelModal.modal('show')
                break;
        }
    })

}

async function openModalEdit() {
    $('#ModalEdit').on("shown.bs.modal", async function () {
        // Код, который будет выполняться при открытии модального окна
        console.log("Модальное окно было открыто");
        let userData = await Service.findOneUser($('#ModalEdit').attr('data-userid'))
            .then(res => res.json())
            .then(user => {
                console.log(user)
                $('#id').val(user.id);
                $('#firstName').val(user.firstName);
                $('#lastName').val(user.lastName);
                $('#email').val(user.email);
                $('#username').val(user.username);
            })
    });
    $('#editButton').click(async function () {
        let modal = $('#ModalEdit')
        let id = modal.find("#id").val().trim();
        let username = modal.find("#username").val().trim();
        let firstname = modal.find("#firstName").val().trim();
        let lastname = modal.find("#lastName").val().trim();
        let email = modal.find("#email").val().trim();

        let userData = await Service.findOneUser(id)
            .then(res => res.json())
            .then(async function (user) {
                user.username = username
                user.firstName = firstname
                user.lastName = lastname
                user.email = email
                console.log(user)
                let response = await Service.updateUser(user, user.id)
                if (response.ok) {
                    getTableWithUsers()
                    modal.modal('hide');
                }
            })

    })
}

async function openModalDel() {
    $('#ModalDel').on("shown.bs.modal", async function () {
        // Код, который будет выполняться при открытии модального окна
        console.log("Модальное окно было открыто");
        let userData = await Service.findOneUser($('#ModalDel').attr('data-userid'))
            .then(res => res.json())
            .then(user => {
                console.log(user)
                $('#id1').val(user.id);
                $('#firstName1').val(user.firstName);
                $('#lastName1').val(user.lastName);
                $('#email1').val(user.email);
                $('#username1').val(user.username);
            })
    });
    $('#delButton').click(async function () {
        let modal = $('#ModalDel')
        let id = modal.find("#id1").val().trim();
        let username = modal.find("#username1").val().trim();
        let firstname = modal.find("#firstName1").val().trim();
        let lastname = modal.find("#lastName1").val().trim();
        let email = modal.find("#email1").val().trim();

        let userData = await Service.findOneUser(id)
            .then(res => res.json())
            .then(async function (user) {
                user.username = username
                user.firstName = firstname
                user.lastName = lastname
                user.email = email
                console.log(user)
                let response = await Service.deleteUser(user.id)
                if (response.ok) {
                    getTableWithUsers()
                    modal.modal('hide');
                }
            })

    })
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
                            <a id="btnOpenUsers" class="nav-link active" data-toggle="tab">Users Table</a>
                            <a id="btnOpenNewUser" class="nav-link" data-toggle="tab">New
                                User</a>
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
    let btn = $('#btnOpenNewUser');
    btn.on("click", async function () {
        console.log('openNewUserPage')
        $('#cards').empty().append(
            `
<div>
                            
                        </div>
                    <div class="card">
                        <div class="card-header">
                            <h4><strong>Add new user</strong></h4>
                        </div>
                    </div>
                    <div class="col-md bg-white border">
                        <form id="NewUserForm"
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
                        </form>
                        <p id="error">  </p>
                    <a id="btnOkSaveUser" class="btn btn-primary w-100 border-0">Admin</a>
                    </div>
`)
        Service.getAllRoles()
            .then(res => res.json())
            .then(allRoles => allRoles.forEach(role => {
                        let roles = `
                              <div>
                                <input type="checkbox" id="role${role.id}" name="roles" />
                                <label for="role${role.id}">${role.name}</label>
                              </div>
                        `
                        $('#labelRole').append(roles);
                    }
                )
            )
        await saveNewUser();
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

async function saveNewUser() {
    $("#btnOkSaveUser").click(function () {
        let addUserForm = $('#NewUserForm')
        /* let login = addUserForm.find('#').val().trim();
         let password = addUserForm.find('#AddNewUserPassword').val().trim();
         let age = addUserForm.find('#AddNewUserAge').val().trim();*/
        //console.log(userName)
        let data =
            {
                username: addUserForm.find($('#username')).val().trim(),
                password: addUserForm.find($('#password')).val().trim(),
                firstName: addUserForm.find($('#name')).val().trim(),
                lastName: addUserForm.find($('#surname')).val().trim(),
                email: addUserForm.find($('#email')).val().trim(),
                roles: []
            }
        let coin = 0
        Service.getAllRoles()
            .then(res => res.json())
            .then(allRoles => allRoles.forEach(val => {
                    let checkbox = 'role' + val.id
                    console.log(checkbox)
                    if (document.getElementById(checkbox).checked) {
                        data.roles.push({
                            id: val.id,
                            name: val.name
                        })
                    }
                    coin++
                    if (coin === allRoles.length) {
                        Service.addNewUser(data)
                            .then(() => {
                                $('#cards').empty().append(`
      <div class="card-header">
        <h4><strong>All users</strong></h4>
      </div>
      <div class="card-body">
        <table id="mainTable" class="table table-striped table-hover">
          <tr>
            ...
          </tr>
        </table>
      </div>
    `);
                            })
                            .then(() => getTableWithUsers());
                    }
                })
            )
        console.log(data)
    });
}