import { Card } from '@/shared/ui/cards';
import styles from './MessengerPage.module.scss';
import { MessengerChatsList } from './ui';
import { APIEndpoints, getApiEndpointUrl } from '@/api';
import { createAuthHeaders } from '@/shared/helpers';

export const MessengerPage = async () => {
  const chatsResponse = await fetch(getApiEndpointUrl(APIEndpoints.directMessages.getChats), {
    headers: await createAuthHeaders(),
  });

  const chats = await chatsResponse.json();

  return (
    <Card className={styles.root}>
      <MessengerChatsList initialChats={chats} />
    </Card>
  );
};
