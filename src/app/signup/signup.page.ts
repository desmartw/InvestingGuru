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

  signup() {
  	//firebase.initializeApp(config);
  	
  	console.log(this.user.email + "  " + this.user.password)
  	var email = this.user.email
  	var password = this.user.password
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
      //this.uploadDataToFirebase()
  }

  ngOnInit() {
  }

}
