import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from '../../../node_modules/rxjs';
import { Store } from '../../../node_modules/@ngrx/store';

import { TrainingService } from './training.service';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining$: Observable<boolean>;
  // ongoingTraining = false;
  workoutMinutes: number;
  workoutSeconds: number;
  // subscription: Subscription;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsExercise);
    // this.subscription = this.trainingService.exerciseChanged.subscribe(
    //   exercise => exercise ? this.ongoingTraining = true : this.ongoingTraining = false
    // );
  }

  ngOnDestroy() {
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
  }
}
