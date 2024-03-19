import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Paper, TextField, Button, Box, Typography, Divider, Container, FormHelperText } from '@mui/material';

import Header from './ModifyContentHeader';

import BreadNav from '../../../Component/BreadNav';

import { get_content_message, get_content_by_id } from '../../../store/features/ns_admin.slice';
import { update_content, update_content_message } from '../../../store/features/ns_admin.slice';

import { messageTypes } from '../../../constant';

const input_labels = {
  "Title": "Title for these WhatNow Messages",
  "Description": "Description for these WhatNow Messages",
  "URL": "URL for more information about these WhatNow messages. Please include the protocol, i.e. http:// or https://",
}

const DynamicInputComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const [inputs, setInputs] = useState(Array.from({ length: Object.keys(messageTypes).length }, () => []));
  const [content_message, setContentMessage] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const content_id = queryParams.get('content_id');

  const [society_id, setSocietyId] = useState(null);
  const [region_id, setRegionId] = useState(null);
  const [language_code, setLanguageCode] = useState(null);
  const [content_type, setContentType] = useState(null);

  React.useEffect(() => {
    try {
      dispatch(get_content_by_id({ uuid: content_id })).then((response) => {
        const result = response.payload;
        if (result.status) {
          setTitle(result.data.title);
          setDescription(result.data.description);
          setUrl(result.data.url);

          setSocietyId(result.data.society_id);
          setRegionId(result.data.region_id);
          setLanguageCode(result.data.language_code);
          setContentType(result.data.content_type);
          
          dispatch(get_content_message({
            society_id: result.data.society_id,
            region_id: result.data.region_id,
            language_code: result.data.language_code,
            content_type: result.data.content_type
          })).then((response) => {
            const result = response.payload;
            if (result.status) {
              setContentMessage(result.data);
            }
          });
        }
      })
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  React.useEffect(() => {
    if (content_message !== null) {
      setInputs(Array.from({ length: Object.keys(messageTypes).length }, () => []));
      const type_keys = Object.keys(messageTypes);
      for (let i = 0; i < type_keys.length; i++) {
        for (let j = 0; j < content_message.length; j++) {
          if (type_keys[i] == content_message[j].type) {
            const newInputs = [...inputs];
            newInputs[i].push([content_message[j].content]);
            setInputs(newInputs);
          }
        }
      }
    }
  }, [content_message]);

  const handleAddInput = (index) => {
    const newInputs = [...inputs];
    newInputs[index].push([]);
    console.log(newInputs, index)
    setInputs(newInputs);
  };

  const handleInputChange = (index, inputIndex, event) => {
    const newInputs = [...inputs];
    newInputs[index][inputIndex] = [event.target.value];
    console.log(newInputs, index, inputIndex)
    setInputs(newInputs);
  };

  const handleDeleteInput = (index, inputIndex) => {
    const newInputs = [...inputs];
    newInputs[index].splice(inputIndex, 1);
    setInputs(newInputs);
  };



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

    const content_update_data = {
      uuid: content_id,
      title: title,
      description: description,
      url: url,
    }
    const message_update_data = {
      society_id: society_id,
      language_code: language_code,
      region_id: region_id,
      content_type: content_type,
      messages: messages_entered,
    }
    try {
      dispatch(update_content(content_update_data)).then((response) => {
        if (response.payload.status) {
          dispatch(update_content_message(message_update_data)).then((response) => {
            if (response.payload.status) {
              window.location.href = '/ns_admin/content';
            }
          });
        }
      });
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
            { path: '/ns_admin/content/editcontent', name: 'Edit Content' }
          ]
        } 
      />
      <div style={{ marginTop: '16px' }}></div>
      <Header
        submit={handleSubmission} 
        text={"Edit content"} 
        disabled={title === '' || description === '' || url === '' || titleError || descriptionError || urlError}
      />
      <Paper sx={{ padding: 2, marginBottom: 5 }}>
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
