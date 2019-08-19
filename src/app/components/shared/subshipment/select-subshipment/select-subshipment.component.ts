import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-subshipment',
  templateUrl: './select-subshipment.component.html',
  styleUrls: ['./select-subshipment.component.css']
})
export class SelectSubshipmentComponent implements OnInit {
  @Input() subshipments: any[];
  constructor() { }

  ngOnInit() {
  }

}
