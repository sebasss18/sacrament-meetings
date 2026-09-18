import NavLinks from "./NavLinks";

export default function Header() {
  const date = new Date().toLocaleDateString();

  return (
    <header className="flex items-center justify-between bg-slate-800 p-6 text-white m-2 rounded-xl font-serif">
      <div>
        <h1 className="text-2xl font-bold">Rio Sonora</h1>
        <p>{date}</p>
      </div>
      <NavLinks />
    </header>
  );
}
