import { WithStyle } from '@medly-components/utils';
import React, { useMemo } from 'react';
import { DescriptionStyled, FieldStyled, FieldWithLabelStyled, LabelStyled } from './FieldWithLabel.styled';
import { FieldWithLabelProps, StaticProps } from './types';

const Component: React.FC<FieldWithLabelProps> = React.memo(
    React.forwardRef((props, ref) => {
        const isLabelPresent = useMemo(
            () => !!React.Children.toArray(props.children).find((child: any) => child && child.type && child.type.displayName === 'Label'),
            [props.children]
        );

        return <FieldWithLabelStyled ref={ref} {...props} isLabelPresent={isLabelPresent} />;
    })
);

Component.displayName = 'FieldWithLabel';
Component.defaultProps = { labelPosition: 'left', fullWidth: false, fieldWithMaxContent: false };
export const FieldWithLabel: React.FC<FieldWithLabelProps> & WithStyle & StaticProps = Object.assign(Component, {
    Style: FieldWithLabelStyled,
    Description: DescriptionStyled,
    Label: LabelStyled,
    Field: FieldStyled
});
