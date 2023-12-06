import React from "react"
import DefaultEditor from '@/components/webBuilder'

const AdminPage = () => {
    return <div><p className="text-center">Admin Page</p>
        <div className="flex">
            <div className="w-1/6 bg-slate-200 text p-4">
                <p className="font-bold text-xl px-2">Page List</p>
                <div className="p-4">
                    <div className="rounded-full bg-slate-300 py-2 px-4 text-slate-800">
                        Home Page
                    </div>
                </div>
            </div>
            {/* Editor */}
            <DefaultEditor />
        </div>
    </div>
}
export default AdminPage