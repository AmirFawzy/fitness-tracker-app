import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '../../../../node_modules/@angular/material';
import { Subscription } from '../../../../node_modules/rxjs';
import { Store } from '../../../../node_modules/@ngrx/store';

import { Exercise } from '../exercise.modal';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  // private finishedExercisesSubscription: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.store.select(fromTraining.getFinishedExercises).subscribe(
      (exercises: Exercise[]) => this.dataSource.data = exercises
    );
    // this.finishedExercisesSubscription = this.trainingService.finishedExercisesChaged.subscribe(
    //   (exercises: Exercise[]) => this.dataSource.data = exercises
    // );
    this.trainingService.fetchCancelledOrCompletedExercise();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onFilter(filterVal: string) {
    this.dataSource.filter = filterVal.trim().toLowerCase();
  }

  ngOnDestroy() {
    // if (this.finishedExercisesSubscription) {
    //   this.finishedExercisesSubscription.unsubscribe();
    // }
  }
}
