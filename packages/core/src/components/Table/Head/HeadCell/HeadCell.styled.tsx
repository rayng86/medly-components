import { SvgIcon } from '@medly-components/icons';
import { clearMarginPadding, css, styled } from '@medly-components/utils';
import Text from '../../../Text';
import Cell from '../../Cell';

const frozen = () => css`
    z-index: 4;
`;

export const ResizeHandlerStyled = styled('span')`
    ${clearMarginPadding()};
    width: 3px;
    height: 100%;
    min-height: 25px;
    cursor: ew-resize;
`;

export const HeadCellStyled = styled(Cell)`
    text-overflow: initial;
    white-space: normal;

    *:first-child {
        margin-right: auto;
    }

    ${Text.Style} {
        overflow: auto;
        white-space: unset;
        text-overflow: unset;
    }

    ${SvgIcon} {
        cursor: pointer;
        margin-right: 5px;
    }

    ${props => props.frozen && frozen()}
`;