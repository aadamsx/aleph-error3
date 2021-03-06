export declare type State = Record<string | number | symbol, unknown>;
export declare type PartialState<T extends State, K extends keyof T = keyof T> = (Pick<T, K> | T) | ((state: T) => Pick<T, K> | T);
export declare type StateSelector<T extends State, U> = (state: T) => U;
export declare type EqualityChecker<T> = (state: T, newState: T) => boolean;
export declare type StateListener<T> = (state: T, previousState: T) => void;
export declare type StateSliceListener<T> = (slice: T, previousSlice: T) => void;
export interface Subscribe<T extends State> {
    (listener: StateListener<T>): () => void;
    <StateSlice>(listener: StateSliceListener<StateSlice>, selector: StateSelector<T, StateSlice>, equalityFn?: EqualityChecker<StateSlice>): () => void;
}
export declare type SetState<T extends State> = {
    <K extends keyof T>(partial: PartialState<T, K>, replace?: boolean): void;
};
export declare type GetState<T extends State> = () => T;
export declare type Destroy = () => void;
export interface StoreApi<T extends State> {
    setState: SetState<T>;
    getState: GetState<T>;
    subscribe: Subscribe<T>;
    destroy: Destroy;
}
export declare type StateCreator<T extends State, CustomSetState = SetState<T>> = (set: CustomSetState, get: GetState<T>, api: StoreApi<T>) => T;
export default function create<TState extends State>(createState: StateCreator<TState>): StoreApi<TState>;
