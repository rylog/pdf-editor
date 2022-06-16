import eel
eel.init('web', allowed_extensions=['.js', '.html'])
eel.start('index.html',
                        size=(800,600), 
                        )

from pdfrw import PdfReader, PdfWriter

input_file = "Transcript_RyanLo_FR.pdf"
output_file = "Transcript_updated.pdf"

reader_input = PdfReader(input_file)
writer_output = PdfWriter()
