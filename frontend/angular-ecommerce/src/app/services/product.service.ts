import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

// angular service that interacts with a backend to fetch data
export class ProductService {


  // httpClient connect to our springboot endpoint of REST API
  private baseUrl = environment.shopApiUrl + '/products';

  private categoryUrl = environment.shopApiUrl + '/product-category';


  // dependency injection: inject HttpClient
  constructor(private httpClient: HttpClient) { }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductListPaginate(thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id, page and size 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  searchProductsPaginate(thePage: number,
    thePageSize: number, 
    theKeyword: string): Observable<GetResponseProducts> {

    // need to build URL based on keyword, page and size 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    // call REST API based on the product URL
    return this.httpClient.get<Product>(productUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    // call REST API
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      // returns an observable, maps the JSON data from Spring Data REST to ProductCategory array
      map(response => response._embedded.productCategory)
    );

  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on the keyword 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }


}

// unwrap the JSON from Spring Data REST _embedded entry 
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number, // size of the page
    // grand total of ALL elements in the database, return "count" for informational purpose
    totalElements: number,
    totalPages: number, // total pages available
    number: number // current page number 
  }
}

// interface is models the expected shape of the JSON response from the Spring Data REST backend
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}