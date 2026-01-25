import { redirect } from 'next/navigation';

export default async function ThankYou({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  redirect(`/first100/thank-you${type ? `?type=${type}` : ''}`);
}
