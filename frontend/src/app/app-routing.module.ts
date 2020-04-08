import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component'
import { CategoryComponent } from './components/category/category.component';
import { PostComponent } from './components/post/post.component';

const routes: Routes = [
  { 
    path: '', 
    component: MainComponent,
    children:[
      { path: 'category', component: CategoryComponent},
      { path: 'post', component: PostComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
