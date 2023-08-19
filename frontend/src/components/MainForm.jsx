// import React from 'react'
import DownloadButton from './DownloadButton'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types';
import { PDFTextField, PDFDropdown, PDFRadioGroup, PDFCheckBox } from '../constants'

const MainForm = ({ formFields, formData, handleFormChange, handleFormSubmit }) => {
    return (
        <div id='main__form' className='p-1'>
            {formFields.length > 0 &&
                <>
                    {formFields?.map((field, i) => (<div className='border border-1 my-1 d-flex justify-content-between' key={`${field} - ${i}`}>
                        <label className='' htmlFor={field.getName()}>{field.getName()} :&nbsp;</label>
                        {field.constructor.name === PDFTextField
                            ? (
                                <input
                                    className=''
                                    type={'text'}
                                    name={field.getName()}
                                    value={formData[field.getName()]}
                                    onChange={handleFormChange}
                                />
                            ) : field.constructor.name === PDFDropdown ? (
                                <select
                                    name={field.getName()}
                                    value={formData[field.getName()]}
                                    onChange={handleFormChange}
                                >
                                    {field.getOptions().map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            ) : field.constructor.name === PDFRadioGroup
                                ? (<div>
                                    {field.getOptions().map((option, index) => (
                                        <span key={index} className='ms-1'>
                                            <input
                                                type="radio"
                                                name={field.getName()}
                                                value={option}
                                                checked={formData[field.getName()] === option}
                                                onChange={handleFormChange}
                                            />
                                            <label>{option}</label>
                                        </span>
                                    ))}
                                </div>)
                                : field.constructor.name === PDFCheckBox
                                    ? (
                                        <input
                                            type="checkbox"
                                            name={field.getName()}
                                            checked={formData[field.getName()] === true}
                                            onChange={handleFormChange}
                                        />
                                    )
                                    : (<div>Some Other Field ...</div>)}
                    </div>))}
                    <Button onClick={handleFormSubmit}>Save Pdf</Button>
                    <DownloadButton />
                </>
            }
        </div>
    )
}

MainForm.propTypes = {
    formFields: PropTypes.array.isRequired, // Define the prop and its type
    formData:PropTypes.object.isRequired,
    handleFormChange:PropTypes.func.isRequired, 
    handleFormSubmit:PropTypes.func.isRequired
  };

export default MainForm
