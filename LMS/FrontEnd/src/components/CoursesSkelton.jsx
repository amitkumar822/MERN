import React from 'react'
import { Skeleton } from './ui/skeleton'

const CoursesSkelton = () => {
    return (
        <div>
            <div className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="relative">
                    <Skeleton className="w-full h-36 rounded-t-lg" />
                </div>
                <div className="px-5 py-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-6 w-1/3" />
                </div>
            </div>
        </div>
    )
}

export default CoursesSkelton