import { ProductPhotosComponent } from './components/admin-panel/photos/product-photos/product-photos.component';
import { PhotoEditComponent } from './components/admin-panel/photos/photo-edit/photo-edit.component';
import { PhotoAddComponent } from './components/admin-panel/photos/photo-add/photo-add.component';
import { PhotosPanelComponent } from './components/admin-panel/photos/photos-panel/photos-panel.component';
import { ProductAddComponent } from './components/admin-panel/products/product-add/product-add.component';
import { CategoryEditComponent } from './components/admin-panel/categories/category-edit/category-edit.component';
import { CategoriesPanelComponent } from './components/admin-panel/categories/categories-panel/categories-panel.component';
import { ProductsPanelComponent } from './components/admin-panel/products/products-panel/products-panel.component';
import { UsersPanelComponent } from './components/admin-panel/users-panel/users-panel.component';
import { OrdersPanelComponent } from './components/admin-panel/orders-panel/orders-panel.component';
import { GeneralComponent } from './components/admin-panel/general/general.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel/admin-panel.component';
import { ProductDetailComponent } from './components/body/product-detail/product-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterPageComponent } from './components/user/register-page/register-page.component';
import { LoginPageComponent } from './components/user/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/body/main-page/main-page.component';
import { ProductsComponent } from './components/body/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductEditComponent } from './components/admin-panel/products/product-edit/product-edit.component';
import { CategoryAddComponent } from './components/admin-panel/categories/category-add/category-add.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: MainPageComponent },
  { path: "products", component: ProductsComponent },
  { path: "products/discounted", component: ProductsComponent },
  { path: "products/category/:categoryid", component: ProductsComponent },
  { path: "products/productdetails/:productid", component: ProductDetailComponent },

  { path: "cart", component: CartComponent },
  { path: "cart/payment", component: PaymentComponent },

  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterPageComponent },

  { path: "adminpanel", component: AdminPanelComponent },
  { path: "categoriespanel", component: CategoriesPanelComponent },
  { path: "addcategory", component: CategoryAddComponent },
  { path: "categorydetails/:categoryid", component: CategoryEditComponent },

  { path: "productspanel", component: ProductsPanelComponent },
  { path: "addproduct", component: ProductAddComponent },
  { path: "productdetails/:productid", component: ProductEditComponent },

  { path: "photospanel", component: PhotosPanelComponent },
  { path: "addphoto/:productid", component: PhotoAddComponent },
  { path: "productphotos/:productid", component: ProductPhotosComponent },
  { path: "productphotos/:productid/editproductphotos/:photoid", component: PhotoEditComponent },

  { path: "userspanel", component: UsersPanelComponent },
  { path: "orderspanel", component: OrdersPanelComponent },
  { path: "general", component: GeneralComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
