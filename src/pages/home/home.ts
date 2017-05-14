import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((data)=>{
      console.log('Authstate Chnaged');
      console.log(data);
    })

  }

  anonLogin(){
    this.afAuth.auth.signInAnonymously().then((data)=>{
      console.log('Successfully logged in');
      console.log(data);
    },(err)=>{
      console.log('Login Failed: ' + err.message);
      console.log(err);
    });
  }

}
