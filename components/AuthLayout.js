import Navbar from './AuthNavbar';
import Footer from './AuthFooter';

export default function AuthLayout({ children }) {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full" />
          {children}
          <Footer absolute />
        </section>
      </main>
    </>
  );
}
