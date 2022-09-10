import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { LoginBtnComponent } from './components/nav/login-btn/login-btn.component';
import { RegisterBtnComponent } from './components/nav/register-btn/register-btn.component';
import { LogoComponent } from './components/nav/logo/logo.component';
import { NavComponent } from './components/nav/nav/nav.component';
import { SliderComponent } from './components/body/slider/slider.component';
import { CategoriesComponent } from './components/body/categories/categories.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { ContactComponent } from './components/footer/contact/contact.component';
import { LoginPageComponent } from './components/user/login-page/login-page.component';
import { RegisterPageComponent } from './components/user/register-page/register-page.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { MainPageComponent } from './components/body/main-page/main-page.component';
import { ProductsComponent } from './components/body/products/products.component';
import { ProductDetailComponent } from './components/body/product-detail/product-detail.component';
import { ProductDetailSliderComponent } from './components/body/product-detail-slider/product-detail-slider.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CartComponent } from './components/cart/cart.component';
import { FilterPipe } from './pipes/filter.pipe';
import { DiscountPipe } from './pipes/discount.pipe';
import { SearchBarComponent } from './components/body/search-bar/search-bar.component';
import { LoadingComponent } from './components/body/loading/loading.component';
import { CartBtnComponent } from './components/nav/cart-btn/cart-btn.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel/admin-panel.component';
import { PhotosPanelComponent } from './components/admin-panel/photos/photos-panel/photos-panel.component';
import { ProductsPanelComponent } from './components/admin-panel/products/products-panel/products-panel.component';
import { CategoriesPanelComponent } from './components/admin-panel/categories/categories-panel/categories-panel.component';
import { OrdersPanelComponent } from './components/admin-panel/orders-panel/orders-panel.component';
import { AdminPanelBtnComponent } from './components/nav/admin-panel-btn/admin-panel-btn.component';
import { GeneralComponent } from './components/admin-panel/general/general.component';
import { CategoryEditComponent } from './components/admin-panel/categories/category-edit/category-edit.component';
import { ProductEditComponent } from './components/admin-panel/products/product-edit/product-edit.component';
import { CategoryAddComponent } from './components/admin-panel/categories/category-add/category-add.component';
import { ProductAddComponent } from './components/admin-panel/products/product-add/product-add.component';
import { PhotoAddComponent } from './components/admin-panel/photos/photo-add/photo-add.component';
import { PhotoEditComponent } from './components/admin-panel/photos/photo-edit/photo-edit.component';
import { ProductPhotosComponent } from './components/admin-panel/photos/product-photos/product-photos.component';
import { UsersPanelComponent } from './components/admin-panel/users-panel/users-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginBtnComponent,
    RegisterBtnComponent,
    LogoComponent,
    NavComponent,
    SliderComponent,
    CategoriesComponent,
    FooterComponent,
    ContactComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProfileComponent,
    MainPageComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductDetailSliderComponent,
    PaymentComponent,
    CartComponent,
    FilterPipe,
    DiscountPipe,
    SearchBarComponent,
    LoadingComponent,
    CartBtnComponent,
    AdminPanelComponent,
    PhotosPanelComponent,
    ProductsPanelComponent,
    CategoriesPanelComponent,
    UsersPanelComponent,
    OrdersPanelComponent,
    AdminPanelBtnComponent,
    GeneralComponent,
    CategoryEditComponent,
    ProductEditComponent,
    CategoryAddComponent,
    ProductAddComponent,
    PhotoAddComponent,
    PhotoEditComponent,
    ProductPhotosComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
