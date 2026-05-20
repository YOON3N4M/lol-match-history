import Link from "next/link";

export default function Header() {
  return (
    <div className="min-h-[50px] bg-main-500">
      <div className="flex justify-between px-6 py-2">
        <h1 className="font-extrabold! text-2xl! text-white">
          <Link href="/">33.GG</Link>
        </h1>
      </div>
    </div>
  );
}
