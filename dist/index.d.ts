import { Client } from 'colyseus.js';
import { Room } from 'colyseus.js';
import { Schema } from '@colyseus/schema';

export declare const colyseus: <S = Schema>(endpoint: string, schema?: new (...args: unknown[]) => S) => {
    client: Client;
    connectToColyseus: (roomName: string, options?: {}) => Promise<void>;
    setCurrentRoom: (room: Room<S>) => Promise<void>;
    disconnectFromColyseus: (consented?: boolean) => Promise<void>;
    useColyseusRoom: () => Room<S> | undefined;
    useColyseusState: {
        (): S | undefined;
        <T extends (state: S) => unknown>(selector: T): ReturnType<T> | undefined;
    };
};

export { }
