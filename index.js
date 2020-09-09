let currenUser

const usersUrl = 'http://localhost:3000/api/v1/users/'
const postsUrl = 'http://localhost:3000/api/v1/posts/'

const backDiv = document.getElementById('background')
// navigation bar
const navBarDiv = document.getElementById('nav-bar')
const searchBar = document.querySelector('input.search-bar')
const homeIconImg = document.querySelector('img.home-icon')

// intro to signup or login
const homeDiv = document.createElement('div')   
        homeDiv.className = 'intro'
const signupBtn = document.createElement('button')      //signup button
        signupBtn.setAttribute('id', 'signup-btn')
const loginForm = document.createElement('form')
        loginForm.setAttribute('id', 'login-form')     //login form
const divSignupModal = document.getElementById('signup-modal')
const br = document.createElement('br')
    loginForm.addEventListener('submit', loginFunct)    //add event listener for login form
    signupBtn.addEventListener('click', signupFunct)    //add event listener for signup btn
const signupForm = document.createElement('form')       //signup form
        signupForm.className ='signup-form'
        let inputEmail = document.createElement('input')
        let inputName = document.createElement('input')
        let inputUsername = document.createElement('input')
        let inputPassword = document.createElement('input')
        let inputSubmit = document.createElement('input')

// signup modal
const signupModal = document.getElementById('signup-modal')
const spanCloseModal = document.createElement('span')
        spanCloseModal.className = 'close-modal'
        spanCloseModal.innerHTML = '<span class="close">&times;</span>'
    spanCloseModal.addEventListener('click', closeSignUp)   //event listener to x-out the signup modal
const navBar = document.querySelector('nav.nav-bar')
const containerDiv = document.querySelector('div.container')

//user profile
const profileContainer = document.createElement('div')
    profileContainer.className = 'container'
const profilePic = document.createElement('img')
    profilePic.className= 'profile-pic'
const profileUsername = document.createElement('h2')
const profileName = document.createElement('h3')
const editUserBtn = document.createElement('button')
    editUserBtn.className = 'edit-user-btn'
const bioUser = document.createElement('h4')

//homepage
const homepageDiv = document.querySelector('div.homepage')


// login
function loginFunct() {
    event.preventDefault()
    // code here
    displayUserProfile(user)
}

//signup - create new user
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

//user profile
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

//homepage
homepagePosts()
function homepagePosts(){
    fetch(postsUrl)
    .then(res => res.json())
    .then(postsArray => postsArray.forEach(post => renderPostHome(post)))
}

function renderPostHome(post){
    const homePostDiv = document.createElement('div')
        homePostDiv.className = 'home-post'
    const h3username = document.createElement('h3')
        h3username.innerText = post.user.username
    const captionP = document.createElement('p')
        captionP.innerText = post.caption
    const postImgDiv = document.createElement('div')
        postImgDiv.className = 'home-post-img-div'
    const postImage = document.createElement('img')
        postImage.className = 'post-image'
        postImage.src = post.image
    postImgDiv.append(postImage)

    const likeBtn = document.createElement('button')
        likeBtn.innerText = '❤️ ' + post.likes
        likeBtn.className = 'heart-btn'

    homePostDiv.append(h3username, postImgDiv, likeBtn, captionP)
    if (post.comments.length > 0) {
    post.comments.forEach(comment => {
        let commentP = document.createElement('p')
        fetch(usersUrl + comment.user_id)
        .then(res=>res.json())
        .then(commenter => commentP.innerHTML = `<strong>${commenter.username}: </strong> ${comment.content}`)
        homePostDiv.append(commentP)
    })}
    if (post.hashtags.length > 0) {
        post.hashtags.forEach(hashtag => {
            let hashtagP = document.createElement('p')
            hashtagP.innerText = hashtag.name
            homePostDiv.append(hashtagP)
        })}
        let addCommentInput = document.createElement('input')
        addCommentInput.className = 'add-new-comment'
        addCommentInput.setAttribute('type', 'text')
        addCommentInput.setAttribute('placeholder', 'Add a comment...')
        // addCommentInput.setAttribute('id', currentUser.id)
    homePostDiv.append(addCommentInput)
    homepageDiv.append(homePostDiv)
    backDiv.append(homepageDiv)
}
