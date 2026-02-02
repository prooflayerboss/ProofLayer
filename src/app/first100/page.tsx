import { redirect } from 'next/navigation';

// Redirect old first100 landing to founders page
export default function First100LandingPage() {
  redirect('/founders');
}
