import { TimezoneProvider } from "../data/timezone-provider";
import { Timezone } from "../models/models";
import { generateRandomNumber, generateUniqueKey } from "../utils/utils";
import { WatchListManager } from "./watch-list-manager";


export class WatchController {

    constructor() { }


    generateWatchs(limit: number) {

        const timezoneProvider = new TimezoneProvider();
        const watchControllerContainer = document.getElementById('watch-list-container');
        const watchListManager = new WatchListManager();
        if (watchControllerContainer) {
            for (let i = 0; i < limit; i ++) {
                const watchId = generateUniqueKey();
                const randomTimezone: Timezone = timezoneProvider.provide(generateRandomNumber());
                watchListManager.addWatch(watchId, randomTimezone)
            }
        }       
    }

}