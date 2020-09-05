const usersUrl = 'http://localhost:3000/api/v1/users'
const navBarDiv = document.getElementById('nav-bar')
const containerDiv = document.getElementById('container')
const loginForm = document.getElementById('login-form')
const divSignupModal = document.getElementById('signup-modal')
const br = document.createElement('br')
const signupForm = document.querySelector('form.signup-form')
    let inputEmail = document.createElement('input')
    let inputUsername = document.createElement('input')
    let inputPassword = document.createElement('input')
    let inputSubmit = document.createElement('input')
const signupBtn = document.getElementById('signup-btn')
const signupModal = document.getElementById('signup-modal')
const spanCloseModal = document.createElement('span')
    spanCloseModal.className = 'close-modal'
    spanCloseModal.innerHTML = '<span class="close">&times;</span>'
    spanCloseModal.addEventListener('click', closeSignUp)

loginForm.addEventListener('submit', loginFunct)
signupBtn.addEventListener('click', signupFunct)


function loginFunct() {
    event.preventDefault()
    // code here
}

function signupFunct(){
    inputEmail.setAttribute('placeholder', 'Email')
    inputEmail.setAttribute('type', 'text')
    inputUsername.setAttribute('placeholder', 'Username')
    inputUsername.setAttribute('type', 'text')
    inputPassword.setAttribute('placeholder', 'Password')
    inputPassword.setAttribute('type', 'password')
    inputSubmit.setAttribute('type', 'submit')
    inputSubmit.setAttribute('value', 'Sign Up')
    inputSubmit.className = 'login-signup-btn'
    divSignupModal.className = 'modal'
    signupModal.append(spanCloseModal)
    signupForm.append(inputEmail, br, inputUsername, br, inputPassword, br, inputSubmit)
    
    signupForm.addEventListener('submit', () => {
        event.preventDefault()
        console.log(inputEmail.value, inputUsername.value, inputPassword.value)
        let email = inputEmail.value
        let username = inputUsername.value
        let password = inputPassword.value
        configObj = {method: 'POST',
                    headers: {'Content-Type': 'application/json',
                                'Accept': 'application/json'}, 
                    body: JSON.stringify({username, email, password})}
        fetch(usersUrl, configObj)
        .then(resp => resp.json())
        .then(console.log)
        closeSignUp()
    })
}

function closeSignUp(){
    signupModal.remove()
}

fetch(usersUrl)
.then(res => res.json())
.then(console.log)
