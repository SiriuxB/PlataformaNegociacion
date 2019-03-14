import { AppSettings } from '../models/AppSettings.model'



export class AppSettingsBuilder {


	public BuildGlobalSettingsFromObject(data: any): any {

		let globalConfig = AppSettings.Global;

		if (!data.API) { console.log("Parametro EndPoints.API no cargado ") }
		globalConfig.API = data.API;

		if (!data.SIGNALR) { console.log("Parametro EndPoints.SIGNALR no cargado ") }
		globalConfig.SIGNALR = data.SIGNALR;

		if (!data.TipoAplicacion) { console.log("Parametro .TipoAplicacion no cargado ") }
		globalConfig.TipoAplicacion = data.TipoAplicacion;

		if (!data.API_ImageContent) { console.log("Parametro API_ImageContent no cargado ") }
		globalConfig.API_ImageContent = data.API_ImageContent;

		if (!data.API_ImageContent) { console.log("Parametro LayoutConfig no cargado ") }
		globalConfig.LayoutConfig = data.LayoutConfig;
		

		return globalConfig;
	}

}
