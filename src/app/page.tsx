import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col py-3">
      <div className="flex justify-center">
        <Image
          src="/logo.svg"
          width={0}
          height={0}
          sizes="100vw"
          className="w-52 h-auto"
          alt="SpaceX logo"
        />
      </div>
    </main>
  );
}
