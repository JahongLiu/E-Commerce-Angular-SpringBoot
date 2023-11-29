import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ProductService } from './services/product.service';

import { Routes, RouterModule, Router } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import { OktaAuthGuard, OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG } from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';

import myAppConfig from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  // Use injector to access any service available within your application
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

// path: path to match, component: when path matches, create new instance of component 
const routes: Routes = [
  { path: 'order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage} },
  // OktaAuthGuard is the route guard. if authenticated -> give access to route, else send to login page
  { path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage} },
  // OktaCallbackComponent: once the user is authenticated, they are refirected to your app 
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' }
];

// decorator function to group related components, directives, services etc
@NgModule({
  // declarations: specify the view classes 
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent
  ],
  imports: [
    RouterModule.forRoot(routes), // configure the routes 
    BrowserModule,
    HttpClientModule, // REST client provided by Angular, add support in the application module
    NgbModule, // ng-boostrap <- exposes the exported declarations in NgbModuile and makes them available in the current module
    ReactiveFormsModule,
    OktaAuthModule
  ],
  // create services that the application injects
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: { oktaAuth }}, 
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
    // HTTP_INTERCEPTORS: token for HTTP interceptors, AuthInterceptorService: register as an HTTP interceptor 
    // multi: true -> informs Angular that HTTP_INTERCEPTORS is a token for injection an array of values
  bootstrap: [AppComponent] // specify the main application view i.e. the root component
})
export class AppModule { }
