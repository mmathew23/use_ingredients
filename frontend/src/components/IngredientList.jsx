//React Component that displays a list of ingredients
// as deletable Chips from the material ui library.

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid, Chip } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
    },
    chipLabel: {
        color: theme.palette.primary.contrastText,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '0.5rem',
    },
});

class IngredientList extends React.Component {
    
        constructor(props) {
            super(props);
            this.state = {
                ingredients: props.ingredients,
            };
        }
    
        render() {
            const { classes, ingredients, onDelete } = this.props;
            return (
                <Grid container className={classes.root}>
                    {ingredients.map((ingredient, index) => (
                        <Grid item key={index}>
                            <Chip
                                label={ingredient}
                                onDelete={() => onDelete(ingredient)}
                                className={classes.chip}
                                classes={{
                                    label: classes.chipLabel,
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            );
        }
    }

IngredientList.propTypes = {
    classes: PropTypes.object.isRequired,
    ingredients: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(IngredientList);
