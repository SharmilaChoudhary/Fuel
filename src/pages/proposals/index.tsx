import React from 'react'
import type { NextPage } from "next";
import Link from "next/link";
const Proposals:NextPage=() => {
  return (
   

<div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-extrabold text-white mb-4">Title</h2>
      <p className="text-gray-300 mb-4">Short Description</p>
      <div className="flex justify-between">
        <Link
          href={`/proposals/${1}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-400 m-4">
          Details
        </Link>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:ring-green-400 m-4">
          Button 2
        </button>
      </div>
    </div>

  )
}

export default Proposals