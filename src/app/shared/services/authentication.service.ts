import { Injectable } from '@angular/core';
import { User } from '../models/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  userData: any;

  constructor(
    public store: AngularFirestore,
    public authentication: AngularFireAuth,
    public router: Router
  ) {
    this.authentication.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Iniciar sesión con correo electrónico/contraseña
  SignIn(email: string, password: string) {
    return this.authentication
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("ingresó")
        this.router.navigate(['home']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Regístrese
  SignUp(email: string, password: string) {
    return this.authentication
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Enviar verificación de correo electrónico cuando se registre un nuevo usuario
  SendVerificationMail() {
    return this.authentication.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verificar el correo']);
      });
  }

  // Restablecer mi contraseña
  ForgotPassword(passwordResetEmail: string) {
    return this.authentication
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Correo electrónico de restablecimiento de contraseña enviado, verifique su bandeja de entrada.');
        this.router.navigate(['login'])
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Devuelve verdadero cuando el usuario inicia sesión y se verifica el correo electrónico
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    //return user !== null && user.emailVerified !== false ? true : false;
    return user !== null ? true : false;
  }

  // Iniciar sesion con Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((result: any) => {
      if (result) {
        this.SetUserData(result.user);
        this.router.navigate(['home']);
      }
    });
  }

  AuthLogin(provider: any) {
    return this.authentication
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['home']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }


  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.store.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Cerrar session
  SignOut() {
    return this.authentication.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
