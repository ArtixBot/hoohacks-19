var user = firebase.auth().currentUser;

login_button.addEventListener('click', e => {
	// Get email and pass
	const email = document.getElementById('email_field').value;
	const pass = document.getElementById('password_field').value;
	const auth = firebase.auth();
	// Sign in
	const promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch(e => console.log(e.message));
});

register_button.addEventListener('click', e => {
	const email = document.getElementById('email_field').value;
	const pass = document.getElementById('password_field').value;
	const auth = firebase.auth();
	//
	const promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch(e => console.log(e.message));
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    // User is signed in.
    console.log('Logged in');
  } else {
    // No user is signed in.
    console.log('Not logged in');
  }
});
