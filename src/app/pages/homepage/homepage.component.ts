import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Square from 'src/app/models/square';
import { SquaresService } from 'src/app/services/squares.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  squares: Observable<Square[]> = null;
  showError: boolean = false;

  constructor(
    private readonly squaresService: SquaresService
  ) {
    this.squares = this.squaresService.squares$;
  }

  ngOnInit(): void {
  }

  updateSquareColor(id: string) {
    this.showError = false;
    this.squaresService.updateSquare(id)
      .catch(() => this.showError = true);
  }

  trackSquaresFn(index: number, square: Square) {
    return square.id;
  }

}
