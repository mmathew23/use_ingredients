from .utils import unparse_recipe

RECIPE_FUNC = "create_food_from_recipe"
generate_recipe_function_prompt = [
    {
        "name": RECIPE_FUNC,
        "description": "Parse the recipe from the json output.",
        "parameters": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string",
                    "description": "The title of the recipe."
                },
                "ingredients": {
                    "type": "array",
                    "description": "The ingredients of the recipe structured as a list of sub-ingredients.",
                    "items": {
                        "type": "object",
                        "description": "A sub-ingredient list.",
                        "properties": {
                            "title": {
                                "type": ["string", "null"],
                                "description": "The title of the ingredient list. If only one ingredient list, the title can be null, but if more than one it should have a descriptive name.",
                            },
                            "list": {
                                "type": "array",
                                "description": "The list of ingredients.",
                                "items": {
                                    "type": "object",
                                    "description": "An ingredient with quantity, unit, ingredient, and modifier.",
                                    "properties": {
                                        "quantity": {"type": ["number", "string"], "description": "The quantity of the ingredient."},
                                        "unit": {"type": "string", "description": "The unit of the ingredient."},
                                        "ingredient": {"type": "string", "description": "The ingredient."},
                                        "modifier": {"type": "string", "description": "The modifier of the ingredient."},
                                    },
                                    "required": ["ingredient"],
                                    "additionalProperties": False,
                                    "minProperties": 2,
                                },
                                "minItems": 3,
                            },
                        },
                        "required": ["list", "title"],
                        "additionalProperties": False,
                    },
                    "minItems": 1,
                },
                "recipe": {
                    "type": "array",
                    "description": "The steps of the recipe structured as a list of sub-recipes steps corresponding to sub-ingredient list.",
                    "items": {
                        "type": "object",
                        "description": "A sub-recipe list of steps.",
                        "properties": {
                            "title": {
                                "type": ["string", "null"],
                                "description": "The title of the sub-recipe step list. If only one recipe list, the title can be null, but if more than one it should have a descriptive name.",
                            },
                            "list": {
                                "type": "array",
                                "description": "The list of sub-recipe steps.",
                                "items": {
                                    "type": "string",
                                    "description": "The next direction in the recipe."
                                },
                                "minItems": 2,
                            },
                        },
                        "required": ["list", "title"],
                        "additionalProperties": False,
                        "minProperties": 1,
                    },
                    "minItems": 1,
                },
            },
            "required": ["title", "ingredients", "recipe"],
            "additionalProperties": False,
        }
    }
]


def query_prompt(query):
    user_prompt = []
    user_prompt.append(f"I want to use up the following ingredients: {', '.join(query.ingredients)}")
    if query.difficulty:
        user_prompt.append(f"Difficulty: {query.difficulty}.")
    if query.cuisine:
        user_prompt.append(f"Cuisine: {query.cuisine}.")
    if query.time:
        user_prompt.append(f"Time: {query.time}.")
    if query.otherText:
        user_prompt.append(f"Extra Parameters: {query.otherText}.")
    return '\n'.join(user_prompt)


