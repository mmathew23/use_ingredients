//React component to display a string of text that contains newlines.
// the component should display the text with newlines

import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@mui/material';

const PREFIX = 'Recipe';

const classes = {
    root: `${PREFIX}-root`,
    text: `${PREFIX}-text`
};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({
    [`&.${classes.root}`]: {
        // width: '100%',
        // height: '100%',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
        // alignItems: 'center',
    },

    [`& .${classes.text}`]: {
        // color: theme.palette.primary.contrastText,
        // fontSize: '1.5rem',
        // fontWeight: 'bold',
        // textAlign: 'center',
        // padding: '0.5rem',
    }
}));

class Text extends React.Component {
    render() {
        const {  text } = this.props;
        return (
            <StyledGrid container className={classes.root}>
                <Typography className={classes.text}>{text}</Typography>
            </StyledGrid>
        );
    }
}

Text.propTypes = {
    classes: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
};

export default (Text);
