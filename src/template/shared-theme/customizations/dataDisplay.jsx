import { alpha } from '@mui/material/styles';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { typographyClasses } from '@mui/material/Typography';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { chipClasses } from '@mui/material/Chip';
import { iconButtonClasses } from '@mui/material/IconButton';
import { gray, red, green } from '../themePrimitives.jsx';

export const dataDisplayCustomizations = {
    MuiList: {
        styleOverrides: {
            root: {
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
            },
        },
    },
    MuiListItem: {
        styleOverrides: {
            root: ({ theme }) => ({
                [`& .${svgIconClasses.root}`]: {
                    width: '1rem',
                    height: '1rem',
                    color: theme.palette.text.secondary,
                },
                [`& .${typographyClasses.root}`]: {
                    fontWeight: 500,
                },
                [`& .${buttonBaseClasses.root}`]: {
                    display: 'flex',
                    gap: 8,
                    padding: '2px 8px',
                    borderRadius: theme.shape.borderRadius,
                    opacity: 0.7,
                    transition: 'background-color 0.3s ease',
                    '&.Mui-selected': {
                        opacity: 1,
                        backgroundColor: alpha(theme.palette.primary.main, 0.15),
                        [`& .${svgIconClasses.root}`]: {
                            color: theme.palette.primary.main,
                        },
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.25),
                        },
                    },
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.action.hover, 0.1),
                    },
                    '&:focus-visible': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    },
                },
            }),
        },
    },
    MuiChip: {
        defaultProps: {
            size: 'small',
        },
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: '999px',
                fontWeight: 600,
                border: `1px solid ${gray[200]}`,
                backgroundColor: gray[100],
                color: gray[500],
                [`& .${chipClasses.icon}`]: {
                    color: gray[500],
                },
                ...(theme.palette.mode === 'dark' && {
                    borderColor: gray[700],
                    backgroundColor: gray[800],
                    color: gray[300],
                    [`& .${chipClasses.icon}`]: {
                        color: gray[300],
                    },
                }),
                '&.MuiChip-colorSuccess': {
                    borderColor: green[200],
                    backgroundColor: green[50],
                    color: green[500],
                    [`& .${chipClasses.icon}`]: {
                        color: green[500],
                    },
                    ...(theme.palette.mode === 'dark' && {
                        borderColor: green[800],
                        backgroundColor: green[900],
                        color: green[300],
                    }),
                },
                '&.MuiChip-colorError': {
                    borderColor: red[100],
                    backgroundColor: red[50],
                    color: red[500],
                    [`& .${chipClasses.icon}`]: {
                        color: red[500],
                    },
                    ...(theme.palette.mode === 'dark' && {
                        borderColor: red[800],
                        backgroundColor: red[900],
                        color: red[200],
                    }),
                },
            }),
        },
    },
    MuiTablePagination: {
        styleOverrides: {
            actions: {
                display: 'flex',
                gap: 8,
                marginRight: 6,
                [`& .${iconButtonClasses.root}`]: {
                    minWidth: 0,
                    width: 36,
                    height: 36,
                },
            },
        },
    },
    MuiIcon: {
        defaultProps: {
            fontSize: 'small',
        },
        styleOverrides: {
            root: {
                fontSize: '1rem',
            },
        },
    },
};
