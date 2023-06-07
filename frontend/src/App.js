import React, { useState, useEffect, useRef } from "react";
import { styled } from '@mui/material/styles';
import axios from "axios";
import Picker from "./components/Picker";
import Recipe from "./components/Recipe";
import InputText from "./components/InputText";
import IngredientChips from "./components/IngredientChips";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Container, Button, TextField } from "@mui/material";

const PREFIX = 'App';
const classes = {
    container: `${PREFIX}-container`,
    heading: `${PREFIX}-heading`,
    ingredient_input: `${PREFIX}-ingredient`,
    ingredient_list: `${PREFIX}-ingredient-list`,
    difficulty: `${PREFIX}-difficulty`,
    cuisine: `${PREFIX}-cuisine`,
    time: `${PREFIX}-time`,
    other: `${PREFIX}-other`,
    recipe: `${PREFIX}-recipe`,
    generate: `${PREFIX}-generate`,
};

const Root = styled('div')(( { theme }) => ( 
  {
    backgroundColor: '#fff',
    // textAlign: 'center',
    // textAlign: 'center',
  [`& .${PREFIX}-container`] : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100vh',
  },
  [`& .${PREFIX}-heading`] : {
    margin: theme.spacing(4),
    textAlign: 'center',
  },
  [`& .${PREFIX}-ingredient`] : {
    margin: theme.spacing(2),
  },
  [`& .${PREFIX}-ingredient-list`] : {
    margin: theme.spacing(2),
  },
  [`& .${PREFIX}-difficulty`] : {
    margin: theme.spacing(2),
  },
  [`& .${PREFIX}-cuisine`] : {
    margin: theme.spacing(2),
  },
  [`& .${PREFIX}-time`] : {
    margin: theme.spacing(2),
  },
  [`& .${PREFIX}-other`] : {
    margin: theme.spacing(2),
  },
  [`& .${PREFIX}-recipe`] : {
    margin: theme.spacing(2),
  },
  [`& .${PREFIX}-generate`] : {
    margin: theme.spacing(2),
  },
}));

function App() {
  const [otherText, setOtherText] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState({"title": "", "ingredients": {}, "ingredients_key_order": [], "recipe": {}, "recipe_key_order": [] });
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [difficulty, setDifficulty] = useState(-1);
  const [cuisine, setCuisine] = useState(-1);
  const [time, setTime] = useState(-1);
  const difficultyOptions = ["Easy", "Medium", "Hard"];
  const cuisineOptions = ["American", "Chinese", "Indian", "Italian", "Mexican", "Thai"];
  const timeOptions = ["Quick", "Medium", "Long"];
  const recipe_history = useRef([]);

  useEffect(() => {
    window.onpopstate = (e) => {
      if (e.state) {
        setGeneratedRecipe(e.state);
      }
    };
  }, []);


  const generateRecipe = async () => {
    const payload = {ingredients: ingredients, otherText: otherText}
    if (difficulty >= 0) {
      payload.difficulty = difficultyOptions[difficulty]
    }
    if (cuisine >= 0) {
      payload.cuisine = cuisineOptions[cuisine]
    }
    if (time >= 0) {
      payload.time = timeOptions[time]
    }
    if (recipe_history.current.length > 0) {
      payload.history = { "messages": recipe_history.current };
    }
    setLoading(true);
    try {
      //check if ingredients are empty and if so raise error
      if (ingredients.length === 0) {
        // Should handle error on the frontend better
        // right now user sees no message
        throw new Error("No ingredients entered");
      }
      const response = await axios.post(
        `${process.env.REACT_APP_GPT_SERVER}/generate`,
        payload,
      );
      setGeneratedRecipe(response.data.generated_text.choices[0].message.content);
      window.history.pushState({...response.data.generated_text.choices[0].message.content}, "");
      recipe_history.current.push({...payload, history: null});
      recipe_history.current.push(response.data.generated_text.choices[0].message.content);
    } catch (error) {
      console.error("Error generating text", error);
    }
    setLoading(false);
  };

  const addIngredient = (ingredient) => {
    // strip white space from beginning and end of ingredient
    ingredient = ingredient.trim();

    if (!ingredients.includes(ingredient) && ingredient !== "" ) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  return (
    <Root >
      <Container className={classes.container} maxWidth="lg">
        <Typography variant='h1' className={classes.heading}>Pantry Purge</Typography>
        <InputText text={""} onSubmit={addIngredient} label="Enter Ingredient" buttonText={"Add Ingredient"} className={classes.ingredient_input}/>
        { ingredients.length > 0
         && <IngredientChips className={classes.ingredient_list} ingredients={ingredients} onDelete={removeIngredient} />}
        <Picker className={classes.difficulty} items={difficultyOptions} onSelect={setDifficulty} selected={difficulty}/>
        <Picker className={classes.cuisine} items={cuisineOptions} onSelect={setCuisine} selected={cuisine}/>
        <Picker className={classes.time} items={timeOptions} onSelect={setTime} selected={time}/>
        <InputText className={classes.other} text={otherText} onChange={setOtherText} label="Enter extra info" buttonDisabled noClearOnSubmit onSubmit={generateRecipe} />
        <Button className={classes.generate} onClick={generateRecipe} variant="contained" size="large" color="primary">Generate Recipe</Button>

        {loading && <CircularProgress />}
        {!loading && generatedRecipe && <Recipe className={classes.recipe} recipe={generatedRecipe} />}
      </Container>
    </Root>
  );
}

export default (App);

