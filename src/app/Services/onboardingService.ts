import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnBoardingService {
    private termsAcceptedSource = new BehaviorSubject<boolean>(false);
    termsAccepted$ = this.termsAcceptedSource.asObservable();
  
    setTermsAccepted(accepted: boolean) {
      this.termsAcceptedSource.next(accepted);
    }

    
}
