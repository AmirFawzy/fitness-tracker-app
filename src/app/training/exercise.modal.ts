export interface Exercise {
  id: string;
  name: string;
  duration: { minutes: number, seconds: number | string };
  calories: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}
