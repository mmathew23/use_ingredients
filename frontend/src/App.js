import React, { useState } from "react";
import axios from "axios";
import Picker from "./components/Picker";
import Recipe from "./components/Recipe";
import InputText from "./components/InputText";
import IngredientList from "./components/IngredientList";
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ( {
  root: {
    color: theme.palette.text.primary,
  },
});

function App({classes}) {
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
    <div className={classes.root}>
      <h1>Use Up Your Pantry</h1>
      <InputText text={""} onSubmit={addIngredient} label="Enter Ingredients" buttonText={"Add Ingredients"}/>
      <IngredientList ingredients={ingredients} onDelete={removeIngredient} />
      <Picker items={difficultyOptions} onSelect={setDifficulty} selected={0}/>
      <Picker items={cuisineOptions} onSelect={setCuisine} selected={0}/>
      <Picker items={timeOptions} onSelect={setTime} selected={0}/>
      <InputText text={otherText} onSubmit={generateText} label="Enter extra info" buttonText={"Generate Recipe"}/>

      {loading && <CircularProgress />}
      {!loading && generatedText && <Recipe text={generatedText} />}
    </div>
  );
}

export default withStyles(styles)(App);

