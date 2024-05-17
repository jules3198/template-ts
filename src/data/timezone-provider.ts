import { Timezone } from "../models/models";
import { TIMEZONES } from "./timezone-data";

export class TimezoneProvider {

  defaultTimezone: Timezone = { "timezone": "GMT+0", "offset": 0, "region": "Western European Time" };
  constructor() { }

  provide(number: number): Timezone {
    return number < 24 ? TIMEZONES[number] : this.defaultTimezone;
  }

  provideByTimezone(t: string): Timezone {
    const timezone = TIMEZONES.find((ft: Timezone) => ft.timezone === t);
    return timezone || this.defaultTimezone;
  }
}
