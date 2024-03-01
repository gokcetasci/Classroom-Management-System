import Link from "next/link";
import { IoIosArrowDroprightCircle } from "react-icons/io";
export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-row items-center p-12">
        <p className="text-[26px]">Class</p>
        <Link href="/class">
          <IoIosArrowDroprightCircle className="w-9 h-9 fill-primary"/>
        </Link>
      </div>
    </div>
  );
}
