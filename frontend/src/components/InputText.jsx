// React input text box component that allows user to enter text
// the component as a label, text box, and a button to submit the text

import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Typography, Stack, TextField, Button } from '@mui/material';

const PREFIX = 'InputText';

const classes = {
    root: `${PREFIX}-root`,
    label: `${PREFIX}-label`,
    textField: `${PREFIX}-textField`,
    button: `${PREFIX}-button`,
    buttonText: `${PREFIX}-buttonText`
};

const StyledStack = styled(Stack)((
    {
        theme
    }
) => ({
        // width: '100%',
        // height: '100%',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
        alignItems: 'center',

    [`& .${classes.label}`]: {
        // color: theme.palette.text.primary,
        // fontSize: '1.5rem',
        // fontWeight: 'bold',
        // textAlign: 'center',
        // padding: '0.5rem',
    },

    [`& .${classes.textField}`]: {
        // width: '100%',
        // height: '100%',
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    [`& .${classes.button}`]: {
        // background: theme.palette.primary.main,
        // width: '100%',
        // height: '100%',
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
    },

    [`& .${classes.buttonText}`]: {
        color: theme.palette.primary.contrastText,
        // fontSize: '1.5rem',
        // fontWeight: 'bold',
        // textAlign: 'center',
        // padding: '0.5rem',
        textTransform: 'none',
    }
}));

class InputText extends React.Component {
        
        constructor(props) {
            super(props);
            this.state = {
                text: props.text,
            };
        }
    
        handleChange = name => event => {
            this.setState({
                [name]: event.target.value,
            });
        };
    
        render() {
            const {  label, onSubmit, buttonText, className } = this.props;
            const { text } = this.state;
            return (
                <StyledStack direction='column' spacing={1} className={className}>
                    <TextField
                        size="small"
                        value={text}
                        onChange={this.handleChange('text')}
                        label={label}
                    />
                    <Button
                        onClick={() => {
                            onSubmit(text);
                            this.setState({ text: '' });
                        }
                        }
                        variant="contained"
                    >
                        <Typography className={classes.buttonText}>{buttonText}</Typography>
                    </Button>
                </StyledStack>
            );
        }
    }

InputText.propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default (InputText);

