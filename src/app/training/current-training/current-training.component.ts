import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { Store } from '../../../../node_modules/@ngrx/store';

import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';
import { Observable } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  @Input('minutes') workoutMinutes: number;
  @Input('seconds') workoutSeconds: number;
  minutes: number;
  seconds: number;
  totalUpdatedTime: number;
  totalOriginalTime: number;
  progress = 0;
  timer: any;
  secondsTimer: any;
  pause = false;
  exerciseName$: string;
  // exerciseName: string;

  constructor(private dialog: MatDialog, private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.minutes = this.workoutMinutes;
    this.seconds = this.workoutSeconds;
    this.progressCircle();
    this.timeCountdown();
    // this.exerciseName = this.trainingService.getSelectedExercise().name;
    this.store.select(fromTraining.getActiveExercises).subscribe(exercise => {
      if (exercise) {
        this.exerciseName$ = exercise.name;
      }
    });
  }

  timeCountdown() {
    this.secondsTimer = setInterval(() => {
      // if there's seconds been set start second countdown if not (null) set seconds to 0 (to start next if condition)
      if (this.seconds != null) {
        this.seconds = this.seconds - 1;
      } else {
        this.seconds = 0;
      }

      // if seconds = 0 and minutes grater than 0 clear interval if not clear interval
      // countdown minutes    // and if minutes === 0 set minutes to 0
      // set seconds again to 60 and start countdown again (start interval)
      if (this.seconds === 0 && this.minutes > 0) {
        clearInterval(this.secondsTimer);
        this.minutes = this.minutes - 1;
        if (this.minutes === 0) {
          this.minutes = 0;
        }
        this.seconds = 60;
        this.timeCountdown();
      } else if (this.seconds === 0 && this.minutes === 0) {
        clearInterval(this.secondsTimer);
      }
    }, 1000);
  }

  progressCircle() {
    this.timer = setInterval(() => {
      // to convert it from integr to decimal
      const convertOriginalSeconds = this.workoutSeconds / 60;
      // total minutes + total seconds
      this.totalOriginalTime = convertOriginalSeconds + this.workoutMinutes;
      // to convert seconds from integr to decimal
      const convertSeconds = this.seconds / 60;
      // updated minutes + converted secondes
      this.totalUpdatedTime = this.minutes + convertSeconds;
      // Real difference between total times not the milliseconds but real total time with dicemal (2.08 = 2 minutes and 8 seconds)
      const differenceBetweenTwoTotalTimes = Math.abs(this.totalOriginalTime - this.totalUpdatedTime);
      // convert difference between two times to milliseconds
      const differentTotalTimesToMilliseconds = differenceBetweenTwoTotalTimes * 60;
      // convert original total time to milliseconds
      const originalTotalTimeToMilliseconds = this.totalOriginalTime * 60;
      // to get the real difference total time between original one and updated one by suptract
      // original total time millisecond - updated total time milliseconds
      const differenceBetweenTwoTotalTimesMilliseconds = originalTotalTimeToMilliseconds - differentTotalTimesToMilliseconds;
      // to convert difference between two total times to dicemal number
      const convertTotalTimeMillisecondsToDecimal = differenceBetweenTwoTotalTimesMilliseconds / originalTotalTimeToMilliseconds;
      // get perecentage of the total time starting from 0 to 100 (here it reversed that why i'm using 100 -) in front
      const totalTimePerecentage = 100 - (convertTotalTimeMillisecondsToDecimal * 100);
      const fixedTotalTimePerecentage = +totalTimePerecentage.toFixed(2);

      this.progress = fixedTotalTimePerecentage;
      if (this.progress >= 100) {
        this.trainingService.completedExercise(this.workoutMinutes, this.workoutSeconds, this.progress);
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop(): void {
    clearInterval(this.timer);
    clearInterval(this.secondsTimer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        const minutesOnCancel = this.workoutMinutes - this.minutes;
        const secondsOnCancel = Math.abs(this.workoutSeconds - this.seconds);
        if (result) {
          this.trainingService.cancelExercise({ minutes: minutesOnCancel, seconds: secondsOnCancel }, this.progress);
        } else {
          this.progressCircle();
          this.timeCountdown();
        }
      }
    );
  }

  onPauseOrResume() {
    if (!this.pause) {
      this.pause = true;
      clearInterval(this.timer);
      clearInterval(this.secondsTimer);
    } else {
      this.pause = false;
      this.progressCircle();
      this.timeCountdown();
    }
  }
}

/*
example of how i calculate the progress bar and the countdown timer
--- if the time was set is 12 minutes and 20 seconds for example ... how i can calculate the timer countdown and
    convert that time to percentage to animate the progress bar?

  1- for the countdown i decress the number of the seconds every 1000ms by 1 that gonna countdown 1 second every second.
  2- set condition if seconds reach to 0 and the minutes grater than 0 so countdown the minutes by 1 and set seconds
      again to 60 seconds (which is the initial value of seconds) and start the interval again.

  //for progress bar:
  1- get the original total time with minutes and seconds in this example 12 minutes and for how to get the seconds by
      (20 (seconds here) / 60) = 0.333 then to get the total time 12 + 0.333 = 12.33
  2- get the updated total time (remember we conutingdown the seconds) so every seconds we got different amount of seconds
      to get it with the same way in (tip 1).
  3- subtract the original total time - the updated total time for example (12.33(original) - 4.30(updated)) = 8.03
  4- convert that result number (8.03) to milliseconds by (8.03(result) * 60) = 481.8
  5- get the original total time by milliseconds by (12.33(original total time) * 60) = 739.8
  6- subtract original total time by milliseconds - result number(tip 4) that gonna be (739.8(tip 5) - 481.8(tip 4)) = 258
  7- now divide that result with the original total time by milliseconds (258(tip 6) / 739.8(tip 5)) = 0.35
  8 then final thing is  0.35(ip 7) * 100 = number ... this situation here if i wanna the width starting from 100% and go down. (decressing)
  9- but if i wanna to make the width go up form 0 to 100 i should to reverse it like so 100 - (0.35(tip 7) * 100) = number
      here the width of the progress bar starting from 0% to 100% because of (100 - ...) i add it.
*/
