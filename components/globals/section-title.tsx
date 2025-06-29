import { Separator } from '../ui/separator';

type SectionTitleProps = { text: string };

export default function SectionTitle({ text }: SectionTitleProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold tracking-tight mb-2">{text}</h2>
      <Separator />
    </div>
  );
}
