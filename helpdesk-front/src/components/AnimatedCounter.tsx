import  { useState } from "react";
import { useSpring, animated } from "react-spring";

type AnimatedProps = {
    count: number;
}

export const AnimatedCounter = ({ count }:AnimatedProps) => {
  const [animatedCount, setAnimatedCount] = useState(count);

  const props = useSpring({
    from: { value: animatedCount - 1 },
    to: async (next) => {
      await next({ value: animatedCount });
      setAnimatedCount(count);
    },
  });

  return (
    <animated.span>
      {props.value.interpolate((val) => Math.floor(val))}
    </animated.span>
  );
};