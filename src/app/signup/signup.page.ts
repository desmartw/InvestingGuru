import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Stock } from '../modal/Stock';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
	user={
		email:"",
    username:"",
		password:"",
		confirmPassword:""};
	created=true;
	

  constructor(private db:AngularFirestore,public afAuth: AngularFireAuth,private router:Router) { }

/*  async uploadDataToFirebase() {
    const createProfile : Promise<void> =this.db.collection('Carts').doc(firebase.auth().currentUser?.uid).set({
      cart:[]
    })
   

    return await Promise.all([createProfile])
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
  async signup() {
  	//firebase.initializeApp(config);
  	
  	console.log(this.user.email + "  " + this.user.password)
  	var email = this.user.email
  	var password = this.user.password
    var username = this.user.username
  	var self = this;
  	if(password==this.user.confirmPassword) {
  	firebase.auth().createUserWithEmailAndPassword(email, password).catch(
      

  		function(error) {
  			console.log(error);
  			var errorCode = error.code;
  			var errorMessage = error.message;
  			console.log(error.message);
  			if(errorCode.length>0){
  				console.log("Failed");
  			}
  			else {
  				console.log("signup ok")
  			}
  		}).then(function(user){


        
        
      
  			console.log("finished creating account")
  			//self.router.navigate(["/tabs/tab1"])

  		})
  	}

    const createProfile : Promise<void> =this.db.collection('Users').doc(firebase.auth().currentUser?.uid).set({
      dailyMove:0,
      simbalance:0,
      simcost:0,
      username: this.user.username,
      watchlist:[],
      simlist:[]
    })
    self.router.navigate(["/tabs/tab1"])

    return await Promise.all([createProfile])
      //this.uploadDataToFirebase()
  }

  goToLogin(){
    this.router.navigate([("/login")])
  }

  ngOnInit() {
  }

}
