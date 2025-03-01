import { Card } from '@/shared/ui/cards';
import styles from './ChatMessagesList.module.scss';
import type { DirectMessage, User } from '@/global_types';
import { useAuth } from '@/providers/AuthProvider';
import classNames from 'classnames';
import { Scrollable } from '@/shared/ui/scrollable/Scrollable';
import { Fragment, useEffect, useLayoutEffect, useRef } from 'react';

type ChatMessagesListProps = { messages: DirectMessage[]; companion: User };

export const ChatMessagesList: React.FC<ChatMessagesListProps> = ({ messages, companion }) => {
  const { data: authData } = useAuth();

  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({ top: scrollableRef.current.scrollHeight });
    }
  }, [messages.length]);

  return (
    <Card shadow='none' className={styles.root}>
      <Scrollable ref={scrollableRef} className={styles.inner}>
        <div className={styles.anchor}></div>
        <div className={styles.list}>
          {messages.map((message, index) => (
            <Fragment key={message.id}>
              {!index ||
              new Date(messages[index - 1].createdAt).getDate() !==
                new Date(message.createdAt).getDate() ? (
                <div style={{ textAlign: 'center', width: '100%', padding: '20px' }}>
                  {new Date(message.createdAt).getDate()}
                </div>
              ) : null}
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

function convertToLocalTime(utcTimestamp: string): string {
  const date = new Date(utcTimestamp);

  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();

  return `${hours.length > 1 ? hours : '0' + hours}:${
    minutes.length > 1 ? minutes : '0' + minutes
  }`;
}
