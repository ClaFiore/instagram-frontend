let currentUser

const likesURL = 'http://localhost:3000/api/v1/likes/'
const usersUrl = 'http://localhost:3000/api/v1/users/'
const postsUrl = 'http://localhost:3000/api/v1/posts/'
const commentsUrl = 'http://localhost:3000/api/v1/comments/'
const followsUrl = 'http://localhost:3000/api/v1/follows/'

const backDiv = document.getElementById('background')
const homepageContainerDiv = document.getElementById('homepage-container')
const profileDiv = document.getElementById('profile')

// navigation bar
const navBarDiv = document.getElementById('nav-bar')
const searchBar = document.querySelector('input.search-bar')
    searchBar.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            let contentSearchBar = searchBar.value
            fetch(usersUrl)
            .then(res => res.json())
            .then(allUsers => {
                let searchedUser = allUsers.find((user) => user.username === contentSearchBar)
                displayUserProfile(searchedUser)
                searchBar.value = ''
            })
        }
    })
const uploadPostIcon = document.querySelector('img.upload-post-icon')
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
            userIcon.src = currentUser.profilepic
            loginDiv.style.display = 'none'
            searchBar.style.display = 'inline-block'
            uploadPostIcon.style.display = 'inline-block'
            displayUserProfile(currentUser)
        }
    }))
    
})


//USER PROFILE //

function displayUserProfile(person){
    fetch(usersUrl + person.id)
    .then(res => res.json())
    .then(user => { 
        //after login clear login div and display navbar with icons
    loginSignupDiv.innerHTML = ''
    homepageContainerDiv.innerHTML = ''
    homeIconImg.style.display = 'inline-block'
    searchBar.style.display = 'inline-block'
    uploadPostIcon.style.display = 'inline-block'
    profileDiv.innerHTML = ''
    createFormDiv.innerHTML = ''
        // then create and display divs with user's info and posts
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
    
    let profilePostOuterDiv = document.createElement('div')
        profilePostOuterDiv.className = 'profile-post-outer-div'
    
        if (user === currentUser){
            const editDiv = document.createElement('div')
            editDiv.className = 'edit-user-btn-div'
            const editUserBtn = document.createElement('button')
            editUserBtn.className = 'edit-user-btn'
            editUserBtn.innerText = 'Edit'
            editUserBtn.addEventListener('click', () => {
                profilePostOuterDiv.innerHTML = ''
                let editFormDiv = document.createElement('div')
                editFormDiv.className = 'edit-form-div'
                profilePostOuterDiv.append(editFormDiv)
                let editForm = document.createElement('form')
                    editForm.className = 'edit-form'
                editFormDiv.append(editForm)
                    editForm.innerHTML= `<label for='username'>Username: </label>
                                        <input class='edit-input' id='username' type='text' value='${user.username}' name='username'> <br></br>
                                        <label for='name'>Name: </label>
                                        <input class='edit-input' id='name' type='text' value='${user.name}' name='fullname'> <br></br>
                                        <label for='bio'>Bio: </label>
                                        <input class='edit-input' id='bio' type='text' value='${user.bio}' name='bio'> <br></br>
                                        <label for='profilepic'>Profile Picture: </label>
                                        <input class='edit-input' id='profilepic' type='textarea' value='${user.profilepic}' name='profilepic'> <br></br>
                                        <button id='submit' type='submit name='submit'>Update Profile</button> <br></br>`
                    editForm.addEventListener('submit', () => {
                        event.preventDefault()
                        let username = editForm.username.value
                        let name = editForm.fullname.value
                        let bio = editForm.bio.value
                        let profilepic = editForm.profilepic.value
                        debugger
                        let configObj = {
                            method: 'PATCH',
                            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
                            body: JSON.stringify({username, name, bio, profilepic})
                        }
                        fetch(usersUrl + user.id, configObj)
                        .then(res => res.json())
                        .then(updatedUser => {
                            currentUser = updatedUser
                            displayUserProfile(updatedUser)})
                    })

                })
            editDiv.append(editUserBtn)
            profileContainer.append(editDiv)}
        else
            { const followDiv = document.createElement('div')
            followDiv.className = 'edit-user-btn-div'
            const followBtn = document.createElement('button')
            followBtn.className = 'follow-btn'
            followDiv.append(followBtn)
            profileContainer.append(followDiv)
            if (user.followers.some(follower => follower.id === currentUser.id))
                {followBtn.innerText = 'Following'
                followBtn.addEventListener('click', ()=> unfollow(user, followBtn, followersSpan))}
            else 
                {followBtn.innerText = 'Follow'
                followBtn.addEventListener('click', ()=> follow(user, followBtn, followersSpan))}
            }
    
    const bioUser = document.createElement('p')
        bioUser.innerText = user.bio
        bioUser.className = 'bio-user'
    const postAndFollowsCountDiv = document.createElement('div')
            postAndFollowsCountDiv.className = 'post-and-follows-count-div'
    const postCountSpan = document.createElement('span')
            postCountSpan.className = 'count-span'
            postCountSpan.innerText = user.posts.length + ' posts'
    const followersSpan = document.createElement('span')
            followersSpan.className = 'count-span'
            followersSpan.innerText = user.followers.length + ' followers'
    const followeesSpan = document.createElement('span') 
            followeesSpan.className = 'count-span'
            followeesSpan.innerText = user.followees.length + ' following'
    postAndFollowsCountDiv.append(postCountSpan, followersSpan, followeesSpan)
    
    profileContainer.append(picDiv, profileUsername, postAndFollowsCountDiv, profileName, bioUser)
    
    
    profileDiv.append(profilePostOuterDiv)

    user.posts.sort(function(a, b) {
        let keyA = new Date(a.created_at),
         keyB = new Date(b.created_at);
        // Compare the 2 dates
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      })
    user.posts.forEach(post => displayUserPost(post, profilePostOuterDiv))
})
}



