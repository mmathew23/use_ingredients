from openai import ChatCompletion


def generate_text(query):
    response = ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful, expert chef with mastery of all culinary cuisines"},
                {"role": "user", "content": "I'm going to supply you with ingredients I want to use up. Please respond with the tastiest recipe you can think of, but it needs to use all the ingredients I specify and satisfy the other constraints I give you."},
                {"role": "user", "content": f"Ingredients to use: {', '.join(query.ingredients)}."},
                {"role": "user", "content": f"Difficulty: {query.difficulty}."},
                {"role": "user", "content": f"Cuisine: {query.cuisine}."},
                {"role": "user", "content": f"Time: {query.time}."},
                {"role": "user", "content": f"Extra Parameters: {query.otherText}."},
                ]
            )
    return response

