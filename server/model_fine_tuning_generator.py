import json 

# Read the original JSONL 
input_file_path = '../server/data/homelistings_fine_tuning.jsonl'
output_file_path = '../server/data/homelistings_chat_format.jsonl' 


def convert_to_chat_format(input_path, output_path): 
   with open(input_path, 'r') as infile, open(output_path, 'w') as outfile:

    
    for line in infile:
        # Load the original entry 
        entry = json.loads(line) 

    
    # Load the original entry 
    entry = json.loads(line) 
    
    # Prepare the chat format 
    messages = [ {"role": "system", "content": "You are a helpful assistant."}, 
                 {"role": "user", "content": f"Find listings with the following criteria: {entry['prompt']}"} ]
    
    # Add a placeholder for the assistant's completion 
    messages.append({"role": "assistant", "content": "This will be filled with the response during training."})
    
    # Write the formatted entry 
    json.dump({"messages": messages}, outfile)
    outfile.write('\n') 

    

# Convert the file 
convert_to_chat_format(input_file_path, output_file_path) 
print(f"Converted file saved as {output_file_path}")