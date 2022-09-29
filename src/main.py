import eel
eel.init('web', allowed_extensions=['.js', '.html'])

@eel.expose
def test(data1):
  print(data1);  

eel.start('index.html',size=(800,600))


# from pdfrw import PdfReader, PdfWriter

# input_file = "Transcript_RyanLo_FR.pdf"
# output_file = "Transcript_updated.pdf"

# # Define the reader and writer objects
# reader_input = PdfReader(input_file)
# writer_output = PdfWriter()

# # Go through the pages one after the next
# for current_page in range(len(reader_input.pages)):
#     if current_page > 1:
#         writer_output.addpage(reader_input.pages[current_page])
#         print("adding page %i" % (current_page + 1))

# # Write the modified content to disk
# writer_output.write(output_file)