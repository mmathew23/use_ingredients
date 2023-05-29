from openai import ChatCompletion


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


    response = ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
    )
    return response
