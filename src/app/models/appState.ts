import Square from "./square";

export default interface AppState {
    lastUpdatedId: string;
    squares: Square[];
}