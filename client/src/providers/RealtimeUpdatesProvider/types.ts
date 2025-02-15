export enum REALTIME_UPDATES_EVENTS {
  USER_DISCONNECTED = 'USER_DISCONNECTED',
  USER_CONNECTED = 'USER_CONNECTED',
}

export type RealtimeUpdatesEventHandler = (payload: any) => void;

export type RealtimeUpdatesEventSubscriber = (
  event: REALTIME_UPDATES_EVENTS,
  handler: RealtimeUpdatesEventHandler,
  id: null | string
) => { id: string } | void;
