
import { AppSettingsBuilder } from '../Builders/AppSettings.Builder'
import { StartupService } from '../ApiServices/startup.service'



export class AppSettings {
	constructor() { }

	public static Global(): any {

		var JsonParameters = JSON.parse(sessionStorage.getItem("Global"))[0];
		var parameters = new AppSettingsBuilder().BuildGlobalSettingsFromObject(JsonParameters);
		return parameters
	}

}