import { redirect } from 'next/navigation';

// Redirect old first100 dashboard to unified dashboard
export default function First100DashboardPage() {
  redirect('/dashboard');
}