function follow(user, followBtn, followersSpan){
    configObj = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({follower_id: currentUser.id, followee_id: user.id})
        }
    fetch(followsUrl, configObj)
    .then(res => res.json())
    .then(newfollow => {
        followBtn.innerText = 'Following'
        fetch(usersUrl + user.id)
        .then(res => res.json())
        .then(updatedUser => followersSpan.innerText = updatedUser.followers.length + ' followers')
    })
}



function unfollow(user, followBtn, followersSpan){
    fetch(followsUrl)
    .then(res => res.json())
    .then(allFollowObjs => {
        let followObject = allFollowObjs.find(followObj => followObj.follower_id === currentUser.id && followObj.followee_id === user.id)
        fetch(followsUrl + followObject.id, {method: 'DELETE'})
        .then(() => {
            followBtn.innerText = 'Follow'
            fetch(usersUrl + user.id)
            .then(res => res.json())
            .then(updatedUser => followersSpan.innerText = updatedUser.followers.length + ' followers')
        })
    })
}



function displayUserPost(post, profilePostOuterDiv){
    let singlePostDiv = document.createElement('div')
    singlePostDiv.className = 'single-post-div'
    profilePostOuterDiv.append(singlePostDiv)

    let imagePostDiv = document.createElement('div')
    imagePostDiv.className = 'profile-post-image'
    singlePostDiv.append(imagePostDiv)

    let image = document.createElement('img')
    image.addEventListener('click', () => modal(post, profilePostOuterDiv))
    
    image.className = 'profile-user-post-image'
    image.src = post.image
    imagePostDiv.append(image)

}

