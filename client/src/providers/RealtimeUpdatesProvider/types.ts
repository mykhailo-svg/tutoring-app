export enum REALTIME_UPDATES_EVENTS {
  USER_DISCONNECTED = 'USER_DISCONNECTED',
  USER_CONNECTED = 'USER_CONNECTED',
}

export type RealtimeUpdatesEventHandler<Payload = any> = (payload: Payload) => void;

export type RealtimeUpdatesEventSubscriber = (
  event: REALTIME_UPDATES_EVENTS,
  handler: RealtimeUpdatesEventHandler,
  id: null | string
) => { id: string } | void;
export type RealtimeUpdatesEventSubscriptionRemover = (
  event: REALTIME_UPDATES_EVENTS,
  id: string
) => void;
