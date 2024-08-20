import { useEffect, useState } from "react"
//use window size hook, therefore export this


export const useWindowSize =() =>{

    //creating a state
    const [size, setSize] = useState([window.innerWidth, window.innerHeight])

    //update, when screen size change

    useEffect(() => {
        const updateSize =()=>{
            //window - global object
            setSize([window.innerWidth, window.innerHeight])
        }

        window.addEventListener('resize', updateSize)

        //clean up
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    //when we are not returning anything

    return {
        width: size[0],
        height: size[1]
    }
}