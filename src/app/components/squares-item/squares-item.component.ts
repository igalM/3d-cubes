import { Component, Input, OnInit } from '@angular/core';
import Square from 'src/app/models/square';
import { SquaresService } from 'src/app/services/squares.service';

@Component({
  selector: 'square-item',
  templateUrl: './squares-item.component.html',
  styleUrls: ['./squares-item.component.scss']
})
export class SquaresItemComponent implements OnInit {

  @Input() square: Square = null;

  constructor(
    private readonly squaresService: SquaresService
  ) { }

  ngOnInit(): void {
  }

  changeColor() {
    this.square.color = this.squaresService.getRandomRgb();
  }

}
