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
        const {  title, ingredients, recipe } = this.props;
        //React Typography Components from ingredients
        // ingredients is a dictionary with the following keys and values:
        // {
        //     "ingredients_key_order": ['title1', title2', ...],
        //    "ingredients": {
        //        "title1": ['ingredient1', 'ingredient2', ...],
        //        "title2": ['ingredient1', 'ingredient2', ...],
        //        ...
        //    }
        // }
        const ingredientsComponents = ingredients.ingredients_key_order.map((title, index) => {
            const ingredientsL = ingredients[title].map((ingredient, subindex) => {
                return (
                    <Typography key={subindex}>{ingredient}</Typography>
                );
            });
            return (
                <StyledStack key={index}>
                    {title !== "unspecified" && <Typography variant="h6">{title}</Typography>}
                    <Typography>{ingredientsL}</Typography>
                </StyledStack>
            );
        });

        //React Typography Components from recipe
        // recipe is a dictionary with the following keys and values:
        // {
        //     "recipe_key_order": ['title1', title2', ...],
        //    "recipe": {
        //        "title1": ['step1', 'step2', ...],
        //        "title2": ['step1', 'step2', ...],
        //        ...
        //    }
        // }
        const recipeComponents = recipe.recipe_key_order.map((title, index) => {
            const recipeL = recipe[title].map((step, index) => {
                return (
                    <Typography key={index}>{step}</Typography>
                );
            });
            return (
                <StyledStack key={index}>
                    {title !== "unspecified" && <Typography variant="h6">{title}</Typography>}
                    <Typography>{recipeL}</Typography>
                </StyledStack>
            );
        });

        return (
            <StyledStack spacing={1} container className={classes.root}>
                <Typography variant="h4">{title}</Typography>
                {ingredientsComponents.length > 0 && <Typography variant="h5">Ingredients</Typography>}
                {ingredientsComponents}
                {recipeComponents.length > 0 && <Typography variant="h5">Recipe</Typography>}
                {recipeComponents}
            </StyledStack>
        );
    }
}

Text.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.object.isRequired,
    recipe: PropTypes.object.isRequired,
};

export default (Text);
