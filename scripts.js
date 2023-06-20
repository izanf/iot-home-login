import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js'
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyCNQAkW_15jHJl74APyAnfmRvjFYksTI7Q",
    authDomain: "automacaoa3-30cf0.firebaseapp.com",
    databaseURL: "https://automacaoa3-30cf0-default-rtdb.firebaseio.com",
    projectId: "automacaoa3-30cf0",
    storageBucket: "automacaoa3-30cf0.appspot.com",
    messagingSenderId: "898675782780",
    appId: "1:898675782780:web:d1e0cfdfa332a23735c5f9",
    measurementId: "G-3SFKGTFTLY"
};

const app = initializeApp(firebaseConfig);

function objectToQueryString(obj) {
    const keyValuePairs = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(obj[key]);
            keyValuePairs.push(`${encodedKey}=${encodedValue}`);
        }
    }

    return keyValuePairs.join('&');
}

(function () {
    const onSubmit = (event) => {
        event.preventDefault()
        const [emailEl, passwordEl] = event.target
        const { value: email } = emailEl
        const { value: password } = passwordEl
        const auth = getAuth(app);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { stsTokenManager } = userCredential.user;
                const encodedParams = objectToQueryString(stsTokenManager)

                window.location.href = 'http://localhost:3000?' + encodedParams;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const formEl = document.querySelector('form#myForm')
    formEl.addEventListener('submit', onSubmit)
})()
