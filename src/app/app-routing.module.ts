import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandpageComponent } from './landpage/landpage.component';
import { MainComponent } from './main/main.component';
import { PageEditComponent } from './page-edit/page-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'errorNotFound', pathMatch: 'full', 
        component: NotFoundComponent },
  {path:'', component:MainComponent},
  {path:':username/edit', component:PageEditComponent},
  {path:':username', component:LandpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
