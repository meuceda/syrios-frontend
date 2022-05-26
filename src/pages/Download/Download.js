import React, {useEffect, useState} from 'react';
import { useFormik } from "formik"
import * as Yup from "yup"
import { Container, Row, Col, Alert} from 'react-bootstrap';
import axios from 'axios';
import { saveAs } from 'file-saver';

import Navbar from 'src/components/Navbar';
import LoadingPage from 'src/components/LoadingPage.js';
import Footer from 'src/components/Footer';
import createMarkup from 'src/utils/Markup.js';

import './Download.css';

function Download(){
  const [is_loading, set_is_loading] = useState(true);

  const [submitButton, setSubmitButton] = useState(false)
  const [show, setShow] = useState(false)

  const [title, set_title] = useState(undefined);
  const [text, set_text] = useState(undefined);
  const [image, set_image] = useState(undefined);

  const [emailSubject, setEmailSubject] = useState(undefined);
  const [emailTo, setEmailTo] = useState(undefined);

  useEffect(()=>{
    if(is_loading){
      axios.get(process.env.REACT_APP_strapiURL + '/api/download')
        .then((res)=>{
          set_title(res.data.data.attributes.title);
          set_text(res.data.data.attributes.text);
          set_image(res.data.data.attributes.image);
          setEmailSubject(res.data.data.attributes.emailSubject);
          setEmailTo(res.data.data.attributes.emailTo);
          set_is_loading(false);
        });
    }
  });

  const formik = useFormik({
    initialValues:{
      fullName:"",
      email:"",
    },
    validationSchema:Yup.object({
      fullName: Yup.string()
      .min(7, '* Names must have at least 7 characters')
      .max(30, "* Names can't be longer than 30 characters")
      .required('* Full name is required'),
      email:Yup.string()
      .email('* Must be a valid email address')
      .max(100, '* Email must be less than 100 characters')
      .required('* Email is required'),
    }),
    onSubmit: (values,{resetForm})=>{

      values.emailSubject=emailSubject
      values.emailTo=emailTo
      axios.post(process.env.REACT_APP_strapiURL + '/api/download', values)
        .then( resetForm())
        .then(setSubmitButton(true))
        .then(setShow(true))
        .catch(err =>{console.error(err)})
      
      saveAs(
        `${process.env.PUBLIC_URL}/uploads/Syrios_Coin_Data.zip`,
        // `http://localhost:1337/uploads/Syrios_Coin_Data.zip`,
        'Syrios_Coin_Data.zip'
      )
    }
  })

  if (is_loading) {
    return(
      <>
        <Navbar />
        <LoadingPage />
        <Footer />
      </>
    );
  }

  return(
    <>
      <Navbar />
      <div id='download-page' className='d-flex align-items-center'>
        <Container className='justify-content-sm-center my-5'>
            <Row>
                <Alert show={show} variant="success" onClose={() => setShow(false)} dismissible>
                    Data is downloading ...
                </Alert>
            </Row>
          <Row>
            <p className='blue-text text-center' id='download-title'>
              Download the Data 
            </p>
          </Row>
          <Row className='d-flex justify-content-between d-flex align-items-center'>
            <Col xs={8}>
              <div>
                {/* left */}
                <Row className='d-flex justify-content-between align-items-center'>
                  <Col xs={2} className='text-center'>
                    <i
                      className='demo-icon icon-coin-scale download-icon'
                    >
                      &#xe810;</i>
                  </Col>
                  <Col xs={9}>
                    <Row className='orange-text mb-3' id='download-sub-title'>
                      {title}
                    </Row>
                    <Row className='gray-text' id='download-sub-text'>
                      {/* {subText} */}
                      <div dangerouslySetInnerHTML={createMarkup(text)} />
                    </Row>
                  </Col>
                </Row>

                <Row className=''>
                  <img
                    alt={image.alternativeText === undefined ? 'img' : image.alternativeText}
                    className='frame-image'
                    src={`${process.env.REACT_APP_strapiURL}${image.data.attributes.url}`}
                  />
                </Row>
              </div>
            </Col>
            <Col xs={3}>
              <Container className='d-flex flex-column align-items-center'>
                <Row className='text-center gray-text'>
                    Please provide your your name and email address in the form below to start the download.
                </Row>
                <Row className='light-blue-background my-5 d-flex justify-content-center'>
                  <form className='mx-2 my-3 px-5' onSubmit={formik.handleSubmit}>
                    <div className='form-group mt-4'>
                      <label className='gray-text' htmlFor='fullName'>Full Name:</label>
                      <br/>
                      <input 
                        id = "fullName"
                        type='text'
                        onChange={formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.fullName}
                        className='form-control'
                      />
                      {formik.touched.fullName && formik.errors.fullName ? <p>{formik.errors.fullName}</p>: null}
                    </div>
                    <div className='form-group mt-4'>
                      <label className='gray-text' htmlFor='email'>Email:</label>
                      <br/>
                      <input 
                        type='email'
                        id='email'
                        onChange={formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.email}
                        className='form-control'
                      />
                      {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p>: null}
                    </div>

                    <div className='text-center mt-5'>
                      <button type='submit' disabled={!formik.isValid || submitButton}>
                        Submit
                      </button>
                    </div>
                  </form>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Download;
