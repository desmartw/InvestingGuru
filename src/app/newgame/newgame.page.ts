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
  selector: 'app-newgame',
  templateUrl: './newgame.page.html',
  styleUrls: ['./newgame.page.scss'],
})
export class NewgamePage implements OnInit {
		new_item_form:FormGroup;
	user= {amount:0}
constructor(private afs:AngularFirestore, public afAuth: AngularFireAuth,private router:Router, private formBuilder:FormBuilder) {}

   ngOnInit() {
   		this.new_item_form = this.formBuilder.group({
		amount: new FormControl("", Validators.required),
		});
  }

  newGame(){
  	const updateRef = this.afs.collection('Users').doc(firebase.auth().currentUser.uid);
    updateRef.update({
      simlist: [],
      simcost:0,
      simbalance:5000,
      dailyMove:0
    });

    

  }

}
