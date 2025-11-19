import type { LucideProps } from 'lucide-react';
import { Accessibility, Users, User, Mountain, PawPrint, Bus } from 'lucide-react';

export const Icons = {
  Accessible: (props: LucideProps) => <Accessibility {...props} />,
  Family: (props: LucideProps) => <Users {...props} />,
  Singles: (props: LucideProps) => <User {...props} />,
  Nature: (props: LucideProps) => <Mountain {...props} />,
  Animals: (props: LucideProps) => <PawPrint {...props} />,
  Transport: (props: LucideProps) => <Bus {...props} />,
};

export type Icon = keyof typeof Icons;
