import { WithStyle } from '@medly-components/utils';
import React, { FC } from 'react';
import SideEffect1477468LineIconSvg from '../../assets/GSDD/SideEffect_1477_468_Line.svg';
import SvgIcon, { SvgIconProps } from '../../SvgIcon';

const Component: FC<SvgIconProps> = React.memo(props => {
    const { size, withHoverEffect, color, margin, ...restProps } = props;
    return (
        <SvgIcon {...{ size, withHoverEffect, color, margin, ...restProps }}>
            <SideEffect1477468LineIconSvg {...restProps} width="1em" height="1em" />
        </SvgIcon>
    );
});
Component.displayName = 'SideEffect1477468LineIcon';

const SideEffect1477468LineIcon: FC<SvgIconProps> & WithStyle = Object.assign(Component, { Style: SvgIcon })

export default SideEffect1477468LineIcon
