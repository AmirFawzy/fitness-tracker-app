import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from '../../node_modules/rxjs';

import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  bellRing = false;

  constructor(private authService: AuthService, private trainingService: TrainingService) { }

  ngOnInit() {
    this.authService.initAuthListener();
    this.subscription = this.trainingService.exerciseBellRing.subscribe((state: boolean) => {
      if (state) {
        this.playAudio();
      }
    });
  }

  playAudio() {
    const audio = new Audio('../../../assets/audio/exercise-bell.mp3');
    audio.load();
    audio.play();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
