import Wizard from "./Wizard";
import { getSession } from "@/lib/auth";
import { redirect } from 'next/navigation';

export default async function ProcessCardPage() {
  const session = await getSession();
  const user = session?.user || { name: 'Guest', role: 'unknown' };

  if (user.role !== 'operator') {
    redirect('/');
  }

  return <Wizard user={user} />;
}
