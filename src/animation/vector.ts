import { Vector2D } from "../models/models";
import { randomInRange } from "../utils/utils";

export class Vector {

    constructor() {}

    provideVector(minLimit: number, maxLimit: number): Vector2D {
        const x = randomInRange(minLimit, maxLimit);
        const y = randomInRange(minLimit, maxLimit);
        return {x,y}
    }
}