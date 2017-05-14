import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public obj: any = {
    id:"",
    name: "",
    email: ""
  };

  public fbList: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public afDB:AngularFireDatabase) {
    afAuth.authState.subscribe((data)=>{
      console.log('Authstate Chnaged');
      console.log(data);
    })
    this.fbList = afDB.list("/test/v1/obj");
  }

  public anonLogin(){
    this.afAuth.auth.signInAnonymously().then((data)=>{
      console.log('Successfully logged in');
      console.log(data);
    },(err)=>{
      console.log('Login Failed: ' + err.message);
      console.log(err);
    });
  }

  public pushThing(id){
    this.fbList.update(id,{
      name: this.obj.name,
      email: this.obj.email
    })
  }

  public setThing(id){
    var fbObj: FirebaseObjectObservable<any> = this.afDB.object("/test/v1/obj/" + id);
    fbObj.update({
      name: this.obj.name,
      email: this.obj.email
    });
  }

  public printObj(obj){
    console.log(obj);
  }

}
