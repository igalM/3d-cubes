import { Component, OnInit } from '@angular/core';
import Square from 'src/app/models/square';
import { SquaresService } from 'src/app/services/squares.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  squares: Square[] = [];

  constructor(
    private readonly squaresService: SquaresService
  ) {

    this.squares = [
      { id: 0, color: 'rgb(161, 70, 128)' },
      { id: 1, color: 'rgb(248, 56, 201)' },
      { id: 2, color: 'rgb(198, 56, 247)' },
      { id: 3, color: 'rgb(28, 240, 33)' },
      { id: 4, color: 'rgb(215, 185, 72)' },
      { id: 5, color: 'rgb(248, 132, 117)' },
      { id: 6, color: 'rgb(233, 73, 10)' },
      { id: 7, color: 'rgb(91, 37, 204)' },
      { id: 8, color: 'rgb(186, 233, 138)' },
    ];

  }

  ngOnInit(): void {
  }

}
