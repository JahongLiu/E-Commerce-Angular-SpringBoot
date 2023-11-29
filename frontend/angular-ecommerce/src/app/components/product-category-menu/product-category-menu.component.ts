import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[] = []; // define property 
  
  // inject service in constructor 
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.listProductCategories(); // call our services
  }

  listProductCategories() {
    // invoke the service 
    this.productService.getProductCategories().subscribe(
      data => {
        // log data returned from the services 
        console.log('Product Categories=' + JSON.stringify(data));
        // assign data to our property 
        this.productCategories = data;
      }
    );
  }

}
