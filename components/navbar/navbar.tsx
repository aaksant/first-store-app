import Container from '../globals/container';
import CartButton from './cart-button';
import ThemeButton from './theme-button';
import LinksDropdown from './links-dropdown';
import Logo from './logo';
import Search from './search';
import { Suspense } from 'react';

export default function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col flex-wrap gap-4 px-20 py-6 sm:flex-row sm:justify-between sm:items-center">
        <Logo />
        <Suspense>
          <Search />
        </Suspense>
        <div className="flex gap-4 items-center">
          <CartButton />
          <ThemeButton />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}
