import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/en'); // Use 'en' as default base url
}