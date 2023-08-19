import  { useState, useRef, useEffect, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import PdfSelector from './PdfSelector';
import { PdfByteUpdateContext, PdfNameContext, PdfNameUpdateContext, DownloadUrlContext } from '../Context'
import MainForm from './MainForm';
import { PDFTextField, PDFDropdown, PDFRadioGroup, PDFCheckBox } from '../constants'

function App() {
  const [pdfList, setPdfList] = useState([]);
  const [pdfBytes, setPdfBytes] = useState('')
  const [pdfName, setPdfName] = useState('');

  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});

  const [downloadUrl, setDownloadUrl] = useState(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null)
  const baseUrl = `http://localhost:5000`;
  const pdf__container__style = {
    height: '100vh', overflow: 'auto', position: 'relative'
  }
  const pdf__span__style = {
    position: 'absolute', left: '50%', color: 'red', fontWeight: 'bolder'
  };
  const pdf__canvas__style = {
    border: '1px solid black', display: 'none', width: '100%'
  };

  const fetchPdfList = useCallback(async () => {

    try {
      const response = await fetch(`${baseUrl}/pdf/list`);
      if (response.ok) {
        let result = await response.json()
        setPdfList(result.pdfList)
      } else {
        console.error('Failed to fetch PDF');
      }
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchPdfList();
  }, [fetchPdfList]);

  const renderForm = useCallback((fields) => {
    setFormFields(fields);
    const initialFormData = {};
    fields.forEach(field => {
      if (field.constructor.name === PDFTextField) {
        initialFormData[field.getName()] = field.getText() !== undefined ? field.getText() : '';
      }
      else if (field.constructor.name === PDFDropdown) {
        initialFormData[field.getName()] = field.getSelected()[0];
      }
      else if (field.constructor.name === PDFRadioGroup) {
        initialFormData[field.getName()] = field.getSelected();
      }
      else if (field.constructor.name === PDFCheckBox) {
        initialFormData[field.getName()] = field.isChecked();
      }
    })
    setFormData(initialFormData);
  }, [])

  const renderPDFCanvas = useCallback((url) => {
    if (url) {
      setError(null)
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
      pdfjsLib.getDocument(url).promise.then(pdf => {
        pdf.getPage(1).then(page => {
          const viewport = page.getViewport({ scale: 1 });
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          canvas.style.display = 'block';
          page.render({ canvasContext: context, viewport });
        });
      });
    }
  }, [])

  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    if (pdfList.length > 0 && pdfList.filter(pdf => pdf.name === file.name).length > 0) {
      // setPdfBytes(null);
      canvasRef.current.style.display = 'none';
      return setError(`Same name file already exists in database,
       so select this file from the database or upload file with different name ...`)
    }
    const data = await file.arrayBuffer();
    setPdfBytes(data)
    setPdfName(file.name)
    const pdfDoc = await PDFDocument.load(data);
    console.log(pdfDoc.getForm().getFields());
    const pdfBlob = new Blob([data], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    renderPDFCanvas(pdfUrl);
    renderForm(pdfDoc.getForm().getFields());
  }, [pdfList, renderForm, renderPDFCanvas]);

  const handleFormChange = useCallback(event => {
    setDownloadUrl(null)  //If form changes, then save first and then download pdf 
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value
    setFormData(prevData => ({ ...prevData, [name]: fieldValue }));
  }, []);

  const handleFormSubmit = useCallback(async () => {
    const form = new FormData();
    form.append('pdfFile', new Blob([pdfBytes], { type: 'application/pdf' }), pdfName);
    for (const data in formData) {
      form.append(data, formData[data])
    }
    const response = await fetch(`${baseUrl}/pdf/fill`, {
      method: "POST",
      body: form
    })
    if (response.ok) {
      const data = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(data);
      const pdfBlob = new Blob([data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setDownloadUrl(pdfUrl)
      renderPDFCanvas(pdfUrl);
      renderForm(pdfDoc.getForm().getFields());
      fetchPdfList();
    } else {
      console.error('Failed to fetch PDF');
    }
  }, [baseUrl, fetchPdfList, formData, pdfBytes, pdfName, renderForm, renderPDFCanvas])

  return (
    <PdfByteUpdateContext.Provider value={setPdfBytes}>
      <PdfNameContext.Provider value={pdfName}>
        <PdfNameUpdateContext.Provider value={setPdfName}>
          <DownloadUrlContext.Provider value={downloadUrl}>
            <div className='d-block d-md-flex px-1'>
              <div id='form__container'>
                <PdfSelector renderForm={renderForm} renderPDFCanvas={renderPDFCanvas} handleFileUpload={handleFileUpload} pdfList={pdfList} />
                {error ? <div style={{ color: 'red', marginLeft: '20px' }}>{error}</div> :
                  <MainForm formFields={formFields} formData={formData} handleFormChange={handleFormChange}
                    handleFormSubmit={handleFormSubmit} pdfName={pdfName} />}
              </div>

              <div style={pdf__container__style}>
                <span style={pdf__span__style}>Pdf Preview</span>
                <canvas style={pdf__canvas__style} ref={canvasRef} />
              </div>
            </div>
          </DownloadUrlContext.Provider>
        </PdfNameUpdateContext.Provider>
      </PdfNameContext.Provider>
    </PdfByteUpdateContext.Provider >
  );
}


export default App;
