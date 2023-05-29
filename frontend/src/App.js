import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import axios from "axios";
import Picker from "./components/Picker";
import Recipe from "./components/Recipe";
import InputText from "./components/InputText";
import IngredientList from "./components/IngredientList";
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
    marginBottom: theme.spacing(6),
    textAlign: 'center',
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
  [`& .${PREFIX}-generate`] : {
    marginBottom: theme.spacing(4),
    textTransform: 'none',
  },
}));

function App() {
  const [otherText, setOtherText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [difficulty, setDifficulty] = useState(-1);
  const [cuisine, setCuisine] = useState(-1);
  const [time, setTime] = useState(-1);
  const difficultyOptions = ["Easy", "Medium", "Hard"];
  const cuisineOptions = ["American", "Chinese", "Indian", "Italian", "Mexican", "Thai"];
  const timeOptions = ["Quick", "Medium", "Long"];

  const generateText = async () => {
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
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_GPT_SERVER}/generate`,
        payload,
      );
      setGeneratedText(response.data.generated_text.choices[0].message.content);
    } catch (error) {
      console.error("Error generating text", error);
    }
    setLoading(false);
  };

  const addIngredient = (ingredient) => {
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
         && <IngredientList className={classes.ingredient_list} ingredients={ingredients} onDelete={removeIngredient} />}
        <Picker className={classes.difficulty} items={difficultyOptions} onSelect={setDifficulty} selected={difficulty}/>
        <Picker className={classes.cuisine} items={cuisineOptions} onSelect={setCuisine} selected={cuisine}/>
        <Picker className={classes.time} items={timeOptions} onSelect={setTime} selected={time}/>
        <InputText className={classes.other} text={otherText} onChange={setOtherText} label="Enter extra info" buttonDisabled noClearOnSubmit onSubmit={generateText} />
        <Button className={classes.generate} onClick={generateText} variant="contained" color="primary">Generate Recipe</Button>

        {loading && <CircularProgress />}
        {!loading && generatedText && <Recipe className={classes.recipe} text={generatedText} />}
      </Container>
    </Root>
  );
}

export default (App);

