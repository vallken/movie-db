import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/anime');
  return null;
}
