import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgsgEventsService {
  public dropped$ = new Subject();
}
