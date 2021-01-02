import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import Square from '../models/square';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import AppState from '../models/appState';

@Injectable({
  providedIn: 'root'
})
export class SquaresService {

  stateCollection: AngularFirestoreCollection<AppState> = null;
  squares$: Observable<Square[]> = null;
  firestoreCollectionId: string = '2Hz6IinpIvtnu8Gtcb9s';
  lastUpdatedId: string = '';

  constructor(
    private readonly firestore: AngularFirestore
  ) {
    this.stateCollection = this.firestore.collection('squares');
    this.squares$ = this.stateCollection.valueChanges()
      .pipe(
        map(data => {
          this.lastUpdatedId = data[0].lastUpdatedId;
          return data[0].squares;
        })
      );
  }

  async updateSquare(id: string): Promise<void> {
    const newColor = this.getRandomRgb();
    try {
      await this.stateCollection
        .doc(this.firestoreCollectionId)
        .update({ ['squares.' + id]: newColor, lastUpdatedId: id });
    } catch (err) {
      console.log(err);
    }
  }

  getRandomRgb(): number[] {
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();
    return [r, g, b];
  }

}
