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
        flexDirection: 'row',
        justifyContent: 'center',
    [`& .${classes.item}`]: {
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
    },

    [`& .${classes.itemSelected}`]: {
        textTransform: 'none',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
    },

    [`& .${classes.itemText}`]: {
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
        const {  items, onSelect, className, label } = this.props;
        const { selected } = this.state;
        return (
            <StyledGrid container className={className} >
                {label && <Typography>{label}</Typography>}
                <ButtonGroup>
                {items.map((item, index) => (
                    <Button key={index} className={selected === index ? classes.itemSelected : classes.item} onClick={() => {
                        if (this.state.selected === index) {
                            this.setState({ selected: -1 });
                            onSelect(-1);
                        }
                        else {
                            this.setState({ selected: index });
                            onSelect(index);
                        }
                    }}>
                        {item}
                        {false && <Typography className={classes.itemText}>{item}</Typography>}
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

