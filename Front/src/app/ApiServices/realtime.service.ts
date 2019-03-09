import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AppEnumerations } from "../enumerations/appEnumerations";
import { LoginService } from './login.service'
import { GasUserHub } from "../models/gasUserHub";
import { UserAutentication } from '../models/UserAutentication';
import { AppSettings } from '../app.settings';
import { CommunicationService } from './CommunicationService';
import { GasUserHubBuilder } from 'app/builders/GasHubUser.model.builder';


export class SignalrWindow extends Window {
	$: any;
}

@Injectable()
export class RealtimeService {
	private users: Array<GasUserHub>
	private connectionStateSubject = new Subject<AppEnumerations.RealTimeConnectionState>();
	public connectionState$: Observable<AppEnumerations.RealTimeConnectionState> = this.connectionStateSubject.asObservable();

	private hubConnection: any;
	private hubProxy: any;

	public newState: AppEnumerations.RealTimeConnectionState

	constructor(
		@Inject(SignalrWindow) private window: SignalrWindow,
		private CommunicationService: CommunicationService,
		private _LoginService: LoginService
	) {

		if (this.window.$ === undefined || this.window.$.hubConnection === undefined) {
			throw new Error(`The variable '$' or the .hubConnection()
                function are not defined...please check the SignalR scripts have been loaded properly`);
		}
		//	AppSettings.Global().SIGNALR "http://localhost/Dataifx.AuctionDesc.Services/signalr"

		this.hubConnection = this.window.$.hubConnection(AppSettings.Global().EndPoints.SIGNALR);

		this.hubProxy = this.hubConnection.createHubProxy('GasHub');


		this.connectionstate();
		this.SubscribeProxyMethods();
	}

	private SubscribeProxyMethods() {	
		this.hubProxy.on('onNotifyAditionalOfferAcepted', (e: any) => {
		//	this.CommunicationService.onNotifyAditionalOfferAcepted(e)
		});
	}

	public connectionstate(): void {
		this.hubConnection.stateChanged((state: any) => {

			this.newState = AppEnumerations.RealTimeConnectionState.Connecting;

			switch (state.newState) {
				case this.window.$.signalR.connectionState.connecting:
					this.newState = AppEnumerations.RealTimeConnectionState.Connecting;
					break;
				case this.window.$.signalR.connectionState.connected:
					this.newState = AppEnumerations.RealTimeConnectionState.Connected;
					break;
				case this.window.$.signalR.connectionState.reconnecting:
					this.newState = AppEnumerations.RealTimeConnectionState.Reconnecting;
					break;
				case this.window.$.signalR.connectionState.disconnected:
					this.newState = AppEnumerations.RealTimeConnectionState.Disconnected;
					break;
			}
			this.connectionStateSubject.next(this.newState);
			if (this.newState != AppEnumerations.RealTimeConnectionState.Disconnected) { this.CommunicationService.onRealtimeConect(true) }
			else { this.CommunicationService.onRealtimeConect(false) }

		});

		this.connectionStateSubject.next(this.newState);
		if (this.newState != AppEnumerations.RealTimeConnectionState.Disconnected) { this.CommunicationService.onRealtimeConect(true) }
		else { this.CommunicationService.onRealtimeConect(false) }
	}
	/// Events to Server
	public start(User: UserAutentication): void {
		this.hubConnection.start()
			.done((x) => {
				var Profile = User.Roll
				const userRealtime = new GasUserHubBuilder()
					.BuildWithGasProfile(Profile)
					.BuildWithIdSegas(User.IdSegas)
					.BuildWithUserName(User.username)
					.BuildWithName(User.username + " " + User.Empresa)
					.Build()
				this.Connect(userRealtime);
			})
			.fail(error => {
			});
	}



	public NotificarCambioEnSubasta(): void {
		this.hubProxy.invoke('NotificarCambioEnSubasta')
			.done(x => { })
			.fail((e) => {
				console.log(e);
			})
	}
	public Connect(user) {
		this.hubProxy.invoke('Connect', user)
			.done(chat => {
				console.log("Usuario conectado correctamente")
			})
			.fail((e) => {
			})
	}

	public SendPrivateMessage(msg): void {
		this.hubProxy.invoke('SendPrivateMessage', msg)
			.done(x => { })
			.fail((e) => {
				console.log(e);
			})
	}

	public SendBroadcastMessage(message): void {
		this.hubProxy.invoke('SendBroadcastMessage', message)
			.done((e) => console.log('Respondio el metodo broadcast', e))
			.fail((error) => {
				console.log(error)
			})
	}

