import ClassListPage from '@/components/classlistpage'
import Link from 'next/link'
import React from 'react'
import { FaSquarePlus } from "react-icons/fa6";
function ClassPage() {
  return (
    <div>
    <div className="flex flex-row items-center p-12">
    <p className="text-[26px] mr-2">
      Class  
    </p>
    <Link href="/class/addclasspage">
    <FaSquarePlus className="w-9 h-9 fill-primary hover:scale-105 transition duration-300 ease-in-out"/>
    </Link>
    </div>
    <ClassListPage/>
    </div>
  )
}

export default ClassPage