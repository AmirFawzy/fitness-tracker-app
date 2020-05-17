import { Injectable } from '@angular/core';
import { MatSnackBar } from '../../../node_modules/@angular/material';
import { Subject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  lodingStateChanged = new Subject<boolean>();
  LoadingExercisesState = new Subject<boolean>();

  constructor(private snakBar: MatSnackBar) { }

  showSnackbar(message: string, action: string | null, duration: number | null) {
    this.snakBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'left'
    });
  }
}
