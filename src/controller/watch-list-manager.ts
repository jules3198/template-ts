import { Watch } from "../Watch/watch-class";
import { Timezone } from "../models/models";
import { htmlToElement } from "../utils/utils";

export class WatchListManager {

    private watchListContainer: Node;
    constructor() {
        this.watchListContainer = document.getElementById('watch-list-container');
    }

    addWatch(watchId: string, timezone: Timezone) {
        const watchRowElement = htmlToElement(this.watchContainerTemplate(watchId, timezone));
        this.watchListContainer.appendChild(watchRowElement);
        if (document.getElementById(`watch-row-${watchId}`)) {
            const watch = new Watch(watchId, `watch-row-${watchId}`, timezone);
            watch.initWatch();
        }
    }

    addIndependantWatch(watchId: string, timezone: Timezone,containerId: string) {
        const watchRowElement = htmlToElement(this.watchContainerTemplate(watchId, timezone));
        const watchContainer = document.getElementById(containerId);
        watchContainer.appendChild(watchRowElement);
        if (document.getElementById(`watch-row-${watchId}`)) {
            const watch = new Watch(watchId, `watch-row-${watchId}`, timezone);
            watch.initWatch();
        }
    }

    private watchContainerTemplate(watchId: string, timezone: Timezone): string {
        return `
            <div id=watch-parent-container-${watchId}" class="watch-parent-container">
                <h4>${timezone.timezone}: ${timezone.region}</h4>
                <div id="watch-row-${watchId}"></div>
            </div>
        `;
    }

}