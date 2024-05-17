import { TimeFormat, Timezone } from '../models/models';
import { htmlToElement, formatDateForDisplay, calcTime } from '../utils/utils';
import '../css/watch.css'

enum DisplayMode {
    Military = 'Military',
    Civil = 'Civil'
}

export class Watch {

    private currentTime: number;
    private countdownInterval: NodeJS.Timer;
    private WatchID: string;
    private modeStateIterator = 0 | 1 | 2 | 3;
    private displayMode: DisplayMode;
    private lightIsON = false;

    private parentElementId: string;
    private watchTimezone: Timezone;

    constructor(watchId: string, parentSelector: string, timezone: Timezone) {
        this.WatchID = watchId;
        this.modeStateIterator = 0;
        this.displayMode  = DisplayMode.Military;
        this.parentElementId = parentSelector;
        this.watchTimezone = timezone;
    }

    initWatch(): void {
        const template: string = `
            <div class="watch" id="watch-${this.WatchID}">
                <div class="watch-container" id="watch-container-${this.WatchID}">
                    <div class="watch-screen watch-screen-off" id="watch-screen-${this.WatchID}"></div>
                    <button title="mode" class="watch-btn mode-btn-${this.WatchID}" id="mode-btn"></button>
                    <button title="increase" class="watch-btn increase-btn-${this.WatchID}" id="increase-btn"></button>
                    <button title="light" class="watch-btn light-btn-${this.WatchID}" id="light-btn"></button>
                    <button title="reset" class="watch-btn reset-btn-${this.WatchID}" id="reset-btn"></button>
                    <button title="display" class="watch-btn display-btn-${this.WatchID}" id="display-btn"></button>
                </div>
            </div>
        `;

        const wathcContainer = document.getElementById(this.parentElementId);
        const currentWatch = htmlToElement(template);
        wathcContainer.appendChild(currentWatch);
        const watchTime: number = calcTime(this.watchTimezone.offset);
        this.startWatch(watchTime);

        this.buttonsHandler();
  
    }

    private startWatch(startTime: number): void {
        this.currentTime = startTime;
        this.displayCurrentTime(this.currentTime);
        this.countdownInterval = setInterval(() => {
            this.currentTime += 1000;
            this.displayCurrentTime(this.currentTime);
        }, 1000);
    }


    private buttonsHandler() {
        const modeBtn = document.querySelector(`button.mode-btn-${this.WatchID}`);
        const increaseBtn = document.querySelector(`button.increase-btn-${this.WatchID}`);
        const lightBtn = document.querySelector(`button.light-btn-${this.WatchID}`);
        const resetBtn = document.querySelector(`button.reset-btn-${this.WatchID}`);
        const displayBtn = document.querySelector(`button.display-btn-${this.WatchID}`);

        modeBtn.addEventListener('click', () => this.changeMode());
        increaseBtn.addEventListener('click', () => this.increase());
        lightBtn.addEventListener('click', () => this.switchLight());
        resetBtn.addEventListener('click', () => this.reset());
        displayBtn.addEventListener('click', () => this.changeDisplay());
    }

    private displayCurrentTime(currentTime: number): void {
        const formatTime: TimeFormat = formatDateForDisplay(currentTime);
        let htmlTime: string;
        if (this.displayMode === 'Military') {
            htmlTime = `
                <p>
                    <span class="hourMinute" id="hour-${this.WatchID}"> ${formatTime.hours} </span>
                    <span class="hourMinute">:</span>
                    <span class="hourMinute" id="minute-${this.WatchID}"> ${formatTime.minutes} </span>
                    <span class="second" id="second-${this.WatchID}"> ${formatTime.seconds} </span>
                </p>
            `;
        } else {
            let civilHour: number = parseInt(formatTime.hours, 10);
            const amOrPm = civilHour >= 12 ? 'PM' : 'AM';
            if (civilHour > 12) {
                civilHour -= 12;
            } else if (civilHour === 0) {
                civilHour = 12;
            }
            htmlTime = `
            <p>
                <span class="hourMinute" id="hour-${this.WatchID}"> ${civilHour} </span>
                <span class="hourMinute">:</span>
                <span class="hourMinute" id="minute-${this.WatchID}"> ${formatTime.minutes} </span>
                <span class="hourMinute" id="amorpm-${this.WatchID}"> ${amOrPm} </span>
                <span class="second" id="second-${this.WatchID}"> ${formatTime.seconds} </span>
            </p>
            `;
        }

        document.getElementById(`watch-screen-${this.WatchID}`).innerHTML = htmlTime;
    }

    private destroyWatch(): void {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
    }

    private changeMode() {
        this.modeStateIterator++;
        let hourElement = document.getElementById(`hour-${this.WatchID}`);
        let minuteElement = document.getElementById(`minute-${this.WatchID}`);
        switch (this.modeStateIterator) {
            case 1:
                this.destroyWatch();
                hourElement.classList.add("blinking");
                break;
            case 2:
                this.destroyWatch();
                hourElement.classList.remove("blinking");
                minuteElement.classList.add("blinking");
                break;
            case 3:
                hourElement.classList.remove("blinking");
                minuteElement.classList.remove("blinking");
                this.startWatch(this.currentTime);
                this.modeStateIterator = 0;
                break;
        }
    }

    private increase() {
        let currentDate: Date = new Date(this.currentTime);
        // Set seconds to zero
        currentDate.setSeconds(0);
        switch (this.modeStateIterator) {

            case 1:
                // Increase time by 1 hour
                currentDate.setHours(currentDate.getHours() + 1);
                this.currentTime = currentDate.getTime();
                this.displayCurrentTime(this.currentTime);
                break;
            case 2:
                // Increase time by 1 hour
                currentDate.setMinutes(currentDate.getMinutes() + 1);
                this.currentTime = currentDate.getTime();
                this.displayCurrentTime(this.currentTime);
                break;
        }
    }

    private switchLight() {
        this.lightIsON = !this.lightIsON
        const screen = document.getElementById(`watch-screen-${this.WatchID}`);
        if (this.lightIsON) {
            screen.classList.remove('watch-screen-off');
            screen.classList.add('watch-screen-on');
        } else {
            screen.classList.remove('watch-screen-on');
            screen.classList.add('watch-screen-off');
        }
    }

    private reset() {
        const watchTime: number = calcTime(this.watchTimezone.offset);
        this.destroyWatch();
        this.startWatch(watchTime);
    }

    private changeDisplay(): void {
        this.displayMode = this.displayMode === DisplayMode.Military ? DisplayMode.Civil : DisplayMode.Military;
        this.displayCurrentTime(this.currentTime);
    }
}