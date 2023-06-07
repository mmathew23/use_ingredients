from openai import ChatCompletion
from .utils import parse_recipe
from .prompt_templates import initial_recipe_prompt, history_prompt


def generate_text(query):
    if query.history:
        messages = history_prompt(query)
    else:
        messages = initial_recipe_prompt(query)
    print(len(messages))
    response = ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
    )
    parsed_recipe = parse_recipe(response.choices[0].message.content)
    response.choices[0].message.content = parsed_recipe
    response.choices[0].message.query = query
    return response
