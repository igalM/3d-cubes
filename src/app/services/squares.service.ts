import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import Square from '../models/square';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SquaresService {

  squaresCollection: AngularFirestoreCollection<Square> = null;
  squares$: Observable<Square[]> = null;

  constructor(
    private readonly firestore: AngularFirestore
  ) {

    this.squaresCollection = this.firestore.collection('squares');
    this.squares$ = this.squaresCollection.snapshotChanges()
      .pipe(
        map(data => {
          return data.map(p => {
            const square = p.payload.doc;
            const id = square.id;
            return { id, ...square.data() } as Square;
          });
        })
      );

  }

  async updateSquare(id: string): Promise<void> {
    const newColor = this.getRandomRgb();
    try {
      await this.squaresCollection
        .doc(id)
        .update({ color: newColor });
    } catch (err) {
      throw err;
    }
  }

  getRandomRgb(): string {
    const num = Math.round(0xffffff * Math.random());
    const r = num >> 16;
    const g = num >> 8 & 255;
    const b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

}
