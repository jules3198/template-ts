import { TIMEZONES } from "../data/timezone-data";
import { TimezoneProvider } from "../data/timezone-provider";
import { Timezone } from "../models/models";
import { generateUniqueKey, htmlToElement } from "../utils/utils";
import { WatchListManager } from "./watch-list-manager";

export class DynamicWatchController {


    selectedItem: string;
    selectedItemTitle: string;

    selectedTimezoneElement: HTMLElement;
    notSelectedTimezoneElement: HTMLElement;
    constructor() { }

    init() {
        const template = `
        <div>

            <div id="timezone-message" class="show"> Please select a timezone before creation otherwise it won't work.</div>
            <div id="selected-timezone-message"> </div>
            <div id="action-container">
                <div id="addBtn-container">
                    <button id="addBtn">Add watch</button>
                </div>
                <div class="dropdown">
                    <button class="dropbtn" id="dropBtn">Choose timezone</button>
                    <div id="myDropdown" class="dropdown-content">
                        <input type="text" placeholder="Search.." id="textInput" onkeyup="filterFunction()"/>
                        <div id="timezone-items-container">
                            ${this.timezoneItems()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        const dynamicWatchCreatorContainer = document.getElementById('dynamic-watch-creator-container');
        const creator = htmlToElement(template);
        dynamicWatchCreatorContainer.appendChild(creator);



        this.selectedTimezoneElement = document.getElementById("selected-timezone-message") as HTMLElement;
        this.notSelectedTimezoneElement = document.getElementById("timezone-message") as HTMLElement;

        const textInput = document.getElementById('textInput');
        const dropbtn = document.getElementById('dropBtn');
        const addbtn = document.getElementById('addBtn');
        dropbtn.addEventListener('click', () => this.toggleDropdown());
        textInput.addEventListener('keyup', () => this.filter());
        addbtn.addEventListener('click', () => this.onAddWatch());
        this.timezoneItemsEventListener();
    }


    private toggleDropdown(): void {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    private toggleTimezoneMessages(): void {
        this.selectedTimezoneElement.innerText = `Selected timezone: ${this.selectedItemTitle}`;
        this.notSelectedTimezoneElement.classList.remove('show');
        this.notSelectedTimezoneElement.classList.add('hide');
        this.selectedTimezoneElement.classList.remove('hide');
        this.selectedTimezoneElement.classList.add('show');
    }

    private filter(): void {
        const input = document.getElementById("textInput") as HTMLInputElement;
        const filter = input.value.toUpperCase();
        const div = document.getElementById("myDropdown");
        const a = div.getElementsByTagName("a");
        for (let i = 0; i < a.length; i++) {
            const txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "";
            } else {
                a[i].style.display = "none";
            }
        }
    }

    private timezoneItems(): string {
        return TIMEZONES.map((timezone: Timezone) => `<a href="#" id="${timezone.timezone}">${timezone.timezone}: ${timezone.region}</a>`).join('');
    }

    private timezoneItemsEventListener(): void {
        const timezoneItemsContainer = document.getElementById("timezone-items-container");
        timezoneItemsContainer.querySelectorAll('a').forEach((element) => {
            element.addEventListener('click', (event) => {
                this.selectedItem = element.id;
                this.selectedItemTitle = element.innerText
                this.toggleDropdown();
                this.toggleTimezoneMessages();
            });
        });
    }

    onAddWatch(): void {
        const timezoneProvider = new TimezoneProvider();
        if (this.selectedItem) {
            const timezone = timezoneProvider.provideByTimezone(this.selectedItem);
            const watchListManager = new WatchListManager();
            const watchId = generateUniqueKey();
            watchListManager.addWatch(watchId, timezone)
            this.resetMessages();
        }
    }

    private resetMessages(): void {
        this.selectedItem = "";
        this.selectedItemTitle = "";
        this.notSelectedTimezoneElement.classList.remove('hide');
        this.notSelectedTimezoneElement.classList.add('show');
        this.selectedTimezoneElement.classList.remove('show');
        this.selectedTimezoneElement.classList.add('hide');
    }

}