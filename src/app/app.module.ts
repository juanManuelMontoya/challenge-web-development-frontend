import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { RaceComponent } from './shared/pages/race/race.component';
import { CoreModule } from './modules/core/core.module';
import { UsersModule } from './modules/users/users.module';
import { DisplayService } from './modules/shared/services/display.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    RaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    UsersModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DisplayService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
