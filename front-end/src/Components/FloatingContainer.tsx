import "./tempFloatingContainerStyle.css"
export const FloatingContainer:React.FC<{children: JSX.Element}> = ({children}) => {
    return (
        <div className={"floatingContainer"} onClick={(e) => {e.stopPropagation()}}>
            {children}
        </div>
    )
}