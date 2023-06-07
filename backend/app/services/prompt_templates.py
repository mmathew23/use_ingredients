from .utils import unparse_recipe


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
    prompt = """You don't need to confirm that you'd be happy to help, just respond in the following format, and don't say you can help. Always respond in the below format, even if there is only one ingredient asked to use. And replace anything in square brackets with the appropriate information. There can be many Ingredients and many recipe steps. Ingredients should start with a dash, -, unless it's a subtitle. Recipe should start with a number followed by a period, like 12., unless it's a subheader. Title, Ingredients, Recipe and subheaders must end in a colon, :. Brackets should never show up in the response.
        Title: [Recipe Title]
        Ingredients:
        [Optional Subheader:]
        - [Quantity1] [Unit1] [Ingredient1] [ExtraInfo1]
        - [Quantity2] [Unit2] [Ingredient2] [ExtraInfo2]
        
        Recipe:
        [Optional Subheader:]
        1. [Step1]
        2. [Step2]
        3. [Step3]
        
        Here is an example of a query and valid response separated by a line break:
        Ingredients to use: chicken, rice, broccoli
        Difficulty: Easy
        Cuisine: Italian
        Time: Quick
        Extra Parameters: I'm allergic to peanuts

        Title: Spaghetti Carbonara
        Ingredients:
        - 12 oz. pancetta, cut into 1/4" pieces 
        - 1 tbsp. kosher salt
        - 10 cups water
        - 1 lb. spaghetti
        - 5 large egg yolks
        - l large egg
        - 4 oz. finely grated Peco Romano (about 2 cups)
        - 1/2 tsp. freshly ground black pepper
        Recipe:
        1. In a medium skillet over medium heat, cook pancetta, stirring occasionally, until golden brown and crispy, 20 to 25 minutes. Transfer pancetta to a paper towel-lined plate.
        2. Meanwhile, in a large pot, combine salt and 10 cups water and bring to a boil. Cook spaghetti, stirring occasionally, until al dente, 8 to 10 minutes; reserve 1/2 cup pasta water.
        3. While pasta cooks, in a large heatproof bowl, whisk egg yolks, egg, and cheese until just combined.
        4. Immediately transfer spaghetti to egg mixture. Add pancetta and 1/4 cup pasta water and stir, adding 2 to 4 tablespoons more pasta water if sauce seems too thick, until cheese is melted and sauce is smooth; season with pepper.

        Here is another example of a query and valid response seperated by a line break:
        Ingredients to use: ground beef, onion
        Difficulty: Medium
        Cuisine: American

        Title: Gourmet Patty Melt
        Ingredients:
        Burger:
        - 1 lb. ground beef (70/30)
        - 1 onion
        - 1 tbsp. olive oil
        - 1 tbsp. butter
        - 1 tbsp. sea salt
        - 1 tsp. black pepper
        - 1 tsp. sugar
        - 1 tsp. Worcestershire sauce
        - 1 tsp. balsamic vinegar
        - 4 pieces thick cut bacon
        - 4 slices American cheese
        Burger Sauce:
        - 1 tsp chives
        - 1 pickle
        - 3 tbsp. ketchup
        - 4 tbsp. Mayonnaise
        - 1 tsp. Dijon mustard
        - 1/2 tsp. hot sauce
        - 1/4 tsp sea salt
        - 1/4 tsp black pepper
        Recipe:
        Burger:
        1. Form beef into evenly sized meatballs approximately 120 grams each and set aside.
        2. Thinly slice onion and carmelize with olive oil, butter, sea salt, black pepper, and sugar on mediem heat for 30 minutes.
        3. Once onions are carmelized, add Worcestershire sauce and balsamic vinegar cook for another 5 minutes. Remove from heat and set aside.
        4. Cook bacon in a skillet over medium heat until crispy. Remove from heat, set aside, but leave some bacon fat to cook the patties.
        5. Increase heat of the pan until almost smoky, and add formed meatballs.
        6. Smash down meatballs with spatula and season with salt and pepper. Flip after 1.5 mins. You want a nicley carmelized crust on both sides.
        7. Once flipped add cheese and allow to melt for 30 seconds to 1 minute. Set patties aside.
        8. Assemble burger on bun with sauce, onions, bacon, and patties.
        Burger Sauce:
        1. Mince chives, and finely dice pickle. Set aside in mixing bowl.
        2. Mix ketchup, mayonnaise, Dijon mustard, hot sauce, sea salt, and black pepper in mixing bowl with chives and pickles.
    """
    user_prompt.append(prompt)
    messages[-1]["content"] = "\n".join(user_prompt)
    return messages


def history_prompt(query):
    messages = None
    for i, item in enumerate(query.history.messages):
        if i == 0:
            messages = initial_recipe_prompt(item)
        elif i % 2 == 1:
            # response prompt in format of app.models.chat.RecipeResponse
            prompt_response = unparse_recipe(item) 
            messages.append({"role": "assistant", "content": prompt_response})
        else:
            messages.append({"role": "user", "content": different_recipe_response_prompt(item)})
    messages.append({"role": "user", "content": different_recipe_response_prompt(query)})
    print(messages)
    return messages


def different_recipe_response_prompt(query):
    user_prompt = ["That's a great recipe, but I'd like to try something different. Please respond with a different recipe, and remember to follow the correct format. Here are the recipe parameters I want you to follow."]
    user_prompt.append(query_prompt(query))
    message = '\n'.join(user_prompt)
    return message
