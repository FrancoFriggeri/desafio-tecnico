import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Input() items: Producto[] = [];
  @ViewChild('childMenu', {static: true}) public childMenu: any;

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

}
