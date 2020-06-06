import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface LoadData {
    language: string;
    type: string;
}
@Injectable({ providedIn: 'root' })
export class LoadDataService {
    private subject = new Subject<any>();

    loadData(data: LoadData) {
        this.subject.next(data);
    }

    clearMessages() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
