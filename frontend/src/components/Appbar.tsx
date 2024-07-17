

export const Appbar = () => {
    return <div className="flex justify-between py-3 px-52 ">
        <div className="font-semibold text-3xl">
            Blog
        </div>
        <div>
            <Avatar name="Gurshaan"/>
        </div>
    </div>
}


const Avatar = ({name}:{name:string}) => {

    return <div className="relative inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-gray-200 rounded-full">
            <span className="font-medium text-lg text-gray-600">{name[0]}</span>
        </div>
}