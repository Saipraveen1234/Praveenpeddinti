import sys
import importlib.util

def check_and_extract(pdf_path):
    # Check for PyPDF2
    if importlib.util.find_spec("PyPDF2"):
        try:
            from PyPDF2 import PdfReader
            reader = PdfReader(pdf_path)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            print("Successfully extracted using PyPDF2:")
            print(text[:2000]) # Limit output
            return
        except Exception as e:
            print(f"PyPDF2 failed: {e}")

    # Check for pypdf
    if importlib.util.find_spec("pypdf"):
        try:
            from pypdf import PdfReader
            reader = PdfReader(pdf_path)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            print("Successfully extracted using pypdf:")
            print(text[:2000])
            return
        except Exception as e:
            print(f"pypdf failed: {e}")
            
    print("No suitable PDF library found or extraction failed.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_pdf.py <path_to_pdf>")
    else:
        check_and_extract(sys.argv[1])