	public NotifySellerDemand(e: number): void {
		var UsuarioLog: any = this._LoginService.getLoginSession()
		this.hubProxy.invoke('NotifySellerDemand', e, UsuarioLog)
			.done((e) => console.log('Respondio el metodo NotifySellerDemand', e))
			.fail((error) => {
				console.log(error)
			})
	}

	public NotifyPurchaserRoundOffer() {
		this.hubProxy.invoke('NotifyPurchaserRoundOffer')
			.done((e) => console.log('Respondio el metodo NotifyPurchaserRoundOffer', e))
			.fail((error) => {
				console.log(error)
			})
	}


	public NotifyPurchaserOffers(e: number): void {
		var UsuarioLog: any = this._LoginService.getLoginSession()
		this.hubProxy.invoke('NotifyPurchaserOffers', e, UsuarioLog)
			.done((e) => console.log('Respondio el metodo onNotifyPurchaserOffers', e))
			.fail((error) => {
				console.log(error)
			})
	}


	public NotifyAditionalOfferAcepted() {
		var TypeAuction: number = Number(sessionStorage.getItem("Producto"))
		this.hubProxy.invoke('NotifyAditionalOfferAcepted')
			.done((e) => { console.log('Respondio el metodo NotifyAditionalOfferAcepted', e) })
			.fail((error) => {
				console.log(error)
			})
	}

	public NotifyIncriptionUpdate() {
		var TypeAuction: number = Number(sessionStorage.getItem("Producto"))
		this.hubProxy.invoke('NotifyIncriptionUpdate', TypeAuction, this._LoginService.getLoginSession())
			.done((e) => { console.log('Respondio el metodo NotifyIncriptionUpdate', e) })
			.fail((error) => {
				console.log(error)
			})
	}

	public NotifyAprobateAuctionIngress(IdSubasta: number): boolean {
		var Response: boolean = false
		var UsuarioLog: any = this._LoginService.getLoginSession()
		this.hubProxy.invoke('NotifyAprobateAuctionIngress', IdSubasta, UsuarioLog)
			.done((e: boolean) => {
				console.log('Respondio el metodo NotifyAprobateAuctionIngress', e)
				Response = e;
			}
			)
			.fail((error) => {
				console.log(error)
			})
		return Response;
	}

	public MegaphonePlayers(Mensaje: string, de: string, para: string): boolean {
		var Response: boolean = false
		this.hubProxy.invoke('MegaphonePlayers', Mensaje, de, para)
			.done((e: boolean) => {
				Response = e;
				this.CommunicationService.onMessageSend(e)
				console.log('Respondio el metodo MegaphonePlayers', e);
			})
			.fail((error) => {
				console.log(error)
			})
		return Response;
	}
	public NotifySuspendAuction(): boolean {
		var Response: boolean = false
		this.hubProxy.invoke('NotifySuspendAuction')
			.done((e: boolean) => {
				Response = e;
				console.log('Respondio el metodo NotifySuspendAuction', e);
			})
			.fail((error) => {
				console.log(error)
			})
		return Response;
	}

	public NotifyClosingAuction(): boolean {
		var Response: boolean = false
		this.hubProxy.invoke('NotifyClosingAuction')
			.done((e: boolean) => {
				Response = e;
				console.log('Respondio el metodo NotifyClosingAuction', e);
			})
			.fail((error) => {
				console.log(error)
			})
		return Response;
	}


	public NotifyIncreaseSellerDemand(x: any): boolean {
		var UsuarioLog: any = this._LoginService.getLoginSession()
		x.User = UsuarioLog
		var Response: boolean = false
		this.hubProxy.invoke('NotifyIncreaseSellerDemand', x)
			.done((e: boolean) => {
				Response = e;
				console.log('Respondio el metodo NotifyIncreaseSellerDemand', e);
			})
			.fail((error) => {
				console.log(error)
			})
		return Response;
	}

	///
	public GetConectedUsers(userName: string): Array<GasUserHub> {
		this.users = new Array<GasUserHub>()
		this.hubProxy.invoke('GetConectedUsers', userName)
			.done((e: Array<GasUserHub>) => {
				e.forEach(element => {
					this.users.push(new GasUserHubBuilder().BuilderFromObject(element).Build())
				});
				return this.users
			})
			.fail((e) => {
				this.users = e
				return this.users
			})
		return this.users
	}


}
