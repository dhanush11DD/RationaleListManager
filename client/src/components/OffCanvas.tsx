import { X } from 'lucide-react'
import React, { useState } from 'react'

function OffCanvas({children,isOpened ,setIsOpened}:any) {
  return (
    <div className={`fixed inset-0 z-50 bg-black/80 ${isOpened ? 'w-screen h-screen' : 'w-0 h-0'} overflow-hidden  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`}>
        <div className="min-w-[400px] max-w-[400px] ml-auto h-full bg-white p-4">
            <div className='head border-b border-gray-300 flex justify-between pb-3'>
                <h1 className="">can vas header</h1>
                <X className="h-4 w-4" onClick={()=>setIsOpened(false)} />
            </div>
            <div className="">
                {children}
            </div>
        </div>
    </div>
  )
}

export default OffCanvas