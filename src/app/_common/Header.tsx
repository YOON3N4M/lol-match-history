import Link from "next/link";

export default function Header() {
  return (
    <div className="min-h-[50px] bg-main-500">
      <div className="content-layout flex justify-between py-2">
        <h1 className="text-2xl! font-extrabold! text-white">
          <Link href="/">33.GG</Link>
        </h1>
      </div>
    </div>
  );
}
