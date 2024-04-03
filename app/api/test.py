######################### EXA SEARCH  #########################
from exa_py import Exa
import textwrap
import openai
import os
import json
import requests

EXA_API_KEY= "921e8f7b-2af9-41eb-a138-dfc5d418d547"

with open('url.txt') as url_file, open('output.txt') as output_file:
    url_lines = url_file.readlines()
    output_lines = output_file.readlines()

all_contents = ""
exa = Exa(api_key=EXA_API_KEY)
# for url in zip(url_lines):
query = "Get the lender_type, loan_product, term,apr,upfront_costs,loan_amount,rating,avg_time_to_close for the lender with url https://www.velocitymortgage.com/mortgage-programs/"

# Execute a search
# search_response = exa.search_and_contents(query, num_results=1, use_autoprompt=True)
company = 'Rocket Pro TPO'
url = 'https://www.rocketprotpo.com/mortgage-products/'
# for i in range(194):
search_response = exa.search_and_contents(
    url,#url_lines[i], 
    type="keyword",
    num_results=1
)
research_response = search_response.results
for r in research_response:
    if r is not None:
        all_contents += r.text
print(all_contents)


    ## get json from openai


schema = {
    "type": "object",
    "properties":{
    "lender_info":{
        "type": "array",
        "items":{
            "type": "object",
            "properties": {
                "lender_type": {
                    "type":"string",
                    "description":"this can be a bank, direct lender, government, or other type of lender"
                },
                "loan_product":{"type":"array",
                    "description":"list of different loan products offered, ie FHA, Conventional, VA"
                },
                "term":{"type":"array",
                    "description":"list of different loan terms they offer, ie 15 or 30 year"
                },
                "apr":{"type":"number",
                    "description":"best interest rate this lender offers"
                },
                "upfront_costs":{"type":"array",
                    "description":"lower and upper bound of any upfront costs this lender charges"
                },
                "loan_amount":{"type":"array",
                    "description":"lower and upper bound of typical loan amount for this lender"
                },
                "rating":{"type":"number",
                    "description":"how highly rated this lender seems"
                },
                "avg_time_to_close":{"type":"number",
                    "description":"how long it typically takes to close the loan in days"
                }
            },
            "required": ["lender_type", "loan_product", "term","apr","upfront_costs","loan_amount","rating","avg_time_to_close"]
            }
        }
    }
}




SYSTEM_MESSAGE = "You are a helpful assistant doing research on a lender. Get information about the lender based on information provided."
openai.api_key = "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"

    ## PERPLEXITY


perplexity_url = "https://api.perplexity.ai/chat/completions"

# payload = {
#     "model": "mistral-7b-instruct",
#     "messages": [
#         {
#             "role": "system",
#             "content": "Be precise and concise."
#         },
#         {
#             "role": "user",
#             "content": "How many stars are there in our galaxy?"
#         }
#     ]
# }
# headers = {
#     "accept": "application/json",
#     "content-type": "application/json"
# }

# response = requests.post(perplexity_url, json=payload, headers=headers)

# print(response.text)

try:
    completion = openai.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": SYSTEM_MESSAGE},
            {"role": "user", "content": all_contents},
        ],
        functions=[{"name": "get_lender_info_json", "parameters": schema}],
        function_call={"name": "get_lender_info_json", "parameters": {}}
    )
    print("tada")
    summary = completion.choices[0].message.function_call.arguments
    print("summary",summary)
except:
    print("error")#continue
final = []
try:
    loaded = json.loads(summary)['lender_info']
    
    for item in loaded:
        final += [[output_lines[0], url_lines[0]] + list(item.values())]
    print(final)
except:
    print("final error")
    pass#continue


# with open('test.txt', 'w') as file:
#     file.write(final)

######################### file processing  #########################
# with open('url.txt') as url_file, open('output.txt') as output_file:
#     url_lines = url_file.readlines()
#     output_lines = output_file.readlines()

# # Update values in the table based on conditions
# final = ""
# for url, output in zip(url_lines, output_lines):
#     final += f"WHEN '{output}' THEN '{url}'" 
    
# with open('test.txt', 'w') as file:
#     file.write(final)

