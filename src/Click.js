function Click(props){

    return (
        <div className="flex-1 grow grid place-content-center select-none cursor-pointer text-[200px] " >
            <span className="spanCount select-none font-mono font-bold font-outline-5 text-black lg:text-[200px] md:text-[150px] min-[580px]:text-[130px] text-[75px] " onClick={props.clicked}>{props.count}</span>
        </div>
    )
}

export default Click