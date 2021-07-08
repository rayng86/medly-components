import { SvgIcon } from '@medly-components/icons';
import { CheckboxSizes, CheckboxTheme } from '@medly-components/theme';
import { centerAligned, css, styled, WithThemeProp } from '@medly-components/utils';
import { rgba } from 'polished';
import { getSelectorLabelPositionStyle } from '../Selectors';
import Text from '../Text';
import { Props } from './types';

const getCheckboxSize = ({ theme, size }: { size?: CheckboxSizes } & WithThemeProp) =>
    theme.checkbox.sizes[size || theme.checkbox.defaultSize];

const activeStyle = ({ iconColor, hasError, disabled, bgColor }: Props & CheckboxTheme) => {
    const checkboxState = disabled ? 'disabled' : hasError ? 'error' : 'active';

    return css`
        border-color: ${bgColor[checkboxState]};
        background-color: ${bgColor[checkboxState]};
        ${SvgIcon} {
            transform: scale(1);
            * {
                fill: ${iconColor[checkboxState]};
            }
        }
    `;
};

const nonActiveStyle = ({ borderColor, hasError, disabled }: Props & CheckboxTheme) => {
    const checkboxState = disabled ? 'disabled' : hasError ? 'error' : 'default';

    return css`
        background-color: transparent;
        border-color: ${borderColor[checkboxState]};
    `;
};

export const StyledCheckbox = styled.div`
    border: 0.15rem solid;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.checkbox.borderRadius};
    transition: all 100ms ease-out;

    ${centerAligned('flex')}

    ${SvgIcon} {
        pointer-events: none;
        z-index: 1;
        transition: all 200ms ease-in-out;
        transform: scale(0);
        width: 100%;
        height: 100%;
        margin-right: 0.05rem;
    }
`;

export const HiddenCheckbox = styled.input.attrs(({ theme }) => ({ type: 'checkbox', ...theme.checkbox }))<Props>`
    opacity: 0;
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    outline: none;
    position: absolute;

    &:checked ~ ${StyledCheckbox} {
        ${activeStyle};
    }

    &:not(:checked) ~ ${StyledCheckbox} {
        ${({ indeterminate }) => (indeterminate ? activeStyle : nonActiveStyle)}
    }

    &:not(:disabled) {
        &:focus {
            & ~ ${StyledCheckbox} {
                box-shadow: ${({ hasError, borderColor, theme }) => {
                    const className = hasError ? 'error' : 'active';
                    return `0 0 ${theme.checkbox.boxShadow.blurRadius} ${theme.checkbox.boxShadow.spreadRadius} ${rgba(
                        borderColor[className],
                        0.35
                    )}`;
                }};
            }

            &:not(:checked) ~ ${StyledCheckbox} {
                border-color: ${({ hasError, borderColor, indeterminate }) => !indeterminate && borderColor[hasError ? 'error' : 'active']};
            }
        }
    }
`;

export const CheckboxWrapper = styled('div')`
    margin: 0.3rem;
    flex-shrink: 0;
    width: ${getCheckboxSize};
    height: ${getCheckboxSize};
    position: relative;
`;

export const ErrorText = styled(Text)<{ disabled: boolean }>`
    display: block;
    font-size: 1.2rem;
    line-height: 1.6rem;
    color: ${({ theme, disabled }) => theme.checkbox.helperTextColor[disabled ? 'disabled' : 'error']};
    margin-bottom: 0.5rem;
`;

const getEventStyle = (event: 'hovered' | 'pressed' | 'focused') => ({
    isActive,
    hasError,
    borderColor,
    theme,
    bgColor
}: CheckboxTheme & Props & { isActive: boolean }) => {
    const state = hasError ? 'error' : 'active';
    const { blurRadius, spreadRadius } = theme.checkbox.boxShadow;
    return css`
        box-shadow: 0 0 ${blurRadius} ${spreadRadius} ${rgba(borderColor[state], event === 'pressed' ? 0.5 : 0.35)};
        border-color: ${event !== 'focused' && isActive ? bgColor[event][state] : borderColor[event === 'pressed' ? 'pressed' : state]};
        background-color: ${isActive && event !== 'focused' && bgColor[event][state]};
    `;
};

export const CheckboxWithLabelWrapper = styled('label').attrs(({ theme }) => ({ ...theme.checkbox }))<Props & { isActive: boolean }>`
    display: ${({ fullWidth }) => (fullWidth ? 'flex' : 'inline-flex')};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    * {
        cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    }

    ${getSelectorLabelPositionStyle}

    &:hover {
        ${StyledCheckbox} {
            ${({ disabled }) => !disabled && getEventStyle('hovered')};
        }
    }

    &:active {
        ${StyledCheckbox} {
            ${({ disabled }) => !disabled && getEventStyle('pressed')};
        }
    }
`;
