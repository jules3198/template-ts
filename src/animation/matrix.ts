import { Vector2D } from "../models/models";
import { transform } from "../utils/matrix";

export class Matrix {

    constructor() { }

    provideMatrix(): number[][] {
        return [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
    }


    translation(matrix: number[][], vector: Vector2D): number[][] {
        return transform(matrix, vector)
    }

    incrementMatrix(matrix: number[][], incrementValue: number): number[][] {
        // Check if the dimensions of the matrix are valid
        if (matrix.length !== 3 || matrix[0].length !== 3) {
            throw new Error("Invalid dimensions for matrix");
        }
    
        // Create a new matrix with incremented values
        const newMatrix: number[][] = matrix.map(row => row.map(value => value * incrementValue));
    
        return newMatrix;
    }
    

    rotateAroundPoint(angle: number) {
        //const rotationAngle = Math.PI / 4;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return [
            [cos, -sin, 0],
            [sin, cos, 0],
            [0, 0, 1]
        ];
    }

    // Create a scaling matrix
    scaling(matrix: number[][], vector: Vector2D): number[][] {
        return [
            [matrix[0][0] * vector.x, matrix[0][1], matrix[0][2]],
            [matrix[1][0], matrix[1][1] * vector.y, matrix[1][2]],
            [matrix[2][0], matrix[2][1], matrix[2][2]]
        ];
    }
}