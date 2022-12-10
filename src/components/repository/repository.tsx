import React from 'react'

interface RepositoryProps {
  owner?: string | "",
  name?: string | "",
  description?: string | "",
  starCount?: number | 0,
  htmlUrl?: string | ""
}

export const Repository: React.FC<RepositoryProps> = ({ owner, name, description, starCount, htmlUrl }) => {
  return (
    <a href={`${htmlUrl}`} target="_blank" className="block w-64 bg-slate-900 border rounded-lg border-gray-700 p-5 shadow delay-100 duration-200" rel="noreferrer">
      <div className="flex flex-row justify-between items-center gap-5">
        <p className='w-10/12 break-all'>
          <span className="text-gray-500 font-semibold">{owner}/</span>
          <span className="text-gray-300 font-semibold">{name}</span>
        </p>
        <span className='flex justify-between items-center gap-2 text-xs w-2/12'>
          {starCount ?? 0}
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
            <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
          </svg>
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-3 break-all">
        {description}
      </p>
    </a>
  )
}