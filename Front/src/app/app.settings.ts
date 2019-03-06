

import { AppSettingsBuilder } from './Builders/AppSettings.Builder'



export class AppSettings {
	constructor() { }

	public static Global(): any {

		var JsonParameters = JSON.parse(sessionStorage.getItem("Global"));
		var parameters = new AppSettingsBuilder().BuildGlobalSettingsFromObject(JsonParameters);
		return parameters
	}
}
