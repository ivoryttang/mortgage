import requests

url = "https://api.retellai.com/create-retell-llm"

payload = {
    "general_tools": [
        {
        "type": "end_call",
        "name": "end_call",
        "description": "End the call with user only when user explicitly requests it."
        }
    ],
    "states": [{
        "name": "get_name",
        "state_prompt":"You will collect name of individual",
        "tools": [
                {
                    "type": "custom",
                    "name": "fill_name",
                    "url": "http://127.0.0.1:8000/fill_form",
                    "description": "When user mentions their name, fill out the corresponding field in the form",
                    "parameters": {
                        "type":"object",
                        "properties": {
                            # "input_field": {
                            #     "type": "string",
                            #     "description": "this will always be 'name'" 
                            # },
                            "input_value":{
                                "type": "string",
                                "description": "this will be whatever they say their name is" 
                            }
                        },
                        "required":["input_value"]
                    },
                    "speak_during_execution":False,
                    "speak_after_execution":False
                }
        ]
     },
    # {
    #     "name": "get_address",
    #     "state_prompt":"You will collect address of individual",
    #     "tools": [
    #             {
    #                 "type": "custom",
    #                 "name": "fill_address",
    #                 "url": "http://127.0.0.1:8000/fill_form",
    #                 "description": "When user mentions their address, fill out the corresponding field in the form",
    #                 "parameters": {
    #                     "type": "object",
    #                     "properties": {
    #                         "input_field": {
    #                             "type": "string",
    #                             "description": "this should be address"
    #                         },
    #                         "input_value": {
    #                             "type": "string",
    #                             "description": "get what the address of the user is"
    #                         }
    #                     },
    #                     "required": ["input_field", "input_values"]
    #                 },
    #                 "speak_during_execution":False,
    #                 "speak_after_execution":False
    #             }
    #     ]
    # }
    ],
    "starting_state":"get_name"
}
headers = {
    "Authorization": "Bearer 24aefdf4-cb00-4da2-809b-18747c9ff77d",
    "Content-Type": "application/json"
}

response = requests.request("POST", url, json=payload, headers=headers)

print(response.json())