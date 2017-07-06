(function(){
	

		  // Initialize Firebase
		  var config = {
		    apiKey: "AIzaSyC-gs-UnkzdCcgAqy3FxeM2HlWFuD_DktA",
		    authDomain: "convoy2-d8d0a.firebaseapp.com",
		    databaseURL: "https://convoy2-d8d0a.firebaseio.com",
		    projectId: "convoy2-d8d0a",
		    storageBucket: "convoy2-d8d0a.appspot.com",
		    messagingSenderId: "440649103232"
		  };
		
		  firebase.initializeApp(config);
		
		//Get Elements
		const txtEmail = document.getElementById ('txtEmail');
		const txtPassword = document.getElementById ('txtPassword');
		const btnLogin = document.getElementById ('btnLogin');
		const btnSignUp = document.getElementById ('btnSignUp');
		const btnLogout = document.getElementById ('btnLogout');

		//Add login event
		btnLogin.addEventListener('click',e =>{

			//Get email and password
			const email =txtEmail.value;
			const password = txtPassword.value;
			const auth = firebase.auth();
			//Sign In
			const promise = auth.signInWithEmailAndPassword(email, password);
			promise.catch(e => console.log(e.message));
			document.getElementById("welcomeuseremail").innerHTML = "Wrong username or password, please try again";
		});

		// Add signup event
		btnSignUp.addEventListener('click',e =>{

			//Get email and password
			//TODO: Check for real email
			const email =txtEmail.value;
			const password = txtPassword.value;
			const auth = firebase.auth();
			//Sign In
			const promise = auth.createUserWithEmailAndPassword(email, password);
			promise.catch(e => console.log(e.message));
			document.getElementById("welcomeuseremail").innerHTML = "Sign up error. Account already exists or wrong email format entered";
		});

		btnLogout.addEventListener('click', e => {
			firebase.auth().signOut().then(function() {
			  // Sign-out successful.
			}).catch(function(error) {
			  // An error happened.
			  console.log("signOut error");
			});
		});

		// Add a realtime listener
		firebase.auth().onAuthStateChanged(firebaseUser => {
			if (firebaseUser){
				console.log(firebaseUser);
				console.log("logged in")
				console.log("Welcome ",firebaseUser.email);
				//Menu displayed for user
				document.getElementById("myspan").style.display = "inline";
				//User logged in - Show Log Out Button
				btnLogout.classList.remove('hide');
				// Welcome message 
				document.getElementById("welcomeuseremail").innerHTML = "Welcome " + firebaseUser.email;
			} else {
				console.log("not logged in");
				btnLogout.classList.add('hide');
				//Menu hidden for non-user
				document.getElementById("myspan").style.display = "none";
				// Clear Welcome message
				document.getElementById("welcomeuseremail").innerHTML = "";
			}
		});
	
}());