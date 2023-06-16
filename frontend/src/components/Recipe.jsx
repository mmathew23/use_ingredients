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
        const {title, ingredients, recipe } = this.props.recipe;
        //unpack this.props.recipe
        // title is a string
        // recipe is an array of objects
        // each object has a title and an array of steps named list


        // ingredients is an array of objects
        // each object has a title and an array of ingredients named list
        // iterate through each ingredient and create a stylestack and typography for each  
        console.log('temp', this.props.recipe  );
        console.log('title', this.props.recipe.title);
        console.log('recipe', this.props.recipe.recipe);
        console.log('ingredients', this.props.recipe.ingredients);
        const ingredientsComponents = ingredients.map((subIngredient, index) => {
            const ingredientsL = subIngredient.list.map((ingredient, subindex) => {
                return (
                    <Typography key={subindex}>{ingredient.quantity} {ingredient.unit} {ingredient.ingredient} {ingredient.modifier}</Typography>
                );
            });
            return (
                <StyledStack key={index}>
                    {subIngredient.title !== null && <Typography variant="h6">{subIngredient.title}</Typography>}
                    <Typography>{ingredientsL}</Typography>
                </StyledStack>
            );
        });

        const recipeComponents = recipe.map((subRecipe, index) => {
            const recipeL = subRecipe.list.map((step, index) => {
                return (
                    <Typography key={index}>{index+1}. {step}</Typography>
                );
            });
            return (
                <StyledStack key={index}>
                    {subRecipe.title !== null && <Typography variant="h6">{title}</Typography>}
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
