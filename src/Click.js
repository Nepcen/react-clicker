function Click(props){

    return (
        <div className="flex-1 grow grid place-content-center select-none cursor-pointer text-[200px] " >
            <span className="font-mono font-bold font-outline-5 text-white " onClick={props.clicked}>{props.count}</span>
        </div>
    )
}

export default Click