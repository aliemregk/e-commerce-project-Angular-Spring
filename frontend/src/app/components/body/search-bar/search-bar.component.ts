import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  static filterText: string = "";
  public classReference = SearchBarComponent;

  constructor() {
 
  
  }

  ngOnInit(): void {
    
  
  }

}
