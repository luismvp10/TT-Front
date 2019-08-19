import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-section',
  templateUrl: './select-section.component.html',
  styleUrls: ['./select-section.component.css']
})
export class SelectSectionComponent implements OnInit {
@Input() sections: any[];
  constructor() { }

  ngOnInit() {
  }

}
