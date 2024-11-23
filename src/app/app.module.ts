import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FIREBASE_OPTIONS, AngularFireModule  } from '@angular/fire/compat';
import { NgOptimizedImage } from '@angular/common'

import { ENVIRONMENT } from '../../src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		NgOptimizedImage,
		AppRoutingModule,

		AngularFireModule.initializeApp( ENVIRONMENT.FIREBASE_CONFIG ),
		AngularFireAuthModule,
		AngularFireStorageModule,
	],
	providers: [
		provideFirebaseApp(() => initializeApp( ENVIRONMENT.FIREBASE_CONFIG )),
		provideFirestore(() => getFirestore()),
		{ provide: FIREBASE_OPTIONS,
		useValue: ENVIRONMENT.FIREBASE_CONFIG },
		DatePipe,
		provideClientHydration()
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
