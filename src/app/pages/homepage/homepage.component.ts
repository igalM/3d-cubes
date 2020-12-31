import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import Square from 'src/app/models/square';
import { SquaresService } from 'src/app/services/squares.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnDestroy {

  squares: Observable<Square[]> = null;
  showError: boolean = false;

  throttleTime: number = 500;
  subscription: Subscription = null;
  clicks: Subject<string> = new Subject();

  constructor(
    private readonly squaresService: SquaresService
  ) {
    this.squares = this.squaresService.squares$;

    this.subscription = this.clicks.pipe(
      throttleTime(this.throttleTime))
      .subscribe((id) => {
        this.showError = false;
        this.squaresService.updateSquare(id)
          .catch(() => this.showError = true);
      });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateSquareColor(id: string) {
    this.clicks.next(id);
  }

  trackSquaresFn(index: number, square: Square) {
    return square.id;
  }

}
