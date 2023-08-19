import { useContext } from 'react';
import { PdfNameContext, DownloadUrlContext } from '../Context.js';
import { Button } from 'react-bootstrap';

const DownloadButton = () => {
    const downloadUrl = useContext(DownloadUrlContext);
    const pdfName = useContext(PdfNameContext);
    const handleDownLoad = () => {
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = pdfName;
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
    return (
        <Button variant="secondary" className='mx-1' onClick={handleDownLoad} disabled={!downloadUrl}>Download Pdf</Button>
    );
};

export default DownloadButton;
