import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

type LoaderProps = {
    setGameIsLoaded: (state: boolean) => void;
}

export default function Loader({ setGameIsLoaded }: LoaderProps) {
    const { progress } = useProgress();

    useEffect(() => {
        if (progress >= 100) {
            setGameIsLoaded(true);
        }
    }, [progress]);
    return <></>;
}