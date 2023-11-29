import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // inject router
  constructor(private router: Router) { }

  ngOnInit() {
  }

  // define the method for search keyword 
  doSearch(value: string) {
    console.log(`value=${value}`);
    // route the data to our "search" route, which will be handled by the ProductListComponent
    this.router.navigateByUrl(`/search/${value}`);
  }
}
