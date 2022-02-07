import Navbar from './AuthNavbar';
import FooterSmall from './AuthFooter';

export default function AuthLayout({ children }) {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full" />
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
