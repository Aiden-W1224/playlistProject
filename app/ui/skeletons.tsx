const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function PlaylistSkeleton() {
    return (
        <div className={`flex flex-col max-w-full`}>
            <div className={`${shimmer} flex flex-col p-8 bg-gray-100 shadow-md rounded-2xl`}>
                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="bg-gray-200 w-16 h-16"></div>
                    <div className="flex flex-col ml-3">
                    <div className="bg-gray-200 h-4 w-42"></div> 
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export function DashboardSkeleton() {
    return (
        <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
                <div className="max-h-[80vh] overflow-y-scroll mt-4">
                <ul className="list-disc pl-4">
                    <li className="list-none p-3"><PlaylistSkeleton /></li>
                    <li className="list-none p-3"><PlaylistSkeleton /></li>
                    <li className="list-none p-3"><PlaylistSkeleton /></li>
                    <li className="list-none p-3"><PlaylistSkeleton /></li>
                </ul>
                </div>
            </div>
        </div>
    )
}

export function SongsSkeleton() {
    return (
        <div className="flex flex-col space-y-4">
            <li className='list-none p-3'>
                <div className="flex flex-col max-w-full">
                    <div className={`${shimmer} h-28 flex flex-col p-8 bg-gray-100 rounded-2xl`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        <div className="flex flex-col ml-3">
                            <div className="h-4 w-64 bg-gray-300"></div>
                            <div className="h-3.5 w-32 mt-1 bg-gray-300"></div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </li>
            <li className='list-none p-3'>
                <div className="flex flex-col max-w-full">
                    <div className={`${shimmer} h-28 flex flex-col p-8 bg-gray-100 rounded-2xl`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        <div className="flex flex-col ml-3">
                            <div className="h-4 w-64 bg-gray-300"></div>
                            <div className="h-3.5 w-32 mt-1 bg-gray-300"></div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </li>
            <li className='list-none p-3'>
                <div className="flex flex-col max-w-full">
                    <div className={`${shimmer} h-28 flex flex-col p-8 bg-gray-100 rounded-2xl`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        <div className="flex flex-col ml-3">
                            <div className="h-4 w-64 bg-gray-300"></div>
                            <div className="h-3.5 w-32 mt-1 bg-gray-300"></div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </li>
            <li className='list-none p-3'>
                <div className="flex flex-col max-w-full">
                    <div className={`${shimmer} h-28 flex flex-col p-8 bg-gray-100 rounded-2xl`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        <div className="flex flex-col ml-3">
                            <div className="h-4 w-64 bg-gray-300"></div>
                            <div className="h-3.5 w-32 mt-1 bg-gray-300"></div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </li>
        </div>  
    )
}