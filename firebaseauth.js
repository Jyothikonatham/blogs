import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

//initialized firebase
const firebaseConfig = {
  apiKey: "AIzaSyB46VtxrNGS9nnzo8vIWd03Pcq291g9_JU",
  authDomain: "major-7a8dd.firebaseapp.com",
  projectId: "major-7a8dd",
  storageBucket: "major-7a8dd.firebasestorage.app",
  messagingSenderId: "559340591437",
  appId: "1:559340591437:web:be8148ad0f8380b7d73f04"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);


//get dom elements of signup
const signUp = document.getElementById("btn");
if (signUp) {
  signUp.addEventListener("click", (event) => {

    event.preventDefault();
    const email = document.getElementById("mail").value;
    const password = document.getElementById("pass").value;
    const name = document.getElementById("name").value;

    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        name: name,
      };

      alert("account created successfully")
      console.log(userData);
      // setTimeout(() => {
      //   window.location.href = "./login.html";
      // }, 3000);
      window.location.href = "./login.html";
    }
    ).catch((error) => {
      console.log(error);
      alert(`Failed to sign up: ${error.message}`);
    });
  });
}



//get dom elements of login
const signin = document.getElementById("lbtn");
if (signin) {
  signin.addEventListener("click", (event) => {

    event.preventDefault();
    const email_login = document.getElementById("email_Login").value;
    const password_login = document.getElementById("pass_login").value;
    console.log(email_login, password_login);


    signInWithEmailAndPassword(auth, email_login, password_login).then((userCredential) => {
      const user = userCredential.user;
      alert("account logged in successfully", user)
      // setTimeout(() => {
      //   window.location.href = "./index.html";
      // }, 3000);
      window.location.href = "./index.html";
    }
    ).catch((error) => {
      console.log(error);
      alert(`failded to login ${error.message}`)
    });
  });
}



onAuthStateChanged(auth, (user) => {
  if (user)
    console.log("user logged in ", user);
  else {
    console.log("no user logged in");
  }
})

// Google Sign-In
const googleBtn = document.getElementById("lgoogle");
if (googleBtn) {
  googleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        alert("Google Sign-In successful");
        window.location.href = "./index.html";
      })
      .catch((error) => {
        console.error(error);
        alert(`Google Sign-In failed: ${error.message}`);
      });
  });
}

// Guest Sign-In
const guestBtn = document.getElementById("lguestButton");
if (guestBtn) {
  guestBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const result = await signInAnonymously(auth);
      const user = result.user;

      await setDoc(doc(db, "guests", user.uid), {
        signedInAt: new Date(),
        anonymous: true
      });

      alert("Signed in as Guest!");
      window.location.href = "./index.html";
    } catch (error) {
      console.error(error);
      alert(`Guest sign-in failed: ${error.message}`);
    }
  });
}



