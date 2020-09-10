import React, { memo } from 'react';
import HomeSVG from '../../../../screen/HomeScreen';
import Badge from '../badge';
import { SVGProps } from '../../../styles/svg/types';

const IconWithBadgeComponent = (props: SVGProps) => {
  return (
    <>
      <HomeSVG {...props} />
      <Badge iconSize={props.size} />
    </>
  );
};

const IconWithBadge = memo(IconWithBadgeComponent);

export default IconWithBadge;
