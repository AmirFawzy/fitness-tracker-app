import { Action } from '../../../node_modules/@ngrx/store';

import { Exercise } from './exercise.modal';

export const SET_AVAILABLE_TRAINING = '[Training] available exercises';
export const SET_FINISHED_TRAINING = '[Training] finished exercises';
export const START_TRAINING = '[Training] start exercise';
export const STOP_TRAINING = '[Training] stop exercise';

export class SetAvailableTraining implements Action {
  readonly type = SET_AVAILABLE_TRAINING;

  constructor(public payload: Exercise[]) { }
}

export class SetFinishedTraining implements Action {
  readonly type = SET_FINISHED_TRAINING;

  constructor(public payload: Exercise[]) { }
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: string) { }
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions = SetAvailableTraining | SetFinishedTraining | StartTraining | StopTraining;
