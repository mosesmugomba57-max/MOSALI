export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 px-6 py-8 text-center">
      <h2 className="mb-2 text-2xl font-extrabold tracking-widest text-red-600">
        MOSALI
      </h2>

      <p className="text-sm text-gray-500">Your World. Your Movies.</p>

      <p className="mt-4 text-xs text-gray-600">
        © {new Date().getFullYear()} MOSALI. All rights reserved.
      </p>
    </footer>
  );
}
