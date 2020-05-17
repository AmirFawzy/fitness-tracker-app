import { NgModule } from '@angular/core';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { AngularFireAuthModule } from '../../../node_modules/angularfire2/auth';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    AngularFireAuthModule,
    AuthRoutingModule
  ],
  declarations: [
    SignupComponent,
    SigninComponent
  ]
})
export class AuthModule { }
