import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './root/root.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandpageComponent } from './landpage/landpage.component';
import { SafePipe } from './safe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { PageEditComponent } from './page-edit/page-edit.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { AlbumEditComponent } from './album-edit/album-edit.component';
import { VideoEditComponent } from './video-edit/video-edit.component';
import { TextEditComponent } from './text-edit/text-edit.component';
import { LinkEditComponent } from './link-edit/link-edit.component';
import { SignupComponent } from './signup/signup.component';
import { DateConverter } from './util/DateConverter';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    RootComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LandpageComponent,
    SafePipe,
    MainComponent,
    PageEditComponent,
    ProfileEditComponent,
    AlbumEditComponent,
    VideoEditComponent,
    TextEditComponent,
    LinkEditComponent,
    SignupComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [DateConverter],
  bootstrap: [RootComponent],
})
export class AppModule {}
