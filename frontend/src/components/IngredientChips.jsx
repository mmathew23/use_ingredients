//React Component that displays a list of ingredients
// as deletable Chips from the material ui library.

import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Typography, Grid, Chip } from '@mui/material';

const PREFIX = 'IngredientChips';

const classes = {
    chip: `${PREFIX}-chip`,
    chipLabel: `${PREFIX}-chipLabel`
};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({
        // width: '100%',
        // height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // flexWrap: 'wrap',

    [`& .${classes.chip}`]: {
        // margin: theme.spacing.unit,
        // color: theme.palette.primary.contrastText,
        // backgroundColor: theme.palette.primary.main,
    },

    [`& .${classes.chipLabel}`]: {
        // color: theme.palette.primary.contrastText,
        // fontSize: '1.5rem',
        // fontWeight: 'bold',
        // textAlign: 'center',
        // padding: '0.5rem',
    }
}));

class IngredientChips extends React.Component {
    
        constructor(props) {
            super(props);
            this.state = {
                ingredients: props.ingredients,
            };
        }
    
        render() {
            const {  ingredients, onDelete, className } = this.props;
            return (
                <StyledGrid container className={className} spacing={2}>
                    {ingredients.map((ingredient, index) => (
                        <Grid item key={index}>
                            <Chip
                                label={ingredient}
                                onDelete={() => onDelete(ingredient)}
                                className={classes.chip}
                                classes={{
                                    label: classes.chipLabel,
                                }}
                                color="primary"
                            />
                        </Grid>
                    ))}
                </StyledGrid>
            );
        }
    }

IngredientChips.propTypes = {
    ingredients: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default (IngredientChips);
