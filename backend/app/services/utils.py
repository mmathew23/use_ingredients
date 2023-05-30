#python function to parse the following recipe format
        # Title: [Recipe Title]
        # Ingredients:
        # Optional Subheader:
        # - [Quantity1] [Unit1] [Ingredient1] [ExtraInfo1]
        # - [Quantity2] [Unit2] [Ingredient2] [ExtraInfo2]
        
        # Recipe:
        # Optional Subheader:
        # - 1. [Step1]
        # - 2. [Step2]
        # - 3. [Step3]

from collections import defaultdict

# check if string is alpha numeric
def isalphanum(s):
    return s.isalnum()

def parse_recipe(recipe):
    print(recipe.split("\n"))
    recipe_dict = {}
    recipe_dict["title"] = recipe.split("\n")[0].split(":")[1].strip()
    recipe_dict["ingredients"] = defaultdict(list)
    recipe_dict["recipe"] = defaultdict(list)
    ingredients = recipe.split("Ingredients:")[1].split("Recipe:")[0].strip().split("\n")
    current_key = "unspecified"
    for ingredient in ingredients:
        ingredient = ingredient.strip()

        if ":" in ingredient:
            if ingredient[0]!= ':' and not ingredient[0].isalnum():
                ingredient = ingredient[1:]
            current_key = ingredient.split(":")[0].strip()
        else:
            if "-" in ingredient:
                ingredient_append = ingredient[2:]
            else:
                # if here ingredient format from gpt is not correct but include anyway
                print("ingredient format from gpt is not correct")
                ingredient_append = ingredient
            recipe_dict["ingredients"][current_key].append(ingredient_append)
            if current_key not in recipe_dict["ingredients"]["ingredients_key_order"]:
                recipe_dict["ingredients"]["ingredients_key_order"].append(current_key)

    recipe_steps = recipe.split("Recipe:")[1].strip().split("\n")
    current_key = "unspecified"
    for step in recipe_steps:
        step = step.strip()
        if ":" in step[-1:]:
            if step[0]!= ':' and not step[0].isalnum():
                step = step[1:]
            current_key = step.split(":")[0].strip()
        else:
            if "-" in step[0:1]:
                step_append = step[2:]
            else:
                step_append = step
            recipe_dict["recipe"][current_key].append(step_append)
            if current_key not in recipe_dict["recipe"]["recipe_key_order"]:
                recipe_dict["recipe"]["recipe_key_order"].append(current_key)

    print(recipe_dict)
    return recipe_dict
