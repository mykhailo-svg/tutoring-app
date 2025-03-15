import { Card } from '@/shared/ui/cards';
import styles from './ChatMessagesList.module.scss';
import type { DirectMessage, User } from '@/global_types';
import { useAuth } from '@/providers/AuthProvider';
import classNames from 'classnames';
import { Scrollable, ScrollableOnScrolledToTop } from '@/shared/ui/scrollable/Scrollable';
import { Fragment, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { APIEndpoints, axiosClient } from '@/api';
import { translateMonth } from '@/shared/helpers/translateMonth';

type ChatMessagesListProps = {
  messages: DirectMessage[];
  companion: User;
  fetchNextMessages: () => void;
};

export const ChatMessagesList: React.FC<ChatMessagesListProps> = ({
  messages,
  companion,
  fetchNextMessages,
}) => {
  const scrollableRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (scrollableRef.current) {
  //     scrollableRef.current.scrollTo({ top: scrollableRef.current.scrollHeight });
  //   }
  // }, [messages.length]);

  useEffect(() => {
    axiosClient.put(APIEndpoints.directMessages.setIsRead(companion.id));
  }, [companion.id]);

  const onScrolledToTop = useMemo<ScrollableOnScrolledToTop>(
    () => ({ action: fetchNextMessages }),
    [fetchNextMessages]
  );

  return (
    <Card shadow='none' className={styles.root}>
      <Scrollable onScrolledToTop={onScrolledToTop} ref={scrollableRef} className={styles.inner}>
        <div className={styles.list}>
          {messages.map((message, index) => (
            <Fragment key={message.id}>
              {shouldDisplayDateBadge(messages[index - 1], message, index) && (
                <div className={styles.dateBadge}>
                  <span>{getUserFriendlyDate(message.createdAt)}</span>
                </div>
              )}

              <div
                className={classNames(styles.item, {
                  [styles.companionMessage]: message.sender === companion.id,
                })}
              >
                <div className={styles.content}>{message.content}</div>
                <div className={styles.info}>
                  <span className={styles.time}>{convertToLocalTime(message.createdAt)}</span>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </Scrollable>
    </Card>
  );
};

function formatDateForCompare(string: string) {
  const date = new Date(string);

  return `${date.getDate()}`;
}

function shouldDisplayDateBadge(
  prevMessage: DirectMessage,
  message: DirectMessage,
  messageIndex: number
) {
  return Boolean(
    !messageIndex ||
      formatDateForCompare(prevMessage.createdAt) !== formatDateForCompare(message.createdAt)
  );
}

function getUserFriendlyDate(stringifiedDate: string) {
  const date = new Date(stringifiedDate);

  return `${date.getDate()} ${translateMonth(date.getMonth())}`;
}

function convertToLocalTime(utcTimestamp: string): string {
  const date = new Date(utcTimestamp);

  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();

  return `${hours.length > 1 ? hours : '0' + hours}:${
    minutes.length > 1 ? minutes : '0' + minutes
  }`;
}
