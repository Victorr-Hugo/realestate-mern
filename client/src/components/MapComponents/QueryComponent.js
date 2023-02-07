import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import bathroom_icon from '../../resources/bathroom-icon.png';
import beedroom_icon from '../../resources/bedroom-icon.png';
import { useListings } from '../../context/listingContext';

const QueryComponent = () => {
    const { getQueryResults, getListings } = useListings();
    const [listings, setListings] = useState([]);


  return (
    <div>
        
    </div>
  )
}

export default QueryComponent