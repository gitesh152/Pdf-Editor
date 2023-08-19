import { useContext } from 'react'
import { PDFDocument } from 'pdf-lib';
import { PdfByteUpdateContext, PdfNameUpdateContext } from '../Context'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types';

const PdfSelector = ({ renderForm, renderPDFCanvas, handleFileUpload, pdfList }) => {

    const setPdfBytes = useContext(PdfByteUpdateContext);
    const setPdfName = useContext(PdfNameUpdateContext);
    const baseUrl = `http://localhost:5000`;
    const fetchPdf = async (event) => {
        try {
            if (event.target.value === '0') return;
            const response = await fetch(`${baseUrl}/pdf/single/${event.target.value}`, {
            });
            if (response.ok) {
                const { data, fileName } = await response.json()
                const arrayBuffer = new ArrayBuffer(data.data.length);
                const uint8Array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < data.data.length; i++) {
                    uint8Array[i] = data.data[i];
                }
                setPdfBytes(uint8Array)
                setPdfName(fileName)
                const pdfDoc = await PDFDocument.load(uint8Array);
                const pdfBlob = new Blob([uint8Array], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfBlob);
                console.log(pdfDoc.getForm().getFields());
                renderPDFCanvas(pdfUrl);
                renderForm(pdfDoc.getForm().getFields());
            } else {
                console.error('Failed to fetch PDF');
            }
        } catch (error) {
            console.error('Error fetching PDF:', error);
        }
    };
    return (
        <div className='p-2'>
            <Form.Group className="d-block d-sm-flex mb-3">
                <Form.Control type="file" name='pdfFile' accept=".pdf" onChange={handleFileUpload} />
                <Form.Select onChange={fetchPdf}>
                    <option value='0'>-- Select PDF from Database --</option>
                    {pdfList.length > 0 && pdfList.map((pdf, i) => {
                        return <option key={i} value={pdf.value} >{pdf.name}</option>
                    })}
                </Form.Select>
            </Form.Group>
        </div>
    )
}

PdfSelector.propTypes = {
    renderForm:PropTypes.func.isRequired, 
    renderPDFCanvas:PropTypes.func.isRequired, 
    handleFileUpload:PropTypes.func.isRequired, 
    pdfList:PropTypes.array.isRequired
}
export default PdfSelector
