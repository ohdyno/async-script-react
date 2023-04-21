import React, {useEffect} from "react";

type EventHandler = (e: Event) => void
type AsyncScriptProps = {
    src: string,
    onLoad?: EventHandler,
    onError?: OnErrorEventHandler,
    appendTo?: HTMLElement
}

function AsyncScript(props: AsyncScriptProps) {
    useEffect(() => {
        const scriptElement = document.createElement('script');
        scriptElement.async = true
        scriptElement.src = props.src
        if (props.onLoad) scriptElement.onload = props.onLoad
        if (props.onError) scriptElement.onerror = props.onError
        const parent = props.appendTo || document.head
        parent.append(scriptElement)

        return () => {
            parent.removeChild(scriptElement)
        }
    }, [])

    return null
}

export default AsyncScript
