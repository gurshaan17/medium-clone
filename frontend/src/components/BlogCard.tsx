interface BlogCarProps {
    authorName:string,
    title:string,
    content:string,
    publishedAt:string
}

export const BlogCard = ({authorName,title,content,publishedAt}:BlogCarProps) => { 
    return <div className="border-b border-slate-300 py-4 px-4">
        <div className="flex pb-1">
            <div>
                <Avatar name={authorName}/>
            </div>
            <div className="font-extralight text-slate-700 ml-2">
                {authorName}
            </div>
            <div className="flex justify-center flex-col px-1">
                <Circle/>
            </div>
            <div className="font-thin text-slate-700">
                {publishedAt}
            </div>
        </div>
        <div className="text-2xl font-semibold pb-1">
            {title}
        </div>
        <div className="text-lg font-extralight text-slate-800">
            {(content.length > 100) ? content.slice(0, 100) + "..." : content}
        </div>
        <div className="text-sm text-gray-500 mt-1">
            {`${Math.ceil(content.length/150)} min read `}
        </div>
    </div>
}


const Avatar = ({name}:{name:string}) => {

    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-200 rounded-full">
            <span className="font-medium text-sm text-gray-600">{name[0]}</span>
        </div>

}


const Circle = () => {
    return <div className="w-1 h-1 rounded-full bg-slate-500">

    </div>
}