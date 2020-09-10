import * as React from 'react';
import { Icon } from 'react-native-elements'
import Animated from 'react-native-reanimated';
import Svg, { Path, PathProps } from 'react-native-svg';
import { SVGProps } from './types';

const AnimatedPath = (Animated.createAnimatedComponent(
  Path
) as any) as React.ComponentClass<
  Animated.AnimateProps<{}, PathProps & { style?: any }>
>;

Animated.addWhitelistedNativeProps({
  stroke: true,
});

const BellSVG = ({ color, size }: SVGProps) => {
  return (
    <Icon
      reverse
      reverseColor="transparent"
      name='heartbeat'
      type='font-awesome'
      color='#f50'
      size={size}
      style={{height: 10, top: -25, position: 'absolute', zIndex: 10}}
      onPress={() => console.log('hello')} />

  );
};

export default BellSVG;
