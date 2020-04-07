import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from './components/post/post.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component'

const routes: Routes = [
  { path: '', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
