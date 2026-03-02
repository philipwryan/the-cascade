import { redirect } from 'next/navigation';

interface Props {
  params: { moduleId: string; stepId: string };
}

export default function StepPage({ params }: Props) {
  const { moduleId, stepId } = params;
  redirect(`/gemba/${moduleId}/${stepId}`);
}
