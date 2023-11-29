import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

// define a class as an angular component: display a list of products 
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})

// class declaration 
export class ProductListComponent implements OnInit {


  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = "";

  // Constructor & Dependency Injection: import  productservice dependency
  constructor(private productService: ProductService,
    // inject ActivatedRoute -> the current active route that loaded the component, 
    //useful for accessing route parameters
    private route: ActivatedRoute,
    private cartService: CartService) {

  }

  // similar to @PostCOnstruct 
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    // the keyword came from the path we set and SearchComponent (search/:keyword i.e. /search/${value})
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if we have a different keyword than previous
    // then set thePageNumber to 1

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber - 1, this.thePageSize,
      theKeyword).subscribe(this.processResult());
  }

  // method: fetch a lists of products using the ProductService 
  handleListProducts() {
    // check if "id" parameter is available
    // route: use the activated route, snapshot: state of route at this given moment in time
    // paramMap: map of all the route parameters
    // id: read the id parameter 
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      // ! is a non-null assertion operator -> tells compiler that the object is not null
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1,
      // pagination component: pages are 1 based VS Spring Data REST: pages are 0 based 
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());
  }
  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize; // set page size based on parameter value 
    this.thePageNumber = 1; // reset the pageNumber to 1 as we changed the size
    this.listProducts();
  }

  processResult() {
    return (data: any) => {
      // left of assignment: properties defined in this class
      // right: data from Spring Data REST JSON 
      this.products = data._embedded.products;
      // pagination component: pages are 1 based VS Spring Data REST: pages are 0 based 
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  addToCart(theProduct: Product) {
    
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    // TODO ... do the real work
    const theCartItem = new CartItem(theProduct.id!, theProduct.name!, theProduct.imageUrl!, theProduct.unitPrice!);

    this.cartService.addToCart(theCartItem);
  }
}



