import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ moduleId: string }>;
}

export default async function ModuleIndexPage({ params }: Props) {
  const { moduleId } = await params;
  redirect(`/gemba/${moduleId}/step-1`);
}
