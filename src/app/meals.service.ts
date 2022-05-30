import { Injectable } from '@angular/core';
import { Meal, MealRow } from './types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  constructor(private http: HttpClient) {}

  formatMealDates(rowMeal: MealRow): Meal {
    return {
      ...rowMeal,
      plannedDate: new Date(rowMeal.plannedDate),
    };
  }

  getMeals(): Observable<Meal[]> {
    return this.http
      .get<MealRow[]>('/api/meals')
      .pipe(
        map((rowMeals) =>
          rowMeals.map((rowMeal) => this.formatMealDates(rowMeal))
        )
      );
  }

  deleteMeal(id: string): Observable<Meal[]> {
    return this.http
      .delete<MealRow[]>(`/api/meals/${id}`)
      .pipe(
        map((rowMeals) =>
          rowMeals.map((rowMeal) => this.formatMealDates(rowMeal))
        )
      );
  }

  addMeal(date: string, recipeId: string): Observable<Meal[]> {
    return this.http
      .post<MealRow[]>('/api/meals/', { date, recipeId })
      .pipe(
        map((rowMeals) =>
          rowMeals.map((rowMeal) => this.formatMealDates(rowMeal))
        )
      );
  }
}
