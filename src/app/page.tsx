import { BarChart } from "./components/BarChart";
import { List } from "./components/Launches/List";
import { PieChart } from "./components/PieChart";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-4 px-2 py-3">
      <div className="flex justify-center">
        <Image
          src="/logo.svg"
          priority
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-52"
          alt="SpaceX logo"
        />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex w-full p-3 md:w-[30%]">
          <PieChart />
        </div>
        <div className="flex w-full p-3 md:w-[70%]">
          <BarChart />
        </div>
      </div>
      <div className="flex grow p-3">
        <List />
      </div>
    </main>
  );
}
