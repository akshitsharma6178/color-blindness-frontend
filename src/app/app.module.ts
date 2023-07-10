import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { loginDialog } from './components/header/header.component';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { PopupComponent } from './component/s/popup/popup.component'
import {MatDialogModule} from '@angular/material/dialog'
import {MatInputModule} from '@angular/material/input'
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {MatChipsModule} from '@angular/material/chips'
import {MatSliderModule} from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { environment } from '../environments/environment';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    ImagePreviewComponent,
    loginDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatTooltipModule,
    MatSliderModule,
    MatIconModule,
    MatSnackBarModule
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
