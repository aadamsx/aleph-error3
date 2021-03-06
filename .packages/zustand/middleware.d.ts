import { GetState, PartialState, SetState, State, StateCreator, StoreApi } from './vanilla';
export declare const redux: <S extends State, A extends {
    type: unknown;
}>(reducer: (state: S, action: A) => S, initial: S) => (set: SetState<S>, get: GetState<S>, api: StoreApi<S> & {
    dispatch?: ((a: A) => A) | undefined;
    devtools?: any;
}) => S & {
    dispatch: (a: A) => A;
};
declare type NamedSet<T extends State> = {
    <K extends keyof T>(partial: PartialState<T, K>, replace?: boolean, name?: string): void;
};
export declare const devtools: <S extends State>(fn: (set: NamedSet<S>, get: GetState<S>, api: StoreApi<S>) => S, prefix?: string | undefined) => (set: SetState<S>, get: GetState<S>, api: StoreApi<S> & {
    dispatch?: unknown;
    devtools?: any;
}) => S;
export declare const combine: <PrimaryState extends State, SecondaryState extends State>(initialState: PrimaryState, create: (set: SetState<PrimaryState>, get: GetState<PrimaryState>, api: StoreApi<PrimaryState>) => SecondaryState) => StateCreator<PrimaryState & SecondaryState, SetState<PrimaryState & SecondaryState>>;
declare type StateStorage = {
    getItem: (name: string) => string | null | Promise<string | null>;
    setItem: (name: string, value: string) => void | Promise<void>;
};
declare type StorageValue<S> = {
    state: S;
    version: number;
};
declare type PersistOptions<S> = {
    /** Name of the storage (must be unique) */
    name: string;
    /**
     * A function returning a storage.
     * The storage must fit `window.localStorage`'s api (or an async version of it).
     * For example the storage could be `AsyncStorage` from React Native.
     *
     * @default () => localStorage
     */
    getStorage?: () => StateStorage;
    /**
     * Use a custom serializer.
     * The returned string will be stored in the storage.
     *
     * @default JSON.stringify
     */
    serialize?: (state: StorageValue<S>) => string | Promise<string>;
    /**
     * Use a custom deserializer.
     *
     * @param str The storage's current value.
     * @default JSON.parse
     */
    deserialize?: (str: string) => StorageValue<S> | Promise<S>;
    /**
     * Prevent some items from being stored.
     */
    blacklist?: (keyof S)[];
    /**
     * Only store the listed properties.
     */
    whitelist?: (keyof S)[];
    /**
     * A function returning another (optional) function.
     * The main function will be called before the state rehydration.
     * The returned function will be called after the state rehydration or when an error occured.
     */
    onRehydrateStorage?: (state: S) => ((state?: S, error?: Error) => void) | void;
    /**
     * If the stored state's version mismatch the one specified here, the storage will not be used.
     * This is useful when adding a breaking change to your store.
     */
    version?: number;
    /**
     * A function to perform persisted state migration.
     * This function will be called when persisted state versions mismatch with the one specified here.
     */
    migrate?: (persistedState: any, version: number) => S | Promise<S>;
};
export declare const persist: <S extends State>(config: StateCreator<S, SetState<S>>, options: PersistOptions<S>) => (set: SetState<S>, get: GetState<S>, api: StoreApi<S>) => S;
export {};