function modal(post, profilePostOuterDiv){
    let modalDiv = document.createElement('div')
    modalDiv.className = 'modal'
    profilePostOuterDiv.append(modalDiv)

    let imageDivModal = document.createElement('div')
    imageDivModal.className = 'image-div-modal'
    modalDiv.append(imageDivModal)

    let modalImage = document.createElement('img')
    modalImage.className = 'modal-image'
    imageDivModal.append(modalImage)
    modalDiv.style.display = "block";
    modalImage.src = post.image;

    let closingSpan = document.createElement('span')
    closingSpan.className = 'closing-span'
    closingSpan.innerText = 'X'
    modalDiv.append(closingSpan)
    closingSpan.addEventListener('click', () => modalDiv.remove())

    let specsDiv = document.createElement('div')
    specsDiv.className = 'specs-div'
    modalDiv.append(specsDiv)

    const likeBtnDiv = document.createElement('div')
    const likeBtn = document.createElement('button')
    const likesCount = document.createElement('p')
        likesCount.className = 'likes-count'
        likesCount.innerText = post.likes.length
        console.log(post)
        if (post.likes.length > 0){
            let bool = post.likes.some(like => (like.user_id === currentUser.id))
                if (bool)
                likeBtn.innerText = '❤️'
                else
                likeBtn.innerText = '♡'
                }
        else{
            likeBtn.innerText = '♡'}
  
        likeBtn.className = 'heart-btn'
        likeBtn.style.paddingLeft = '10px'
        likeBtn.addEventListener('click', () => likeOrUnlikeAPost(post, likeBtn, likesCount))
        likeBtnDiv.append(likeBtn)
    
        likeBtnDiv.append(likesCount)
        specsDiv.append(likeBtnDiv)

        let captionP = document.createElement('p')
        captionP.style.paddingLeft = '10px'
        captionP.style.paddingBottom = '10px'
        captionP.innerHTML = post.caption
        specsDiv.append(captionP)

        if (post.comments.length > 0) {
            post.comments.forEach(comment => {
                let commentDiv = document.createElement('div')
                commentDiv.className = 'comment-div'
                let commentP = document.createElement('p')
                commentP.className = 'comment'
                commentDiv.append(commentP)
                fetch(usersUrl + comment.user_id)
                .then(res => res.json())
                .then(commentUser => {
                commentP.innerHTML = `<strong>${commentUser.username}: </strong> ${comment.content}`
                    if (commentUser.id === currentUser.id){
                        let editCaptionSpan = document.createElement('span')
                        editCaptionSpan.innerText = 'Edit'
                        editCaptionSpan.className = 'edit-caption-span'
                        editCaptionSpan.addEventListener('click', () => editComment(comment, commentUser, commentP, editCaptionSpan, commentDiv))
                        commentDiv.append(editCaptionSpan)
                    }
            })
            specsDiv.append(commentDiv)
                
            })}
        
        let addCommentInput = document.createElement('input')
        specsDiv.append(addCommentInput)
            addCommentInput.className = 'add-new-comment'
            addCommentInput.setAttribute('type', 'text')
            addCommentInput.style.paddingLeft = '10px'
            addCommentInput.style.position = 'absolute'                             //***INLINE STYLING FOR TIME AND COMMENT INPUT INSIDE POST ***
            addCommentInput.style.bottom = '10px'
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
                        newCommentP.style.paddingLeft = '10px'
                        specsDiv.insertBefore(newCommentP, timeP)
                        addCommentInput.value = ''
                    })
                }
            });
        
            let timeP = document.createElement('p')
                timeP.className = 'time'
                timeP.innerText = post.time
                timeP.style.paddingLeft = '10px'
                timeP.style.position = 'absolute'
                timeP.style.bottom = '40px'                                         //***INLINE STYLING FOR TIME AND COMMENT INPUT INSIDE POST ***
                specsDiv.append(timeP, addCommentInput)
    
}

function editComment(comment, commentUser, commentP, editCaptionSpan, commentDiv){
    commentDiv.innerHTML = `<strong>${commentUser.username}:</strong> <input value='${comment.content}'>`
    

}



let xIcon = document.createElement('img')
    xIcon.src='https://img2.pngio.com/black-x-png-picture-436067-black-x-png-black-x-png-1024_1024.png'
    xIcon.className = 'x-icon'
let enlargedPostDiv = document.createElement('div')
    enlargedPostDiv.className = 'enlarged-post-div'



function enlargePost(post, profilePostOuterDiv){
    console.log(post)
    enlargedPostDiv.innerHTML = ''
    profilePostOuterDiv.prepend(enlargedPostDiv)
    enlargedPostDiv.prepend(xIcon)

    let enlargedImageDiv = document.createElement('div')
        enlargedImageDiv.className = 'enlarged-image-div'
        enlargedPostDiv.append(enlargedImageDiv)

    let enlargedImage = document.createElement('img')
        enlargedImage.src = post.image
        enlargedImage.className = 'enlargedImage'
        enlargedImageDiv.append(enlargedImage)

        xIcon.addEventListener('click', () => enlargedPostDiv.remove())
}


// function editUser(user){
//     console.log(user)
//     // profilepostOuterDiv.innerHTML = ''
//     let posts = document.getElementsByClassName('single-post-div')
    
    
//     posts.forEach(post => console.log(post))
//  // patch request to edit user
// }


// CREATE POST //
uploadPostIcon.addEventListener('click', () => createPost())
let createFormDiv = document.createElement('div')
    // createFormDiv.classList = 'form-group'
    createFormDiv.classList = 'create-form-div'

