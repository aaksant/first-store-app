import Sidebar from '@/components/admin/sidebar';
import SectionTitle from '@/components/globals/section-title';
import { ReactNode } from 'react';

export default function AdminLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <SectionTitle text="Your Dashboard" />
      <section className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-3 lg:col-span-2">
          <Sidebar />
        </div>
        <div className="md:col-span-9 lg:col-span-10 px-4 md:px-6 lg:px-8">
          {children}
        </div>
      </section>
    </>
  );
}
