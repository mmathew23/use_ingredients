from collections import defaultdict


def parse_recipe(recipe):
    recipe_dict = {}
    recipe_dict["title"] = recipe.split("\n")[0].split(":")[1].strip()
    recipe_dict["ingredients"] = defaultdict(list)
    recipe_dict["recipe"] = defaultdict(list)
    recipe_dict["ingredients_key_order"] = []
    recipe_dict["recipe_key_order"] = []
    ingredients = recipe.split("Ingredients:")[1].split("Recipe:")[0].strip().split("\n")
    current_key = "unspecified"
    for ingredient in ingredients:
        ingredient = ingredient.strip()

        if ":" in ingredient:
            if ingredient[0] != ':' and not ingredient[0].isalnum():
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
            if current_key not in recipe_dict["ingredients_key_order"]:
                recipe_dict["ingredients_key_order"].append(current_key)

    recipe_steps = recipe.split("Recipe:")[1].strip().split("\n")
    current_key = "unspecified"
    for step in recipe_steps:
        step = step.strip()
        if ":" in step[-1:]:
            if step[0] != ':' and not step[0].isalnum():
                step = step[1:]
            current_key = step.split(":")[0].strip()
        else:
            if "-" in step[0:1]:
                step_append = step[2:]
            else:
                step_append = step
            recipe_dict["recipe"][current_key].append(step_append)
            if current_key not in recipe_dict["recipe_key_order"]:
                recipe_dict["recipe_key_order"].append(current_key)

    return recipe_dict


def validate_recipe(recipe_dict):
    # valid keys
    keys = ["title", "ingredients", "recipe", "ingredients_key_order", "recipe_key_order"]
    for key in recipe_dict.keys():
        if key not in keys:
            return False

    for key in keys:
        if key not in recipe_dict.keys():
            return False

    # at this point all keys in the dict are valid    
    if len(recipe_dict["ingredients_key_order"]) != len(recipe_dict["ingredients"]) or len(recipe_dict["ingredients_key_order"]) == 0:
        return False
    if len(recipe_dict["recipe_key_order"]) != len(recipe_dict["recipe"]) or len(recipe_dict["recipe_key_order"]) == 0:
        return False
    if recipe_dict["title"] == "":
        return False
    for key in recipe_dict["ingredients"]:
        if len(recipe_dict["ingredients"][key]) == 0:
            return False
    for key in recipe_dict["recipe"]:
        if len(recipe_dict["recipe"][key]) == 0:
            return False
    return True


def unparse_recipe(recipe_dict):
    recipe_dict = recipe_dict.dict()
    if not validate_recipe(recipe_dict):
        raise ValueError("Invalid recipe dict")
    recipe = ""
    recipe += "Title: " + recipe_dict["title"] + "\n"
    recipe += "Ingredients:\n"
    for key in recipe_dict["ingredients_key_order"]:
        if key != "unspecified":
            recipe += key + ":\n"
        for ingredient in recipe_dict["ingredients"][key]:
            recipe += "- " + ingredient + "\n"
    recipe += "Recipe:\n"
    for key in recipe_dict["recipe_key_order"]:
        if key != "unspecified":
            recipe += key + ":\n"
        for step in recipe_dict["recipe"][key]:
            recipe += "- " + step + "\n"
    return recipe
