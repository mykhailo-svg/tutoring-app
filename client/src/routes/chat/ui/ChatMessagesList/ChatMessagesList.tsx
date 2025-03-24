import { Card } from '@/shared/ui/cards';
import styles from './ChatMessagesList.module.scss';
import type { DirectMessage, User } from '@/global_types';
import { useAuth } from '@/providers/AuthProvider';
import classNames from 'classnames';
import { Scrollable, ScrollableOnScrolledToTop } from '@/shared/ui/scrollable/Scrollable';
import {
  Dispatch,
  Fragment,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { APIEndpoints, axiosClient } from '@/api';
import { translateMonth } from '@/shared/helpers/translateMonth';
import Image from 'next/image';
import EmptyStateIllustration from '../../../../shared/assets/chatsEmptyStateIcon.svg';

type ChatMessagesListProps = {
  messages: DirectMessage[];
  companion: User;
  fetchNextMessages: () => void;
};

type VisibleDateBadges = Record<string, true>;

export const ChatMessagesList: React.FC<ChatMessagesListProps> = ({
  messages,
  companion,
  fetchNextMessages,
}) => {
  const [stickyDate, setStickyDate] = useState('');
  const [visibleDateBadges, setVisibleDateBadges] = useState<VisibleDateBadges>({});

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
      <div
        className={classNames(styles.stickyDateBadge, {
          [styles.stickyBadgeActive]: stickyDate && !visibleDateBadges[stickyDate],
        })}
      >
        <span>{getUserFriendlyDate(stickyDate)}</span>
      </div>

      {messages.length ? (
        <Scrollable onScrolledToTop={onScrolledToTop} ref={scrollableRef} className={styles.inner}>
          <div className={styles.list}>
            {messages.map((message, index) => (
              <Fragment key={message.id}>
                {shouldDisplayDateBadge(messages[index - 1], message, index) && (
                  <>
                    <DateBadge
                      setVisibleDateBadges={setVisibleDateBadges}
                      date={message.createdAt}
                    />
                    <DateAnchor setDate={setStickyDate} date={message.createdAt} />
                  </>
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

                {index < messages.length - 1 &&
                  formatDateForCompare(messages[index + 1].createdAt) !==
                    formatDateForCompare(message.createdAt) && (
                    <DateAnchor setDate={setStickyDate} date={message.createdAt} />
                  )}
              </Fragment>
            ))}
          </div>
        </Scrollable>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyImageContainer}>
            <Image alt='emptyState' src={EmptyStateIllustration} />
          </div>
          <p className={styles.emptyTitle}>No messages yet</p>
        </div>
      )}
    </Card>
  );
};

function formatDateForCompare(string: string) {
  const date = new Date(string);

  return `${date.getMinutes()}`;
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

  return `${date.getMinutes()} ${translateMonth(date.getMonth())}`;
}

function convertToLocalTime(utcTimestamp: string): string {
  const date = new Date(utcTimestamp);

  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();

  return `${hours.length > 1 ? hours : '0' + hours}:${
    minutes.length > 1 ? minutes : '0' + minutes
  }`;
}

function DateAnchor({ date, setDate }: { date: string; setDate: (date: string) => void }) {
  const divRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setDate(date);
      },
      { threshold: 0 } // Adjust threshold as needed
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, [date, setDate]);

  return <div ref={divRef}></div>;
}

type DateBadgeProps = {
  date: string;
  setVisibleDateBadges: Dispatch<SetStateAction<VisibleDateBadges>>;
};

function DateBadge({ date, setVisibleDateBadges }: DateBadgeProps) {
  const divRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisibleDateBadges((prevState) => {
        const nextState = { ...prevState };

        if (entry.isIntersecting) {
          nextState[date] = true;
        } else {
          delete nextState[date];
        }
        return nextState;
      });
    });

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, [date, setVisibleDateBadges]);

  return (
    <div ref={divRef} className={styles.dateBadge}>
      <span>{getUserFriendlyDate(date)}</span>
    </div>
  );
}
