import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/drama');
  return null;
}
