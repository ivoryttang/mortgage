file_path = 'output.txt'

# Read the file and store each line as an item in a list
with open(file_path, 'r') as file:
    lender_names = [line.strip() for line in file.readlines() if line.strip()]


# Convert each name into the format ('name'),
formatted_names = [f"('{name}')" for name in lender_names]

# Join the formatted names into a single string separated by commas
formatted_string = ",\n".join(formatted_names)

# Output the result to a file
with open("output.txt", "w") as file:
    file.write("INSERT INTO lenders (name) VALUES \n" + formatted_string + ";")