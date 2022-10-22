from csv import reader
from pdfrw import PdfReader, PdfWriter
import eel
import io
import uuid

arrayBuffers = {}


@eel.expose
def savePdf(pdfInfos):
    writer_output = PdfWriter()
    output_file = "pls.pdf"

    for pdfInfo in pdfInfos:
        reader_input = PdfReader(io.BytesIO(arrayBuffers[pdfInfo["id"]]))
        pageToAdd = reader_input.pages[pdfInfo["originalPageIndex"]]
        writer_output.addpage(pageToAdd)
# Write the modified content to disk
    writer_output.write(output_file)
#reader_input = PdfReader(pdfPages)

@eel.expose 
def saveArrayBuffer(document) : 
    id = uuid.uuid4().hex
    arrayBuffers[id] = bytes(document)
    return id
    
eel.init('web', allowed_extensions=['.js', '.html'])


eel.start('index.html', size=(800, 600))




# from pdfrw import PdfReader, PdfWriter

# input_file = "Transcript_RyanLo_FR.pdf"


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
