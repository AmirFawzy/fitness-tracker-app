import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject, Subscription } from '../../../node_modules/rxjs';
import { map, take } from '../../../node_modules/rxjs/operators';
import { Store } from '../../../node_modules/@ngrx/store';

import { Exercise } from './exercise.modal';
import { UiService } from '../shared/ui.service';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChaged = new Subject<Exercise[]>();
  userId: string;
  private availableExercises: Exercise[] = [];
  private selectedExercise: Exercise;
  private afSub: Subscription[] = [];
  exerciseBellRing = new Subject<boolean>();

  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private afAuth: AngularFireAuth,
    private store: Store<fromTraining.State>
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.LoadingExercisesState.next(false);
    this.afSub.push(this.db.collection('availableExercises').snapshotChanges().pipe(map((docArray: any) => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          name: doc.payload.doc.data().name,
          duration: doc.payload.doc.data().duration,
          calories: doc.payload.doc.data().calories
        };
      });
    })).subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new UI.StopLoading());
      this.store.dispatch(new Training.SetAvailableTraining(exercises));
      // this.availableExercises = exercises;
      // this.exercisesChanged.next([...this.availableExercises]);
      // this.uiService.LoadingExercisesState.next(true);
    }, error => {
      this.uiService.showSnackbar('Failed to fetch exercises, please try again later', 'X', 6000);
      this.store.dispatch(new UI.StopLoading());
      this.store.dispatch(new Training.StopTraining());
      // this.uiService.LoadingExercisesState.next(true);
      // this.exercisesChanged.next(null);
    }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
    // this.selectedExercise = this.availableExercises.find(ex => ex.id === selectedId);
    // this.exerciseChanged.next({ ...this.selectedExercise });
  }

  completedExercise(minutes: number, seconds: number | string, progress: number) {
    this.store.select(fromTraining.getActiveExercises).pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase({
        ...exercise,
        // ...this.selectedExercise,
        duration: { minutes: minutes, seconds: +seconds },
        calories: +((progress / 100).toFixed()),
        date: new Date(),
        state: 'completed'
      });
      this.store.dispatch(new Training.StopTraining());
    });
    this.exerciseBellRing.next(true);
    // this.selectedExercise = null;
    // this.exerciseChanged.next(null);
  }

  cancelExercise(updatedDurationOnCancel: { minutes: number, seconds: number | string }, progress: number) {
    this.store.select(fromTraining.getActiveExercises).pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase({
        ...exercise,
        // ...this.selectedExercise,
        duration: updatedDurationOnCancel,
        calories: +((progress / 100).toFixed()),
        date: new Date(),
        state: 'cancelled'
      });
      this.store.dispatch(new Training.StopTraining());
    });
    // this.selectedExercise = null;
    // this.exerciseChanged.next(null);
  }

  // getSelectedExercise(): Exercise {
  //   return { ...this.selectedExercise };
  // }

  fetchCancelledOrCompletedExercise() {
    this.afSub.push(this.db.collection(`finishedExercises/${this.userId}/exercises`).valueChanges().subscribe(
      (exercises: Exercise[]) => this.store.dispatch(new Training.SetFinishedTraining(exercises))
    ));
  }

  cancelSubscription() {
    this.afSub.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    // this.db.collection(`finishedExercises/${this.userId}`).add(exercise);
    this.db.collection('finishedExercises').doc(`${this.userId}`).collection('exercises').add(exercise);
  }
}
