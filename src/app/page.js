import { permanentRedirect  } from 'next/navigation';

export default function RootPage() {
  permanentRedirect('/en'); // Use 'en' as default base url (permanent)
}