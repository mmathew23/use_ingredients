//React component to display a string of text that contains newlines.
// the component should display the text with newlines

import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Typography, Stack } from '@mui/material';

const PREFIX = 'Recipe';

const classes = {
    text: `${PREFIX}-text`
};

const StyledStack = styled(Stack)((
    {
        theme
    }
) => ({
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'left',
        padding: '0.5rem',
        maxWidth: '700px',
    [`& .${classes.text}`]: {
        fontSize: '1rem',
        textAlign: 'left',
    }
}));

class Text extends React.Component {
    render() {
        const {  text } = this.props;
        //React Typography Components from classes.text split by newlines
        const textComponents = text.split('\n').map((line, index) => {
            return (

                <Typography key={index} className={classes.text}>{line}</Typography>
            );
        });

        return (
            <StyledStack spacing={1} container className={classes.root}>

                {textComponents}
            </StyledStack>
        );
    }
}

Text.propTypes = {
    text: PropTypes.string.isRequired,
};

export default (Text);
