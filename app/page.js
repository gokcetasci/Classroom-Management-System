import Link from "next/link";
import { IoIosArrowDroprightCircle } from "react-icons/io";
export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-row items-center p-12">
        <ul>
          <li className="text-[26px] mr-2">
            Sınıf
          </li>
        </ul>
        <Link href="/class">
          <IoIosArrowDroprightCircle className="w-9 h-9 fill-primary hover:scale-105 transition duration-300 ease-in-out"/>
        </Link>
      </div>
    </div>
  );
}
