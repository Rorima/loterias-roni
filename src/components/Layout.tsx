import "./Layout.css";

import Header from "./Header";
import Navigation from "./Navigation";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Header />

      <main className="content">
        {children}
      </main>

      <Navigation />
    </div>
  );
}