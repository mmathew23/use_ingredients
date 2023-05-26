// React component for a picker that allow the user to select one item from a list of items.
// The picker is a horizontal selector that highlight the selected item.

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    itemSelected: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
    },
    itemText: {
        color: theme.palette.primary.contrastText,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '0.5rem',
    },
});

class Picker extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected,
        };
    }

    render() {
        const { classes, items, onSelect } = this.props;
        const { selected } = this.state;
        return (
            <Grid container className={classes.root}>
                {items.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index} className={selected === index ? classes.itemSelected : classes.item} onClick={() => {
                        this.setState({ selected: index });
                        onSelect(index);
                    }}>
                        <Typography className={classes.itemText}>{item}</Typography>
                    </Grid>
                ))}
            </Grid>
        );
    }
}

Picker.propTypes = {
    classes: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(Picker);

