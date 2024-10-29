import Link from 'next/link';

export const fetchCache = 'force-no-store';

export const HomePage = async () => {
  console.log('home');

  return (
    <div>
      <Link href='/auth/login'>link</Link>
    </div>
  );
};
