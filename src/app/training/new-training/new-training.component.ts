import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { Subscription, Observable } from '../../../../node_modules/rxjs';
import { Store } from '../../../../node_modules/@ngrx/store';

import { Exercise } from '../exercise.modal';
import { TrainingService } from '../training.service';
import { UiService } from '../../shared/ui.service';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() minutes = new EventEmitter<number>();
  @Output() seconds = new EventEmitter<number>();
  exercises$: Observable<Exercise[]>;
  // exercises: Exercise[];
  // subscription: Subscription;
  timeForm: FormGroup;
  invalid = false;
  selectedExercise: string;
  // exercisesSubscription: Subscription;
  isExercisesLoaded$: Observable<boolean>;
  // isExercisesLoaded = false;

  constructor(private trainingService: TrainingService, private uiService: UiService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.fetchExercises();
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.isExercisesLoaded$ = this.store.select(fromRoot.getIsLoading);

    // this.subscription = this.trainingService.exercisesChanged.subscribe(
    //   exercises => this.exercises = exercises
    // );
    // this.exercisesSubscription = this.uiService.LoadingExercisesState.subscribe((loadedState: boolean) => {
    //   this.isExercisesLoaded = loadedState;
    // });
    this.timeForm = new FormGroup({
      'minutes': new FormControl(null, [Validators.max(60), Validators.required, Validators.min(1)]),
      'seconds': new FormControl(null, [Validators.max(60), Validators.min(1)]),
    });
  }

  startTraining(exercise: string): void {
    if (this.timeForm.valid) {
      this.trainingService.startExercise(exercise);
      this.minutes.emit(this.timeForm.get('minutes').value);
      this.seconds.emit(this.timeForm.get('seconds').value);
    } else {
      this.invalid = true;
    }
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
    // if (this.exercisesSubscription) {
    //   this.exercisesSubscription.unsubscribe();
    // }
  }
}
