import { User } from '@/global_types';

export const REALTIME_UPDATES_EVENTS = {
  USER_CONNECTED: 'USER_CONNECTED',
  USER_DISCONNECTED: 'USER_DISCONNECTED',
  MESSAGE: 'MESSAGE',
} as const;

type REALTIME_UPDATES_EVENTS =
  (typeof REALTIME_UPDATES_EVENTS)[keyof typeof REALTIME_UPDATES_EVENTS];

type RealtimeEventPayloads = {
  [REALTIME_UPDATES_EVENTS.USER_CONNECTED]: { userId: User['id'] };
  [REALTIME_UPDATES_EVENTS.USER_DISCONNECTED]: { userId: User['id'] };
  [REALTIME_UPDATES_EVENTS.MESSAGE]: { initiator: User['id']; message: string };
};

export type RealtimeUpdatesEventHandler<E extends REALTIME_UPDATES_EVENTS = any> = (payload: {
  type: E;
  payload: RealtimeEventPayloads[E];
}) => void;

export type RealtimeUpdatesEventSubscriber = <E extends keyof RealtimeEventPayloads>(
  event: E,
  handler: RealtimeUpdatesEventHandler<E>,
  id: null | string
) => { id: string } | void;

export type RealtimeUpdatesEventSubscriptionRemover = (
  event: REALTIME_UPDATES_EVENTS,
  id: string
) => void;

export const REALTIME_UPDATES_ACTIONS = {
  SEND_MESSAGE: 'SEND_MESSAGE',
  READ_MESSAGES: 'READ_MESSAGES',
} as const;

type REALTIME_UPDATES_ACTIONS =
  (typeof REALTIME_UPDATES_ACTIONS)[keyof typeof REALTIME_UPDATES_ACTIONS];

interface RealTimeActionsPayload {
  [REALTIME_UPDATES_ACTIONS.READ_MESSAGES]: {
    companionId: User['id'];
  };
  [REALTIME_UPDATES_ACTIONS.SEND_MESSAGE]: any;
}

// Corrected function type declaration
export type RealtimeUpdatesAction = <A extends keyof RealTimeActionsPayload>(
  event: A,
  payload: RealTimeActionsPayload[A]
) => void;
