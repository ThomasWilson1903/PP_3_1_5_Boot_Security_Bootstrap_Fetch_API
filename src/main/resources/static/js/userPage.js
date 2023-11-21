jQuery(async function () {
    await openProfile();
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
        .then(function (user) {
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

async function openProfile() {

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
                            <th scope="col">Email</th>
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
