import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import 'firebase/firestore';
import 'firebase/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	new_item_form:FormGroup;
	user= {email:"", password:""}
	


  constructor(private db:AngularFirestore, public afAuth: AngularFireAuth,private router:Router, private formBuilder:FormBuilder) { 
  	
	

  }

   ngOnInit() {
   		this.new_item_form = this.formBuilder.group({
		email: new FormControl("", Validators.required),
		password: new FormControl('', Validators.required)
		});
  }

  /*async uploadDataToFirebase() {

  	console.log(this.db.collection('Carts').doc(firebase.auth().currentUser.uid))
  	const user = this.db.collection('Carts').doc(firebase.auth().currentUser.uid)

  	var docRef = this.db.collection("Carts").doc(firebase.auth().currentUser.uid);

docRef.get().toPromise().then((doc) => {
    if (!doc.exists) {
    	 const createProfile : Promise<void> =this.db.collection('Carts').doc(firebase.auth().currentUser?.uid).set({
      cart:[]
        // do stuff with the data
      })
    	 return Promise.all([createProfile])
        
    } 

}).catch((error) => {
    console.log("Error getting document:", error);
});

  	user.get().toPromise().then(async(docSnapshot) => {
    if (docSnapshot.exists) {
     
    
      // create the document
    

    
	    }})
  }*/


  async login() {
  	//console.log(item.email+"  "+item.password)
    
  	console.log("signin ...");
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(async () => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return await firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password);
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  this.router.navigateByUrl('/');


  
}

loginGoogle(){
	var self=this;
	var provider=new firebase.auth.GoogleAuthProvider();
	provider.addScope('profile');
	provider.addScope('email');
	firebase.auth().signInWithPopup(provider).then(function(result) {
		var token = result.credential.providerId;
		var user = result.user;
		self.router.navigate(["/"]);

	})
}

goToSignUp(){
  this.router.navigate([("/signup")])
}

 

}
