const usersUrl = 'http://localhost:3000/api/v1/users'
const navBarDiv = document.getElementById('nav-bar')
const containerDiv = document.getElementById('container')

fetch(usersUrl)
.then(res => res.json())
.then(console.log)
