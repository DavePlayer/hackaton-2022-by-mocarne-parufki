import "./tempBackdropStyle.css"

interface BackdropInterface {
    cancel: () => void
}

const Backdrop: React.FC<BackdropInterface> = ({cancel}) => {
    return <div onClick={cancel} className="backdrop" />
}

export default Backdrop