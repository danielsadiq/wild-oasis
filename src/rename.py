import os

def rename_jsx_to_tsx(folder_path):
    """
    Renames all .jsx files to .tsx in the specified folder.
    
    Args:
        folder_path (str): The path to the folder containing the files.
    """
    if not os.path.isdir(folder_path):
        print(f"Error: The provided path '{folder_path}' is not a valid directory.")
        return

    print(f"Scanning for .jsx files in '{folder_path}'...")
    
    count = 0
    for filename in os.listdir(folder_path):
        if filename.endswith(".jsx"):
            old_filepath = os.path.join(folder_path, filename)
            new_filename = filename.replace(".jsx", ".tsx")
            new_filepath = os.path.join(folder_path, new_filename)
            
            try:
                os.rename(old_filepath, new_filepath)
                print(f" Renamed '{filename}' to '{new_filename}'")
                count += 1
            except OSError as e:
                print(f" Failed to rename '{filename}': {e}")
                
    print(f"\n Renaming complete! {count} files were successfully renamed.")

# --- Usage Example ---
# Replace 'path/to/your/folder' with the actual path to your folder.
# For example, on Windows, it might be 'C:\\Users\\YourUser\\Desktop\\my_react_app'.
# On macOS/Linux, it might be '/Users/YourUser/Desktop/my_react_app'.
# folder_to_change = "C:\Users\hp\Desktop\Daniel\DANIEL 25\React\wild-oasis\src\pages" 
folder_to_change = r"C:\Users\hp\Desktop\Daniel\DANIEL 25\React\wild-oasis\src\features\settings"
rename_jsx_to_tsx(folder_to_change)