import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Square from 'src/app/models/square';

@Component({
  selector: 'square-item',
  templateUrl: './squares-item.component.html',
  styleUrls: ['./squares-item.component.scss']
})
export class SquaresItemComponent {

  @Input() square: Square = null;
  @Output() changeColorEmitter: EventEmitter<string> = new EventEmitter();

  changeColor() {
    this.changeColorEmitter.emit(this.square.id);
  }

}
