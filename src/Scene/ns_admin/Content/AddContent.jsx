import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Paper, Select, MenuItem, TextField, Button, Box, Typography, Divider, Container, FormHelperText } from '@mui/material';

import Header from './ModifyContentHeader';

import BreadNav from '../../../Component/BreadNav';

import { contentTypes, messageTypes } from '../../../constant';

import { add_content, get_existed_content_type } from '../../../store/features/ns_admin.slice';

const input_labels = {
  "Title": "Title for these WhatNow Messages",
  "Description": "Description for these WhatNow Messages",
  "URL": "URL for more information about these WhatNow messages. Please include the protocol, i.e. http:// or https://",
}

const DynamicInputComponent = () => {
  const [inputs, setInputs] = useState([[[]], [[]], [[]], [[]], [[]], [[]]]);
  const [type, setType] = useState('0');
  const [contentExisted, setContentExisted] = useState([]);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const selected_society = queryParams.get('selectedSociety');
  const selected_language = queryParams.get('selectedLanguage');
  const selected_region = queryParams.get('selectedRegion');

  React.useEffect(() => {
    try {
      if (selected_society && selected_language && selected_region) {
        dispatch(get_existed_content_type({ society_id: selected_society, language_code: selected_language, region_id: selected_region })).then((response) => {
          const result = response.payload;
          console.log(result)
          if (result.status) {
            setContentExisted(result.data);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  const handleAddInput = (index) => {
    const newInputs = [...inputs];
    newInputs[index].push([]);
    setInputs(newInputs);
  };

  const handleInputChange = (index, inputIndex, event) => {
    const newInputs = [...inputs];
    newInputs[index][inputIndex] = [event.target.value];
    setInputs(newInputs);
  };

  const handleDeleteInput = (index, inputIndex) => {
    const newInputs = [...inputs];
    newInputs[index].splice(inputIndex, 1);
    setInputs(newInputs);
  };

  const handleTypeChange = () => (event) => {
    setType(event.target.value);
  };

  const validateURL = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ 
                               '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
                               '((\\d{1,3}\\.){3}\\d{1,3}))'+
                               '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
                               '(\\?[;&a-z\\d%_.~+=-]*)?'+
                               '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(url);
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [urlError, setUrlError] = useState(false);

  const handleTitleChange = (event) => {
    if (event.target.value === '') {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
    setTitle(event.target.value);
  };

  const handleDescrptionChange = (event) => {
    if (event.target.value === '') {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
    setDescription(event.target.value);
  };

  const handleUrlChange = (event) => {
    if (validateURL(event.target.value)) {
      setUrlError(false);
    } else {
      setUrlError(true);
    }
    setUrl(event.target.value);
  };

  const handleSubmission = () => {

    const content_type_selected = Object.keys(contentTypes).filter((key) => key === type)[0];
    const title_entered = title;
    const description_entered = description;
    const url_entered = url;
    const messages_entered = {}
    for (let i = 0; i < inputs.length; i++) {
      messages_entered[Object.keys(messageTypes)[i]] = []
      for (let j = 0; j < inputs[i].length; j++) {
        if (inputs[i][j][0] === undefined) {
          continue;
        }
        messages_entered[Object.keys(messageTypes)[i]].push(inputs[i][j][0]);
      }
    }

    const data = {
      society_id: selected_society,
      language_code: selected_language,
      region_id: selected_region,
      content_type: content_type_selected,
      title: title_entered,
      description: description_entered,
      url: url_entered,
      messages: messages_entered,
    }
    try {
      dispatch(add_content(data));
      window.location.href = '/ns_admin/content';
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container maxWidth={false} sx={{ minHeight: '100vh', width: 1500, paddingTop: 3 }}>
      <BreadNav
        path={
          [
            { path: '/', name: 'Home' },
            { path: '/ns_admin/content', name: 'WhatNow Content' },
            { path: '/ns_admin/content/addcontent', name: 'Add Content' }
          ]
        } 
      />
      <div style={{ marginTop: '16px' }}></div>
      <Header
        submit={handleSubmission} 
        text={"Add content"} 
        disabled={title === '' || description === '' || url === '' || titleError || descriptionError || urlError || type === '0'}
      />
      <Paper sx={{ padding: 2, marginBottom: 5 }}>
        <Box sx={{ padding: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>Select Hazard Type</Typography>
          <Select
            defaultValue="0"
            fullWidth
            sx={{
              mb: 2,
              border: '2px solid #ced4da',
              borderRadius: 4,
            }}
            value={type}
            onChange={handleTypeChange()}
          >
            <MenuItem value="0" sx={{ display: 'none' }}>Choose one below</MenuItem>
            {Object.keys(contentTypes).map((item, index) => (
              <MenuItem key={index} value={item} disabled={contentExisted.includes(item)}>
                {contentTypes[item]}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Typography variant="h3" >{Object.keys(input_labels)[0]}</Typography>
          <Typography variant="h6" sx={{ mb: 2, color: '#b3b3b3' }}>{input_labels[Object.keys(input_labels)[0]]}</Typography>
          <TextField value={title} onChange={(e) => handleTitleChange(e)} fullWidth />
          <FormHelperText style={{ fontSize: '1rem', color: titleError ? 'red' : 'inherit' }}>
              {titleError ? 'please enter a title' : ''}
          </FormHelperText>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h3" >{Object.keys(input_labels)[1]}</Typography>
          <Typography variant="h6" sx={{ mb: 2, color: '#b3b3b3' }}>{input_labels[Object.keys(input_labels)[1]]}</Typography>
          <TextField value={description} onChange={(e) => handleDescrptionChange(e)} fullWidth />
          <FormHelperText style={{ fontSize: '1rem', color: descriptionError ? 'red' : 'inherit' }}>
            {descriptionError ? 'please enter description' : ''}
          </FormHelperText>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h3" >{Object.keys(input_labels)[2]}</Typography>
          <Typography variant="h6" sx={{ mb: 2, color: '#b3b3b3' }}>{input_labels[Object.keys(input_labels)[2]]}</Typography>
          <TextField value={url} onChange={(e) => handleUrlChange(e)} fullWidth />
          <FormHelperText style={{ fontSize: '1rem', color: urlError ? 'red' : 'inherit' }}>
            {urlError ? 'please enter valid url. example: https://www.example.com' : ''}
          </FormHelperText>
        </Box>

        {inputs.map((paperInputs, index) => (
          <Paper key={index} sx={{ mb: 2, padding: 1, borderRight: '12px solid orange' }}>
            <Box sx={{ padding: 1 }}>
              <Typography variant="h3" >{Object.keys(messageTypes)[index].replace('_', ' ')}</Typography>
              <Typography variant="h6" sx={{ mb: 2, color: '#b3b3b3' }}>{messageTypes[Object.keys(messageTypes)[index]]}</Typography>
              <Divider sx={{ mb: 1 }} />
              <Button onClick={() => handleAddInput(index)} variant="contained" color="secondary" sx={{ fontWeight: 'bold', mt: 2, mb: 2 }}>Add Input</Button>
              {paperInputs.map((input, inputIndex) => (
                <Box key={inputIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TextField fullWidth value={input} onChange={(e) => handleInputChange(index, inputIndex, e)} />
                  <Button onClick={() => handleDeleteInput(index, inputIndex)} variant="contained" color="primary" sx={{ fontWeight: 'bold', mt: 2, mb: 2, ml: 2 }} >Delete</Button>
                </Box>
              ))}
            </Box>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
};

export default DynamicInputComponent;
