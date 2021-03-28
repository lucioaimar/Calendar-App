import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilFunctionsService {

constructor() {}

  public static isSameDay(first: Date, second: Date): boolean {
    return first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();
  }
}
