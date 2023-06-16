from openai import ChatCompletion
from .utils import parse_recipe
from .prompt_templates import initial_recipe_prompt, history_prompt
from fastapi.responses import JSONResponse
import json

MAX_RETRIES = 2
def generate_text(query, current_try=1):
    if current_try > MAX_RETRIES:
        return JSONResponse(status_code=400, content={"message": "Failed to generate text. Exceeded max retries"})
    if query.history:
        prompt = history_prompt(query)
    else:
        prompt = initial_recipe_prompt(query)
    messages, function_call, functions = prompt['messages'], prompt['function_call'], prompt['functions']
    try:
        response = ChatCompletion.create(
            # model="gpt-3.5-turbo-16k-0613",  # After June 27th change to gpt-3.5-turbo since it will default to 0613
            model="gpt-3.5-turbo-0613",  # After June 27th change to gpt-3.5-turbo since it will default to 0613
            messages=messages,
            function_call=function_call,
            functions=functions,
        )
    except Exception as e:
        print(e)
        query.history = None
        return generate_text(query, current_try + 1)
    if response.choices[0].finish_reason == "length":
        query.history = None
        return generate_text(query, current_try + 1)
    if 'function_call' not in response.choices[0].message:
        return JSONResponse(status_code=400, content={"message": "Invalid response from openai"})
    try:
        json_string = json.loads(response.choices[0].message.function_call.arguments)
    except Exception:
        return generate_text(query, current_try + 1)

    print(response)
    response.choices[0].message.query = query
    response.choices[0].message.function_call.arguments = json_string
    return response
