import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MainComponent } from "./components/main/main.component";
import { CategoryComponent } from "./components/category/category.component";
import { PostComponent } from "./components/post/post.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { CategoryDetailedComponent } from "./components/category-detailed/category-detailed.component";
import { PostDetailedComponent } from "./components/post-detailed/post-detailed.component";
import { OthersProfileComponent } from "./components/others-profile/others-profile.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { LoginComponent } from "./components/login/login.component";
const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      { path: "", component: MainPageComponent },
      { path: "login", component: LoginComponent },
      { path: "category", component: CategoryComponent },
      { path: "post", component: PostComponent },
      { path: "profile", component: ProfileComponent },
      { path: "category/:id", component: CategoryDetailedComponent },
      { path: "post/:id", component: PostDetailedComponent },
      { path: "profile/:id", component: OthersProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
