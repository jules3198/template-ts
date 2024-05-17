import { Vector2D } from "../models/models";

// Get the inverse of this matrix
export function inverse(matrix: number[][]): number[][] | null {
    // check if the matrix is 3x3
    if (matrix.length !== 3 || matrix[0].length !== 3) {
        return null;
    }

    // Destructuring the matrix
    const [[a, b, c], [d, e, f], [g, h, i]] = matrix;

    // Calculate the determinant
    const determinant = a * e * i + b * f * g + c * d * h - c * e * g - a * f * h - b * d * i;

    // Check if the determinant is zero (non-invertible matrix)
    if (determinant === 0) {
        return null;
    }

    // Calculate the inverse of the matrix
    const inverse: number[][] = [
        [(e * i - f * h) / determinant, (c * h - b * i) / determinant, (b * f - c * e) / determinant],
        [(f * g - d * i) / determinant, (a * i - c * g) / determinant, (c * d - a * f) / determinant],
        [(d * h - e * g) / determinant, (g * b - a * h) / determinant, (a * e - b * d) / determinant]
    ];

    return inverse;
}

// Multiply  matrix by another matrix
export function multiply(matrixA: number[][], matrixB: number[][]): number[][] | null {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const rowsB = matrixB.length;
    const colsB = matrixB[0].length;

    // Check if the dimensions are valid for multiplication
    if (colsA !== rowsB) {
        return null;
    }

    const result: number[][] = [];
    for (let i = 0; i < rowsA; i++) {
        result[i] = [];
        for (let j = 0; j < colsB; j++) {
            result[i][j] = 0;
            for (let k = 0; k < colsA; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }

    return result;
}

export function transform(matrix: number[][], vector: Vector2D): number[][] {
    // Check if the dimensions of the matrix and vector are valid
    if (matrix.length !== 3 || matrix[0].length !== 3) {
        throw new Error("Invalid dimensions for matrix");
    }

    // Perform the matrix-vector multiplication
    return [
        [matrix[0][0] * vector.x, matrix[0][1] * vector.y, matrix[0][2]],
        [matrix[1][0] * vector.x, matrix[1][1] * vector.y, matrix[1][2]],
        [matrix[2][0], matrix[2][1], matrix[2][2]]
    ];
}