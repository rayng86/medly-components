import { WithStyle } from '@medly-components/utils';
import React, { FC } from 'react';
import SettingsRemoteIconSvg from '../../assets/Action/settings_remote_24px_rounded.svg';
import SvgIcon, { SvgIconProps } from '../../SvgIcon';

const Component: FC<SvgIconProps> = React.memo(props => {
    const { size, withHoverEffect, color, margin, ...restProps } = props;
    return (
        <SvgIcon {...{ size, withHoverEffect, color, margin, ...restProps }}>
            <SettingsRemoteIconSvg {...restProps} width="1em" height="1em" />
        </SvgIcon>
    );
});
Component.displayName = 'SettingsRemoteIcon';

const SettingsRemoteIcon: FC<SvgIconProps> & WithStyle = Object.assign(Component, { Style: SvgIcon })

export default SettingsRemoteIcon
