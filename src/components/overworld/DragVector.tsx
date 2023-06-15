import React, { useState, useRef } from 'react';
import { Vector2 } from 'three';


const DragVector = (startPos: Vector2, change: (v: Vector2) => void, stop: () => void) => {

    const [movingState, setMovingState] = useState(false);
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!startPos || !movingState) return;
        const { clientX, clientY } = event;
        const dragVector = new Vector2(clientX - startPos.x, startPos.y - clientY);
        change(dragVector);
    };

    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        if (!startPos || !movingState) return;
        const { clientX, clientY } = event.touches[0];
        const dragVector = new Vector2(clientX - startPos.x, startPos.y - clientY);
        change(dragVector);
    };

    const startMovement = () => {
        setMovingState(true);
    }
    const reset = () => {
        setMovingState(false);
        change(new Vector2());
    }


    return {
        handleMouseDown: startMovement,
        handleMouseMove: handleMouseMove,
        handleMouseUp: reset,
        handleTouchStart: startMovement,
        handleTouchMove: handleTouchMove,
        handleTouchEnd: reset
    }
};

export default DragVector;