"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import ClassListPage from "@/components/classlistpage";

function ClassPage() {
  const [showClassButton, setShowClassButton] = useState(true);// showClassButton state'i ve onu güncellemek için setShowClassButton fonksiyonunu tanımlanır.

  // Öğrenci listesini görüntüleme butonuna tıklandığında çalışacak fonksiyon.
  const handleViewStudentListClick = () => {
    setShowClassButton(false); // showClassButton'u false olarak güncelleyerek "Class" ve "Add Class" butonları gizlenir.
  };

  return (
    <div id="classpage" className="container mx-auto">
      <div className="flex flex-row items-center p-12">
        {showClassButton && (
          <>
            <Link href="/class">
              <p className="text-[26px] mr-2">Class</p>
            </Link>
            <Link href="/class/addclasspage">
              <FaSquarePlus className="w-9 h-9 fill-primary hover:scale-105 transition duration-300 ease-in-out" />
            </Link>
          </>
        )}
      </div>
      <div className="m-6">
      <ClassListPage
        onViewStudentListClick={handleViewStudentListClick}
        setShowClassButton={setShowClassButton}
      />
      </div>
    </div>
  );
}

export default ClassPage;
