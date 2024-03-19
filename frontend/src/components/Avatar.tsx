import React from 'react'

const Avatar = ({name} : {name: string | null}) => {
  return (
    <div>
      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-4">
        <span className="font-medium text-gray-600 dark:text-gray-300">{name ? name[0] : "JL"}</span>
      </div>
    </div>
  );
}

export default Avatar