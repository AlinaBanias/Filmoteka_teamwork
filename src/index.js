import { sliderRevenueFilms } from './js/slideRevenueFilms';
import { backToTop } from './js/scrolToHome';
import { ShowFilms } from './js/functionsForFilms';
import { error } from 'console';

sliderRevenueFilms();
// слайлдер з фільмами, що зібрали найбільшу касу
ShowFilms();
// фільми топ, фільми за пошуком 

backToTop();
// кнопка повернення до гори

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage';
import { async } from '@firebase/util';

//елементи, до яких потрібно достучатись
const authRefs = {
    emailInput: document.querySelector('.js-auth__email-input'),
    passwordInput: document.querySelector('.js-auth__password-input'),
    entranceBtn: document.querySelector('.js-auth__entrance-btn'),
    registrationBtn: document.querySelector('.js-auth__registration-btn'),
    addToWatchedBtn: document.querySelector('.js-auth__add-to-watched-btn'),
    addToQueueBtn: document.querySelector('.js-auth__add-to-queue-btn'),
    form: document.querySelector('.js-auth__form'),
};

class User {

    static create(newUser) {
        return fetch('https://filmoteka-25bd4-default-rtdb.firebaseio.com/users.json', {
          method: 'POST',
          body: JSON.stringify(newUser),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(response => {console.log(response)})/* {
            newUser.id = response.name;
            return newUser;
          })
          .then(addToLocalStorage)
          .then(User.renderList) */
      }


    static fetch(token) {
        if (!token) {
          return Promise.resolve('<p class="error">У вас нет токена</p>')
        }
        return fetch(`https://podcast-app-15663.firebaseio.com/questions.json?auth=${token}`)
          .then(response => response.json())
          .then(response => {
            if (response && response.error) {
              return `<p class="error">${response.error}</p>`
            }
    
            return response ? Object.keys(response).map(key => ({
              ...response[key],
              id: key
            })) : []
          })
      }

    static take(token) {
        return fetch(`https://filmoteka-25bd4-default-rtdb.firebaseio.com/users.json?auth=${token}`)
          .then(response => response.json())
          .then(response => {
            /* if (response && response.error) {
              return `<p class="error">${response.error}</p>`
            } */
    
            console.log(Object.keys(response).map(key => ({
              ...response[key],
              id: key
            })))
          })
      }
    }


// натискання кнопки авторизації
authRefs.entranceBtn.addEventListener('click', entranceSubmitHandler);

function entranceSubmitHandler(event) {
    event.preventDefault();

    const email = authRefs.emailInput.value;
    const password = authRefs.passwordInput.value;

    console.log(email, password);
    authWithEmailAndPassword(email, password)
    .then();
    
}

export function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyCh4IOUhN3RY5RpYi3dFrDkgc69KqBpI3o';

    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: 'POST',
      body: JSON.stringify({
        email, password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data.registered))
      
      
      
      //"Нет такого пользователя, загеристрируйтесь или проверьте введенные данные"
}


//інфа для зберігання на бекенді

const userBackend = {
    email: null,
    watched: [],
    queue: [],
    theme: "light",
};


// натискання кнопок додати до
let watched = false;
let queue = false;

authRefs.addToWatchedBtn.addEventListener('click', addToWatchSubmitHandler);

function addToWatchSubmitHandler() {
    
if (watched === false) {
    userBackend.email=authRefs.emailInput.value;
    //watched = true;
    userBackend.queue.push(1);
    authRefs.addToWatchedBtn.innerText = "remove from watched";
    User.create(userBackend);
    console.log(userBackend);
    return;
}
watched = false;
authRefs.addToWatchedBtn.innerText = "add to watched";
}






// натискання кнопки реєстрації

authRefs.registrationBtn.addEventListener('click', registrationSubmitHandler);
function registrationSubmitHandler(event) {
    event.preventDefault();
    User.take("-NLTqy3zQecsVuFEu2Rz");
/* 
    const email = authRefs.emailInput.value;
    const password = authRefs.passwordInput.value;

    console.log(email, password); */
    /* return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
      method: 'POST',
      body: JSON.stringify({
        email, password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => data.idToken); */


   // authWithEmailAndPassword(email, password);
   /* registerUser (email,password); */
   // console.log(user);
}

/* async function registerUser (email,password) {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log(user);
} */