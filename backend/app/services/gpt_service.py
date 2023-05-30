from openai import ChatCompletion
from .utils import parse_recipe


def generate_text(query):
    messages = [
                {"role": "system", "content": "You are a helpful, expert chef with mastery of all culinary cuisines"},
                {"role": "user", "content": "I'm going to supply you with ingredients I want to use up. Please respond with the tastiest recipe you can think of, but it needs to use all the ingredients I specify and satisfy the other constraints I give you."},
                {"role": "user", "content": f"Ingredients to use: {', '.join(query.ingredients)}."},
                ]
    if query.difficulty:
        messages.append({"role": "user", "content": f"Difficulty: {query.difficulty}."})
    if query.cuisine:
        messages.append({"role": "user", "content": f"Cuisine: {query.cuisine}."})
    if query.time:
        messages.append({"role": "user", "content": f"Time: {query.time}."})
    if query.otherText:
        messages.append({"role": "user", "content": f"Extra Parameters: {query.otherText}."})
    prompt = """You don't need to confirm that you'd be happy to help, just respond in the following format. And replace anything in square brackets with the appropriate information. There can be many Ingredients and many recipe steps. Ingredients should start with a dash, -, unless it's a subtitle. Recipe should start with a number followed by a period, like 12., unless it's a subheader. Title, Ingredients, Recipe and subheaders must end in a colon, :. Brackets should never show up in the response.
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
    """
    messages.append({"role": "user", "content": prompt})

    response = ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
    )
    parsed_recipe = parse_recipe(response.choices[0].message.content)
    response.choices[0].message.content = parsed_recipe
    return response