def initial_recipe_prompt(query):
    messages = [{"role": "system", "content": "You are a helpful, expert chef with mastery of all culinary cuisines"},
                {"role": "user", "content": None}]
    user_prompt = ["I'm going to supply you with ingredients I want to use up. Please respond with the tastiest recipe you can think of, but it needs to use all the ingredients I specify and satisfy the other constraints I give you."]
    user_prompt.append(query_prompt(query))
    prompt = """The recipes should be robust and delicious. The ingredients should be listed in order they appear in the recipe steps. There should not be an ingredient in the recipe steps that isn't listed in the ingredient list. The recipe steps should be concise but descriptive and using proper grammar. The recipe steps should be listed in order they should be performed. The sub ingredient titles and sub recipe titles shoudl be unique.
        Your response should be in JSON format because I am going to call a function to bring the recipe to life.
        Here are some examples to help guide your response.
        ---User---
        I want to use the following ingredients: chicken, rice, broccoli
        Difficulty: Easy
        Cuisine: Italian
        Time: Quick
        Extra Parameters: I'm allergic to peanuts
        ---Assistant---
        {"title": "Spaghetti Carbonara",
        "ingredients": [{"title": null,
                        "list": [{"quantity": 12, "unit": "oz.", "ingredient": "pancetta", "modifier": "cut into 1/4" pieces"},
                                {"quantity": 1, "unit": "tbsp.", "ingredient": "kosher salt", "modifier": null},
                                {"quantity": 10, "unit": "cups", "ingredient": "water", "modifier": null}, 
                                {"quantity": 1, "unit": "lb.", "ingredient": "spaghetti", "modifier": null},
                                {"quantity": 5, "unit": null, "ingredient": "large egg yolks", "modifier": null},
                                {"quantity": 1, "unit": null, "ingredient": "large egg", "modifier": null},
                                {"quantity": 4, "unit": "oz.", "ingredient": "Peco Romano", "modifier": "finely grated (about 2 cups)"},
                                {"quantity": "1/2", "unit": "tsp.", "ingredient": "black pepper", "modifier": "freshly ground"}
                        ],
                        },],
        "recipe": [{"title": null,
                    "list": ["In a medium skillet over medium heat, cook pancetta, stirring occasionally, until golden brown and crispy, 20 to 25 minutes. Transfer pancetta to a paper towel-lined plate.",
                            "Meanwhile, in a large pot, combine salt and 10 cups water and bring to a boil. Cook spaghetti, stirring occasionally, until al dente, 8 to 10 minutes; reserve 1/2 cup pasta water.",
                            "While pasta cooks, in a large heatproof bowl, whisk egg yolks, egg, and cheese until just combined.",
                            "Immediately transfer spaghetti to egg mixture. Add pancetta and 1/4 cup pasta water and stir, adding 2 to 4 tablespoons more pasta water if sauce seems too thick, until cheese is melted and sauce is smooth; season with pepper."],
                    },],
        }

        Here is another example of a query and valid response seperated by a line break:
        ---User---
        Ingredients to use: ground beef, onion
        Difficulty: Medium
        Cuisine: American
        ---Assistant---
        {"title": "Gourmet Patty Melt",
        "ingredients": [{"title": "Burger",
                        "list": [{"quantity": 1, "unit": "lb.", "ingredient": "ground beef", "modifier": "70/30 fat blend"},
                                {"quantity": 1, "unit": null, "ingredient": "onion", "modifier": null},
                                {"quantity": 1, "unit": "tbsp.", "ingredient": "olive oil", "modifier": null},
                                {"quantity": 1, "unit": "tbsp.", "ingredient": "butter", "modifier": null},
                                {"quantity": 1, "unit": "tbsp.", "ingredient": "sea salt", "modifier": null},
                                {"quantity": 1, "unit": "tsp.", "ingredient": "black pepper", "modifier": null},
                                {"quantity": 1, "unit": "tsp.", "ingredient": "sugar", "modifier": null},
                                {"quantity": 1, "unit": "tsp.", "ingredient": "Worcestershire sauce", "modifier": null},
                                {"quantity": 1, "unit": "tsp.", "ingredient": "balsamic vinegar", "modifier": null},
                                {"quantity": 4, "unit": "pieces", "ingredient": "thick cut bacon", "modifier": null},
                                {"quantity": 4, "unit": "slices", "ingredient": "American cheese", "modifier": null}
                        ],
                        },
                        {"title": "Burger Sauce",
                        "list": [{"quantity": 1, "unit": "tsp.", "ingredient": "chives", "modifier": null},
                                {"quantity": 1, "unit": null, "ingredient": "pickle", "modifier": null},
                                {"quantity": 3, "unit": "tbsp.", "ingredient": "ketchup", "modifier": null},
                                {"quantity": 4, "unit": "tbsp.", "ingredient": "mayonnaise", "modifier": null},
                                {"quantity": 1, "unit": "tsp.", "ingredient": "Dijon mustard", "modifier": null},
                                {"quantity": "1/2", "unit": "tsp.", "ingredient": "hot sauce", "modifier": null},
                                {"quantity": "1/4", "unit": "tsp.", "ingredient": "sea salt", "modifier": null},
                                {"quantity": "1/4", "unit": "tsp.", "ingredient": "black pepper", "modifier": null},

        "recipe": [{"title": null,
                    "list": ["Form beef into evenly sized meatballs approximately 120 grams each and set aside.",
                            "Thinly slice onion and add to a pan with olive oil and butter. Cook on medium heat until caramelized, about 20 minutes. Set aside.",
                            "In a bowl, combine salt, pepper, sugar, Worcestershire sauce, and balsamic vinegar. Mix well.",
                            "Add meatballs to bowl and mix until well combined. Form into patties and set aside.",
                            "Cook bacon in a pan until crispy. Set aside.",
                            "Cook patties in a pan on medium heat until desired doneness, about 4 minutes per side for medium.",
                            "Add cheese to patties and cook until melted.",
                            "Assemble patty melt by placing patty on a slice of bread, topping with caramelized onions, bacon, and burger sauce. Top with another slice of bread and enjoy!"],
                    },
                    {"title": "Burger Sauce",
                    "list": ["Mince chives, and finely dice pickle. Set aside in mixing bowl.",
                             "Mix ketchup, mayonnaise, Dijon mustard, hot sauce, sea salt, and black pepper in mixing bowl with chives and pickles."],
                    }
            ],
        }
    """

    user_prompt.append(prompt)
    messages[-1]["content"] = "\n".join(user_prompt)
    return {
        'messages': messages,
        'functions': generate_recipe_function_prompt,
        'function_call': {'name': RECIPE_FUNC}
    }


def history_prompt(query):
    # Unclear if I need to show the history of the chat with functions and function_call
    # Will currently not show them in hopes of saving some tokens
    messages = None
    for i, item in enumerate(query.history.messages):
        if i == 0:
            messages = initial_recipe_prompt(item)['messages']
        elif i % 2 == 1:
            # response prompt in format of app.models.chat.RecipeResponse
            prompt_response = item.json()
            messages.append({"role": "assistant", "content": prompt_response})
        else:
            messages.append({"role": "user", "content": different_recipe_response_prompt(item)})
    messages.append({"role": "user", "content": different_recipe_response_prompt(query)})
    return {
        'messages': messages,
        'functions': generate_recipe_function_prompt,
        'function_call': {'name': RECIPE_FUNC}
    }


def different_recipe_response_prompt(query):
    user_prompt = ["That's a great recipe, but I'd like to try something different. Please respond with a different recipe, and remember to follow the correct format. Here are the recipe parameters I want you to follow."]
    user_prompt.append(query_prompt(query))
    message = '\n'.join(user_prompt)
    return message
