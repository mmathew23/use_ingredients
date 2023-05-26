// React input text box component that allows user to enter text
// the component as a label, text box, and a button to submit the text

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid, TextField, Button } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    label: {
        color: theme.palette.text.primary,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '0.5rem',
    },
    textField: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textFieldInput: {
        color: theme.palette.text.primary,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '0.5rem',
    },
    textFieldInputFocused: {
        color: theme.palette.text.primary,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '0.5rem',
        borderColor: theme.palette.primary.main,
    },
    textFieldInputUnderline: {
        '&:after': {
            borderBottomColor: theme.palette.primary.main,
        },
    },
    button: {
        background: theme.palette.primary.main,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: theme.palette.primary.contrastText,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '0.5rem',
    },
});

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
            const { classes, label, onSubmit, buttonText } = this.props;
            const { text } = this.state;
            return (
                <Grid container className={classes.root}>
                    <Typography className={classes.label}>{label}</Typography>
                    <TextField
                        className={classes.textField}
                        InputProps={{
                            classes: {
                                root: classes.textFieldInput,
                                focused: classes.textFieldInputFocused,
                                underline: classes.textFieldInputUnderline,
                            },
                        }}
                        value={text}
                        onChange={this.handleChange('text')}
                    />
                    <Button
                        className={classes.button}
                        onClick={() => {
                            onSubmit(text);
                            this.setState({ text: '' });
                        }
                        }
                    >
                        <Typography className={classes.buttonText}>{buttonText}</Typography>
                    </Button>
                </Grid>
            );
        }
    }

InputText.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(InputText);

