'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '../ui/input';
import { ChangeEvent, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('search')?.toString() || ''
  );

  const handleSearchQuery = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    replace(`products?${params.toString()}`);
  }, 500);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    handleSearchQuery(e.target.value);
  };

  return (
    <Input
      type="text"
      placeholder="Search for products"
      className="max-w-xs"
      onChange={handleInputChange}
      value={searchQuery}
    />
  );
}
