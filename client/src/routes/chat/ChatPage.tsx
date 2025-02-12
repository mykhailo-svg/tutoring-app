import { getCurrentUserOnServer } from '@/api/actions/user/getCurrentUserOnServer';
import { redirect } from 'next/navigation';
import styles from './ChatPage.module.scss';
import { ChatHeader } from './ui';
import { getUserById } from '@/api/actions/user';

type ChatPageProps = { params: Promise<{ userId: string }> };

export const ChatPage: React.FC<ChatPageProps> = async ({ params }) => {
  const userId = parseInt((await params).userId);

  if (!isFinite(userId)) {
    return redirect('/messenger');
  }

  const currentUser = await getCurrentUserOnServer();

  if (!currentUser || `${userId}` === `${currentUser.id}`) {
    return redirect('/messenger');
  }

  const companionUser = await getUserById(userId);

  if (!companionUser) {
    return redirect('/messenger');
  }

  return (
    <div className={styles.root}>
      <ChatHeader name={companionUser.name} />
      <div>chat {companionUser?.name}</div>
    </div>
  );
};
