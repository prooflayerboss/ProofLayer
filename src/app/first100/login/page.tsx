import { redirect } from 'next/navigation';

// Redirect old first100 login to unified login
export default function First100LoginPage() {
  redirect('/login');
}
