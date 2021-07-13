export interface IDragMetadata {
    startPosition: IPoint;
    prevShift: IPoint;
}

interface IPoint {
    x: number;
    y: number;
}
