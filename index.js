const usersUrl = 'http://localhost:3000/api/v1/users'
const navBarDiv = document.getElementById('nav-bar')
const homeDiv = document.getElementById('home')
const loginForm = document.getElementById('login-form')
const divSignupModal = document.getElementById('signup-modal')
const br = document.createElement('br')
const signupForm = document.querySelector('form.signup-form')
    let inputEmail = document.createElement('input')
    let inputName = document.createElement('input')
    let inputUsername = document.createElement('input')
    let inputPassword = document.createElement('input')
    let inputSubmit = document.createElement('input')
const signupBtn = document.getElementById('signup-btn')
const signupModal = document.getElementById('signup-modal')
const spanCloseModal = document.createElement('span')
    spanCloseModal.className = 'close-modal'
    spanCloseModal.innerHTML = '<span class="close">&times;</span>'
    spanCloseModal.addEventListener('click', closeSignUp)
const navBar = document.querySelector('nav.nav-bar')
const containerDiv = document.createElement('div')
    containerDiv.className = 'container'
const profilePic = document.createElement('img')
    profilePic.className= 'profile-pic'
const profileUsername = document.createElement('h2')
const profileName = document.createElement('h3')
const editUserBtn = document.createElement('button')
    editUserBtn.className = 'edit-user-btn'
const bioUser = document.createElement('h4')
const homeImg = document.createElement('img')
    homeImg.className = 'home-icon'
    homeImg.src='https://images.vexels.com/media/users/3/147094/isolated/preview/055a10de0c31e98eef1451f742c32345-instagram-home-icon-by-vexels.png'
const searchBar = document.createElement('input')
    searchBar.setAttribute('type', 'text')
    searchBar.className = 'searchBar'
    searchBar.setAttribute('placeholder', 'Search')

loginForm.addEventListener('submit', loginFunct)
signupBtn.addEventListener('click', signupFunct)


function loginFunct() {
    event.preventDefault()
    // code here
    displayUserProfile(user)
}

function signupFunct(){
    inputEmail.setAttribute('placeholder', 'Email')
    inputEmail.setAttribute('type', 'text')
    inputName.setAttribute('placeholder', 'Full Name')
    inputName.setAttribute('type', 'text')
    inputUsername.setAttribute('placeholder', 'Username')
    inputUsername.setAttribute('type', 'text')
    inputPassword.setAttribute('placeholder', 'Password')
    inputPassword.setAttribute('type', 'password')
    inputSubmit.setAttribute('type', 'submit')
    inputSubmit.setAttribute('value', 'Sign Up')
    inputSubmit.className = 'login-signup-btn'
    divSignupModal.className = 'card'
    signupModal.append(spanCloseModal)
    signupForm.append(inputEmail, br, inputName, br, inputUsername, br, inputPassword, br, inputSubmit)
    
    signupForm.addEventListener('submit', () => {
        event.preventDefault()
        console.log(inputEmail.value, inputUsername.value, inputPassword.value)
        let email = inputEmail.value
        let name = inputName.value
        let username = inputUsername.value
        let password = inputPassword.value
        configObj = {method: 'POST',
                    headers: {'Content-Type': 'application/json',
                                'Accept': 'application/json'}, 
                    body: JSON.stringify({username, email, password})}
        fetch(usersUrl, configObj)
        .then(resp => resp.json())
        .then(newUser => {
            displayUserProfile(newUser)
        })
        
    })
}

function closeSignUp(){
    signupModal.remove()
}

function displayUserProfile(user){
    homeDiv.innerHTML = ''
    navBar.append(searchBar, homeImg)
    
    profilePic.src = user.profilepic      //add profilepic attribute to User model!
    profileUsername.innerText = user.username
    profileName.innerText = user.name
    bioUser.innerText = user.bio
    
    containerDiv.append(profilePic, editUserBtn, profileUsername, profileName, bioUser)
    homeDiv.append(containerDiv)
    
    editUserBtn.addEventListener('click', editUser(user))
    user.posts.forEach(post => displayUserPost(post))
}

function displayUserPost(post){
    //posts
}

function editUser(user){
 // patch request to edit user
}


fetch(usersUrl)
.then(res => res.json())
.then(console.log)
