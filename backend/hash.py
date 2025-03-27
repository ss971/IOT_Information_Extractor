import hashlib
import sys

def hash_file(filepath, algorithm="sha256"):
    """
    Computes the hash of a file using the specified algorithm (default: sha256).

    Args:
        filepath (str): The path to the file.
        algorithm (str): The hashing algorithm to use (e.g., 'sha256', 'md5', etc.)

    Returns:
        str: The hexadecimal hash digest.
    """
    try:
        hasher = hashlib.new(algorithm)
    except ValueError:
        print(f"Error: Unsupported hash algorithm: {algorithm}")
        return None

    with open(filepath, "rb") as f:
        # Read the file in chunks to avoid loading the entire file into memory
        chunk_size = 8192
        while chunk := f.read(chunk_size):
            hasher.update(chunk)
    return hasher.hexdigest()

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python hash_file.py <file_path>")
        sys.exit(1)
    
    filepath = sys.argv[1]
    file_hash = hash_file(filepath)
    if file_hash:
        print(f"SHA-256 hash of {filepath}:")
        print(file_hash)