function createPost(){
    loginSignupDiv.innerHTML = ''
    homepageContainerDiv.innerHTML = ''
    profileDiv.innerHTML = ''
    createFormDiv.innerHTML = ''
    let createForm = document.createElement('form')
        createForm.setAttribute('id', 'create-form')
    let createFormLabel = document.createElement('label')
        createFormLabel.setAttribute('for', 'create-form')
        createFormLabel.className = 'create-form-input'
        createFormLabel.innerHTML = 'Create a Post<br />'
    let uploadInput = document.createElement('input')
        uploadInput.className = 'create-form-input'
        uploadInput.setAttribute('type', 'text')
        uploadInput.setAttribute('name', 'url')
        uploadInput.placeholder = 'Image Url'
        // uploadInput.setAttribute('type', 'file')            //*** UPLOAD FILE ***
        // uploadInput.setAttribute('accept', 'image/*')
        // uploadInput.setAttribute('name', 'uploadedFile')
        uploadInput.attributes.required = 'Required'
    let createCaptionInput = document.createElement('input')
        createCaptionInput.className = 'create-form-input'
        createCaptionInput.type = 'text'
        createCaptionInput.name = 'caption'
        createCaptionInput.placeholder = 'Caption'
    let submitCreateInput = document.createElement('input')
        submitCreateInput.classList = 'create-form-input'
        submitCreateInput.classList = 'create-form-submit-btn'
        submitCreateInput.setAttribute('type', 'submit')
        createForm.append(createFormLabel, br, uploadInput, br, createCaptionInput, br, submitCreateInput)
    createFormDiv.append(createForm)
    backDiv.append(createFormDiv)

    createForm.addEventListener('submit', function(e) {
        e.preventDefault()
        let user_id = currentUser.id
        let image = e.target.url.value
        let caption = e.target.caption.value
        configObj = {method: 'POST', headers: {'Content-Type': 'application/json', Accept: 'application/json'}, body: JSON.stringify({image, caption, user_id})}
        fetch(postsUrl, configObj)
        .then(res => res.json())
        .then(newPost => {
            createForm.reset()
            createFormDiv.remove()
            getPosts()
        })
        //                  ***** FORMDATA TO UPLOAD FILE - NEED ACTIVE STORAGE   ****
        // let file = e.target.uploadedFile.files[0]
        // console.log(file)
        // let formData = new FormData()
        // formData.append('file', file)
        // fetch('http://localhost:3000/upload_files', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(resp => resp.json())
        // .then(data => {
        //     if (data.errors) {
        //         alert(data.errors)
        //     }
        //     else {
        //         console.log(data)
        //     }
        // })
     })

}



// HOMEPAGE //

function getPosts(){
    fetch(postsUrl)
    .then(res => res.json())
    .then(postsArray => {
        postsArray.sort(function(a, b) {

            let keyA = new Date(a.created_at),
             keyB = new Date(b.created_at);
            // Compare the 2 dates
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
          })
         
        postsArray.forEach(post => renderPostHome(post))
    })

}


function renderPostHome(post){
    
    profileDiv.innerHTML = ''
    homepageContainerDiv.style.display = 'block'

    const homePostDiv = document.createElement('div')
        homePostDiv.className = 'home-post'
    const profilePicIconPostDiv = document.createElement('div')
        profilePicIconPostDiv.className = 'profile-pic-post-div'
        homePostDiv.append(profilePicIconPostDiv)
    const profilePicPostImg = document.createElement('img')
        profilePicPostImg.className = 'profile-pic-post-img'
        profilePicPostImg.src = post.user.profilepic
        profilePicIconPostDiv.append(profilePicPostImg)
    const h3username = document.createElement('h3')
        h3username.innerText = post.user.username
        h3username.addEventListener('click', () => displayUserProfile(post.user))
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
    else{
        likeBtn.innerText = '♡'}
  
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
                    homePostDiv.insertBefore(newCommentP, timeP)
                    addCommentInput.value = ''
                })
            }
        });
    
        let timeP = document.createElement('p')
            timeP.className = 'time'
            timeP.innerText = post.time
            // let date = new Date(post.created_at)
            // timeP.innerText = date.toDateString() + ', at ' + date.getHours() + ':' + date.getMinutes()

        homePostDiv.append(timeP, addCommentInput)
    
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
            .then(() => {
                fetch(postsUrl + post.id)
                    .then(res => res.json())
                    .then(updatedPost => {
                    likesCount.innerText = updatedPost.likes.length
                    })
            })
        }
        else if (likeBtn.innerText === '♡'){
                likeBtn.innerText = '❤️'
                configObj = { method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                            body: JSON.stringify({post_id: post.id, user_id: currentUser.id})
                            }
                fetch(likesURL, configObj)
                .then(res => res.json())
                .then(likeObj => {
                    fetch(postsUrl + post.id)
                    .then(res => res.json())
                    .then(updatedPost => {
                    likesCount.innerText = updatedPost.likes.length
                    })    
            })
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
    
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault()
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
