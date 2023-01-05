function Click(props){

    return (
        <div className="flex-1 grow grid place-content-center select-none cursor-pointer text-[200px] " >
            <span className="animate-[rainbow-text-shadow_10s_linear_infinite] select-none font-mono font-bold font-outline-5 text-[#202020] lg:text-[200px] md:text-[150px] min-[580px]:text-[130px] text-[75px]  " onClick={props.clicked}>{props.count}</span>
        </div>
    )
}

export default Click