//React component to display a string of text that contains newlines.
// the component should display the text with newlines

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        color: theme.palette.primary.contrastText,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '0.5rem',
    },
});

class Text extends React.Component {
    render() {
        const { classes, text } = this.props;
        return (
            <Grid container className={classes.root}>
                <Typography className={classes.text}>{text}</Typography>
            </Grid>
        );
    }
}

Text.propTypes = {
    classes: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
};

export default withStyles(styles)(Text);
