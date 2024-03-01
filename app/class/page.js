import ClassListPage from '@/components/classlistpage'
import Link from 'next/link'
import React from 'react'

function ClassPage() {
  return (
    <div>
    <Link href="/class/addclasspage">
    AddClassPage
    </Link>
    <ClassListPage/>
    </div>
  )
}

export default ClassPage