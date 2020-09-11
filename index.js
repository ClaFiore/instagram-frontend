let currentUser

const likesURL = 'http://localhost:3000/api/v1/likes/'
const usersUrl = 'http://localhost:3000/api/v1/users/'
const postsUrl = 'http://localhost:3000/api/v1/posts/'
const commentsUrl = 'http://localhost:3000/api/v1/comments/'

const backDiv = document.getElementById('background')
const homepageContainerDiv = document.getElementById('homepage-container')
const profileDiv = document.getElementById('profile')

// navigation bar
const navBarDiv = document.getElementById('nav-bar')
const searchBar = document.querySelector('input.search-bar')
const homeIconImg = document.querySelector('img.home-icon')
    homeIconImg.addEventListener('click', () => getPosts())
const userIcon = document.querySelector('img.user-icon')
    userIcon.addEventListener('click', () => displayUserProfile(currentUser))

// intro to signup or login
const loginDiv = document.getElementById('login')
const loginSignupDiv = document.getElementById('login-signup')
const loginForm = document.getElementById('login-form')    //login form

const signupBtn = document.getElementById('signup-btn')      //signup button
        
const divSignupModal = document.getElementById('signup-modal')
const br = document.createElement('br')
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



// login
loginForm.addEventListener('submit', () => {
    event.preventDefault()
    
    fetch(usersUrl)
    .then(res=>res.json())
    .then(users => users.forEach(user => {
        if (loginForm.children[0].value === user.username && loginForm.children[3].value === user.password)
            { currentUser = user
            console.log(currentUser)
            loginDiv.style.display = 'none'
            displayUserProfile(currentUser)
        }
    }))
    
})


//user profile



function displayUserProfile(user){
    loginSignupDiv.innerHTML = ''
    homepageContainerDiv.innerHTML = ''
    homeIconImg.style.display = 'inline-block'
    searchBar.style.display = 'inline-block'
    userIcon.src = user.profilepic

    const profileContainer = document.createElement('div')
        profileContainer.className = 'container'
        profileDiv.append(profileContainer)
    
    const picDiv = document.createElement('div')
    const profilePic = document.createElement('img')
        profilePic.className= 'profile-pic'
        profilePic.src = user.profilepic  
        picDiv.append(profilePic)    
    const profileUsername = document.createElement('h2')
        profileUsername.innerText = user.username
    const profileName = document.createElement('h3')
        profileName.innerText = user.name
    
    const editDiv = document.createElement('div')
        editDiv.className = 'edit-user-btn-div'
    const editUserBtn = document.createElement('button')
        editUserBtn.className = 'edit-user-btn'
        editUserBtn.innerText = 'Edit'
        editDiv.append(editUserBtn)
    
    const bioUser = document.createElement('p')
        bioUser.innerText = user.bio
    
    profileContainer.append(picDiv, profileName, editDiv, profileUsername, profileName, bioUser)
    
    let profilePostOuterDiv = document.createElement('div')
    profilePostOuterDiv.className = 'profile-post-outer-div'
    profileDiv.append(profilePostOuterDiv)

    // editUserBtn.addEventListener('click', editUser(user))
    user.posts.forEach(post => displayUserPost(post, profilePostOuterDiv))
    
    
}

function displayUserPost(post, profilePostOuterDiv){
    
    let singlePostDiv = document.createElement('div')
    singlePostDiv.className = 'single-post-div'
    profilePostOuterDiv.append(singlePostDiv)

    let imagePostDiv = document.createElement('div')
    imagePostDiv.className = 'profile-post-image'
    singlePostDiv.append(imagePostDiv)

    let image = document.createElement('img')
    image.className = 'profile-user-post-image'
    image.src = post.image
    // image.style.width = 10%
    imagePostDiv.append(image)

}

function editUser(user){
 // patch request to edit user
}


// HOMEPAGE
function getPosts(){
    fetch(postsUrl)
    .then(res => res.json())
    .then(postsArray => postsArray.forEach(post => renderPostHome(post)))
}



function renderPostHome(post){
    profileDiv.innerHTML = ''
    homepageContainerDiv.style.display = 'block'

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
    
    const likeBtnDiv = document.createElement('div')
    const likeBtn = document.createElement('button')

    if (post.likes.length > 0){
        let bool = post.likes.some(like => (like.user.id === currentUser.id))
        // console.log(bool)
            if (bool)
            likeBtn.innerText = '❤️'
            else
            likeBtn.innerText = '♡'
            }
    else
        likeBtn.innerText = '♡'
  
        likeBtn.className = 'heart-btn'
        likeBtn.addEventListener('click', () => likeOrUnlikeAPost(post, likeBtn, likesCount))
        likeBtnDiv.append(likeBtn)
    const likesCount = document.createElement('p')
        likesCount.className = 'likes-count'
        likesCount.innerText = post.likes.length
        likeBtnDiv.append(likesCount)

    homePostDiv.append(h3username, postImgDiv, likeBtnDiv, captionP)

    if (post.comments.length > 0) {
    post.comments.forEach(comment => {
        let commentP = document.createElement('p')
        commentP.innerHTML = `<strong>${comment.user.username}: </strong> ${comment.content}`
        homePostDiv.append(commentP)
    })}
    // if (post.hashtags.length > 0) {
    //     post.hashtags.forEach(hashtag => {
    //         let hashtagP = document.createElement('p')
    //         hashtagP.innerText = hashtag.name
    //         homePostDiv.append(hashtagP)
    //     })}

        let addCommentInput = document.createElement('input')
        addCommentInput.className = 'add-new-comment'
        addCommentInput.setAttribute('type', 'text')
        addCommentInput.setAttribute('placeholder', 'Add a comment...')
        addCommentInput.setAttribute('id', currentUser.id)
        addCommentInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                let content = addCommentInput.value
                    
                configObj = {method: 'POST', 
                            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                            body: JSON.stringify({content, user_id: currentUser.id, post_id: post.id})}
                    
                fetch(commentsUrl, configObj)
                .then(res => res.json())
                .then(newcomment => {
                    let newCommentP = document.createElement('p')
                    newCommentP.innerHTML = `<strong>${newcomment.user.username}: </strong> ${newcomment.content}`
                    homePostDiv.insertBefore(newCommentP, addCommentInput)
                    addCommentInput.value = ''
                })
            }
        });
    
        homePostDiv.append(addCommentInput)
    
    homepageContainerDiv.append(homePostDiv)
}

function likeOrUnlikeAPost(post, likeBtn, likesCount){
    fetch(postsUrl + post.id)
    .then(res => res.json())
    .then(post => {
        if (likeBtn.innerText === '❤️'){
            likeBtn.innerText = '♡'
            let likeObj = post.likes.find(likeObj => likeObj.user_id === currentUser.id)
            fetch(likesURL + likeObj.id, {method: 'DELETE'})
            .then(() => likesCount.innerText = post.likes.length)
        }
        else if (likeBtn.innerText === '♡'){
            likeBtn.innerText = '❤️'
            configObj = { method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                          body: JSON.stringify({post_id: post.id, user_id: currentUser.id})
                        }
            fetch(likesURL, configObj)
            .then(res => res.json())
            .then(likeObj => likesCount.innerText = likeObj.post.likes.length)
        }
    })
    
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
