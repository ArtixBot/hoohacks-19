var user = firebase.auth().currentUser;

login_button.addEventListener('click', e => {
	// Get email and pass
	const email = document.getElementById('email_field').value;
	const pass = document.getElementById('password_field').value;
	const auth = firebase.auth();
	// Sign in
	const promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch(e => window.alert('Wrong username/password'));
});

register_button.addEventListener('click', e => {
	const email = document.getElementById('email_field').value;
	const pass = document.getElementById('password_field').value;

    if (pass.length < 6){
        window.alert("Passwords need to be 6 characters or longer");
        return;
    }

	const auth = firebase.auth();
	//
	const promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch(e => window.alert('Error registering account'));
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    // User is signed in.
    console.log('Logged in');
	window.location.href = "index.html";
  } else {
    // No user is signed in.
    console.log('Not logged in');
  }
});
