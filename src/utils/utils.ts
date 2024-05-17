import { TimeFormat } from "../models/models";

export function htmlToElement(html: string): Node {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

export function formatDateForDisplay(currentDate: number): TimeFormat {
    const date: Date = new Date(currentDate);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    return { hours, minutes, seconds }
}

export function generateUniqueKey(): string {
    const timestamp = Date.now().toString(16);
    const randomString = Math.random().toString(36).substr(2, 10);
    return timestamp + randomString;
}

// return corresponding time as timestamp of specific timezone offset
export function  calcTime(offset: number): number {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const correspondingDate = new Date(utc + (3600000 * offset));
    return correspondingDate.getTime()
}

// Generate a random number between -12 and 12
export function generateRandomNumber(): number {
    return Math.floor(Math.random() * 24);
}

export function randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function matrixArrayToCssMatrix(matrix: number[][]): string {
    // Extract individual elements from the matrix
    const a = matrix[0][0];
    const b = matrix[0][1];
    const c = matrix[1][0];
    const d = matrix[1][1];
    const tx = matrix[0][2];
    const ty = matrix[1][2];
    
    // Construct the CSS matrix string
    return `matrix(${a}, ${b}, ${c}, ${d}, ${tx}, ${ty})`;
}

function padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
}

