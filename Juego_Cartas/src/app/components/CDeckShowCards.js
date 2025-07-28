import React, { useRef, useState } from 'react';
import { useSprings, animated, to as interpolate, useSpring, a, useTrail } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import { styled } from '@stitches/react';
import '../style.css';

function extractImagen(data1) {
    
    //return "";
    if(!data1.estado){
        return "/assets/images/" + data1.imagen;
    } else {
        return "/assets/images/" + data1.imagen_desactivo;
    }
    
}

export default function CDeckShowCards({ card }) {

    const [flipped, set] = useState(false)
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    const AppContainer = styled('div', {
        width: '200vw',
        height: '200vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    })

    const Container = styled('div', {
        display: 'flex',
        gap: 10,
        marginBottom: 80,
    })

    const Box = styled('div', {
        position: 'relative',
        height: 100,
        width: 100,
    })

    const SharedStyles = {
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Helvetica',
        fontWeight: 800,
        backfaceVisibility: 'hidden',
    }

    const FrontBox = styled(animated.div, {
        ...SharedStyles,
        backgroundColor: '#fafafa',
        border: 'solid 2px #1a1a1a',
    })

    const BackBox = styled(animated.div, {
        ...SharedStyles,
        backgroundColor: '#6cab64',
        border: 'solid 2px #6cab64',
        color: '#fafafa',
    })

    const [trail, api] = useTrail(1, () => ({
        rotateX: 0,
    }))
    const isFlipped = useRef(false);
    const handleClick = () => {
        if (isFlipped.current) {
            api.start({
                rotateX: 0,
            })
            isFlipped.current = false
        } else {
            api.start({
                rotateX: 180,
            })
            isFlipped.current = true
        }
    }

    return (
        <div>
            <Container >
                {trail.map(({ rotateX }, i) => (
                    <Box key={i}>
                       
                        <BackBox
                            style={{
                                transform: rotateX.to(val => `perspective(600px) rotateX(${180 - val}deg)`),
                                transformStyle: 'preserve-3d',
                            }}>
                            {<img src={extractImagen(card)} />}
                        </BackBox>
                    </Box>
                ))}
            </Container>
        </div>


    );
}