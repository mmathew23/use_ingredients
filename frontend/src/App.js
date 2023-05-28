import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import axios from "axios";
import Picker from "./components/Picker";
import Recipe from "./components/Recipe";
import InputText from "./components/InputText";
import IngredientList from "./components/IngredientList";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Container, Button } from "@mui/material";

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
};

const Root = styled('div')(( { theme }) => ( 
  {
    backgroundColor: '#fff',
    textAlign: 'center',
  [`& .${PREFIX}-container`] : {
  },
  [`& .${PREFIX}-heading`] : {
    marginBottom: theme.spacing(6),
  },
  [`& .${PREFIX}-ingredient`] : {
    marginBottom: theme.spacing(4),
  },
  [`& .${PREFIX}-ingredient-list`] : {
    marginBottom: theme.spacing(4),
  },
  [`& .${PREFIX}-difficulty`] : {
    marginBottom: theme.spacing(4),
  },
  [`& .${PREFIX}-cuisine`] : {
    marginBottom: theme.spacing(4),
  },
  [`& .${PREFIX}-time`] : {
    marginBottom: theme.spacing(4),
  },
  [`& .${PREFIX}-other`] : {
    marginBottom: theme.spacing(4),
  },
  [`& .${PREFIX}-recipe`] : {
    marginBottom: theme.spacing(4),
  },
}));

function App() {
  const [otherText, setOtherText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [difficulty, setDifficulty] = useState(0);
  const [cuisine, setCuisine] = useState("American");
  const [time, setTime] = useState("Quick");
  const difficultyOptions = ["Easy", "Medium", "Hard"];
  const cuisineOptions = ["American", "Chinese", "Indian", "Italian", "Mexican", "Thai"];
  const timeOptions = ["Quick", "Medium", "Long"];
  const generateText = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_GPT_SERVER}/generate`,
        { ingredients: ingredients, otherText: otherText,
         difficulty: difficultyOptions[difficulty], cuisine: cuisineOptions[cuisine],
        time: timeOptions[time] }
      );
      setGeneratedText(response.data.generated_text.choices[0].message.content);
      console.log(response.data);
    } catch (error) {
      console.error("Error generating text", error);
    }
    setLoading(false);
  };

  const addIngredient = (ingredient) => {
    if (!ingredients.includes(ingredient)) {
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
        <InputText text={""} onSubmit={addIngredient} label="Enter Ingredients" buttonText={"Add Ingredient"} className={classes.ingredient_input}/>
        <IngredientList className={classes.ingredient_list} ingredients={ingredients} onDelete={removeIngredient} />
        <Picker className={classes.difficulty} items={difficultyOptions} onSelect={setDifficulty} selected={0}/>
        <Picker className={classes.cuisine} items={cuisineOptions} onSelect={setCuisine} selected={0}/>
        <Picker className={classes.time} items={timeOptions} onSelect={setTime} selected={0}/>
        <InputText className={classes.other} text={otherText} onSubmit={generateText} label="Enter extra info" buttonText={"Generate Recipe"}/>

        {loading && <CircularProgress />}
        {!loading && generatedText && <Recipe className={classes.recipe} text={generatedText} />}
      </Container>
    </Root>
  );
}

export default (App);

