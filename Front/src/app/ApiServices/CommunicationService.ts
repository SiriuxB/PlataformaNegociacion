import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CommunicationService {
	onMessageSend(e: boolean): any {
	}
	onRealtimeConect(arg0: boolean): any {
console.log("conected",arg0)	}
    
	//observable to change components according instrument selected into market
	private sub_changeSizeWindow = new Subject<string>();
	public obs_changeSizeWindow: Observable<string> = this.sub_changeSizeWindow.asObservable()

	public changeSizeWindow(instrument?: string) {
		this.sub_changeSizeWindow.next(instrument)
	}

}
