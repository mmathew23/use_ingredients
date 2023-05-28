// React component for a picker that allow the user to select one item from a list of items.
// The picker is a horizontal selector that highlight the selected item.

import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Typography, Grid, Button, ButtonGroup } from '@mui/material';

const PREFIX = 'Picker';

const classes = {
    item: `${PREFIX}-item`,
    itemSelected: `${PREFIX}-itemSelected`,
    itemText: `${PREFIX}-itemText`
};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({
        // width: '100%',
        // height: '100%',
        // display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
    [`& .${classes.item}`]: {
        // width: '100%',
        // height: '100%',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        // cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
    },

    [`& .${classes.itemSelected}`]: {
        // width: '100%',
        // height: '100%',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
    },

    [`& .${classes.itemText}`]: {
        // color: theme.palette.primary.contrastText,
        // fontSize: '1.5rem',
        // fontWeight: 'bold',
        // textAlign: 'center',
        padding: '0.5rem',
        textTransform: 'none',
    }
}));

class Picker extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected,
        };
    }

    render() {
        const {  items, onSelect, className } = this.props;
        const { selected } = this.state;
        return (
            <StyledGrid container className={className} >
                <ButtonGroup>
                {items.map((item, index) => (
                    <Button key={index} className={selected === index ? classes.itemSelected : classes.item} onClick={() => {
                        this.setState({ selected: index });
                        onSelect(index);
                    }}>
                        <Typography className={classes.itemText}>{item}</Typography>
                    </Button>
                ))}
                </ButtonGroup>
            </StyledGrid>
        );
    }
}

Picker.propTypes = {
    items: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default (Picker);

