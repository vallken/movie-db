import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/movie');
  return null;
}
