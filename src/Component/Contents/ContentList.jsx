import React from 'react';
import { Paper, Grid, Button, Typography, Divider, Pagination, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Alert, Collapse } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/hooks/useDispatch";

import { messageTypes, contentTypes } from "../../constant";

import ContentGrid from './ContentGrid';

import { get_content_message, is_content_init, update_content_message, update_content, add_content, publish, stop_publish } from '../../store/features/ns_admin.slice';

import { csv_data_generator, generateAndEncryptId } from '../Bulk/csv_data_generator';
import { decryptId, file_format_check, data_reorganizor } from '../Bulk/csv_data_extractor';

const LargePaperWithRows = ({content, selectedSociety, selectedLanguage, selectedRegion, pathDirect}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [contentList, setContentList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  React.useEffect(() => {
    if (content != [] && selectedLanguage && selectedRegion) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    if (selectedLanguage) {
      setContentList(content.filter(content => content.language_code == selectedLanguage.language_code));
    }
    if (selectedRegion) {
      setContentList(content.filter(content => content.region_id == selectedRegion.uuid));
    }
  }, [content, selectedLanguage, selectedRegion]);
  
  const totalRows = content ? contentList.length : 0;

  const columns = ['Hazard', 'Title', 'Description', 'Web Url', 'Actions']

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleAddClick = () => {
    const params = {
      selectedSociety: selectedSociety.uuid,
      selectedLanguage: selectedLanguage.language_code,
      selectedRegion: selectedRegion.uuid,
    };
    const to = '/' + pathDirect + '/content/addcontent';
    const searchParams = new URLSearchParams(params).toString();
    const path = `${to}?${searchParams}`;

    navigate(path);
  }

  const handleExportClick = () => {
    const messages = [];
    for (let i = 0; i < contentList.length; i++) {
      const values = {
        society_id: contentList[i].society_id,
        language_code: contentList[i].language_code,
        region_id: contentList[i].region_id,
        content_type: contentList[i].content_type,
      }
      try {
        dispatch(get_content_message(values)).then((response) => {
          const result = response.payload;
          if (result.status) {
            const _messages = result.data;
            for (let j = 0; j < _messages.length; j++) {
              messages.push(_messages[j]);
            }
          }
          if (i == contentList.length - 1) {
            const encodeTime = generateAndEncryptId(selectedSociety.uuid);

            const csvData = csv_data_generator(encodeTime, contentList, messages, selectedSociety, selectedLanguage, selectedRegion);

            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = selectedSociety.society_name.replace(/\s/g, '_') + '.csv';
            link.click();
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  // dialog
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
  const [overwriteOption, setOverwriteOption] = useState('yes');
  const [settingOption, setSettingOption] = useState(0);

  const settingOptions = {
    0: 'Only update new event type, do not overwrite existing event types',
    1: 'Always update to this version, overwriting more recent versions',
  }

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [fileData, setFileData] = useState(null);

  const handleOverwriteSelectChange = (event) => {
    setAlertOpen(false);
    setOverwriteOption(event.target.value);
  }

  const handleSettingSelectChange = (event) => {
    setAlertOpen(false);
    setSettingOption(event.target.value);
  }

  const handleFileChange = (event) => {
    setAlertOpen(false);
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
      setFileInfo(`File Information:\n\tSize: ${file.size} bytes\n\tlast modified: ${file.lastModifiedDate}`);

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setFileData(content);
      };
      reader.readAsText(file);
    } else {
      setAlertMessage('Please upload a csv file');
      setAlertOpen(true);
    }
  };

  const handleOpenBulkDialog = () => {
    setOverwriteOption('yes');
    setSettingOption(0);
    setSelectedFile(null);
    setIsBulkDialogOpen(true);
  }

  const handleCloseBulkDialog = () => {
    setIsBulkDialogOpen(false);
  }

  const handleBulkUploadSubmit = () => {
    if (fileData) {
      if (file_format_check(fileData.split('\n'))) {
        const parsedFile = fileData.split('\n').map(line => line.split(','));
        const time_id = parsedFile[0][0];
        const society_id = decryptId(time_id).split('_')[0];
        if (society_id == selectedSociety.uuid) {
          const content_with_messages = parsedFile.slice(7, parsedFile.length - 1);
          const organized_content_with_messages = data_reorganizor(content_with_messages);
          const current_content_types = contentList.map(content => content.content_type);
          
          if (overwriteOption == 'yes') {
            dispatch(is_content_init({society_id: selectedSociety.uuid, language_code: selectedLanguage.language_code, region_id: selectedRegion.uuid})).then((response) => {
              const result = response.payload;
              const permission = result.data;
              if (result.status && permission) {
                for (let i = 0; i < contentList.length; i++) {
                  const content = contentList[i];
                  const content_type = content.content_type;
                  if (organized_content_with_messages[content_type]) {
                    dispatch(update_content({
                      uuid: content.uuid,
                      title: organized_content_with_messages[content_type].content.title,
                      description: organized_content_with_messages[content_type].content.description,
                      url: organized_content_with_messages[content_type].content.url,
                    })).then((response) => {
                      const result = response.payload;
                      if (result.status) {
                        const messages = organized_content_with_messages[content_type].messages;
                        var messages_to_update = {};
                        const messages_types = Object.keys(messageTypes);
                        for (let k = 0; k < messages_types.length; k++) {
                          messages_to_update[messages_types[k]] = messages[k];
                        }
                        for (let j = 0; j < messages.length; j++) {
                          dispatch(update_content_message({
                            society_id: selectedSociety.uuid,
                            language_code: selectedLanguage.language_code,
                            region_id: selectedRegion.uuid,
                            content_type: content_type,
                            messages: messages_to_update,
                          })).then((response) => {
                            const result = response.payload;
                            if (result.status) {
                              handleCloseBulkDialog();
                              window.location.reload();
                            }
                          });
                        }
                      }
                    })
                  }
                }
              } else {
                setAlertMessage('The content will overwrite more recent versions');
                setAlertOpen(true);
              }
            });
          } else if (overwriteOption == 'no') {
            if (settingOption == 0) {
              const new_content_types = Object.keys(organized_content_with_messages).filter(content_type => !current_content_types.includes(content_type));
              const content_types_to_update = new_content_types.filter(content_type => Object.keys(contentTypes).includes(content_type));
              for (let i = 0; i < content_types_to_update.length; i++) {
                const content_type = content_types_to_update[i];
                const messages = organized_content_with_messages[content_type].messages;
                var messages_to_update = {};
                const messages_types = Object.keys(messageTypes);
                for (let k = 0; k < messages_types.length; k++) {
                  messages_to_update[messages_types[k]] = messages[k];
                }
                dispatch(add_content({
                  society_id: selectedSociety.uuid,
                  language_code: selectedLanguage.language_code,
                  region_id: selectedRegion.uuid,
                  content_type: content_type,
                  title: organized_content_with_messages[content_type].content.title,
                  description: organized_content_with_messages[content_type].content.description,
                  url: organized_content_with_messages[content_type].content.url,
                  messages: messages_to_update,
                })).then((response) => {
                  const result = response.payload;
                  if (result.status) {
                    handleCloseBulkDialog();
                    window.location.reload();
                  }
                })
              }
            } else if (settingOption == 1) {
              var content_with_messages_to_update = organized_content_with_messages;
              for (let i = 0; i < contentList.length; i++) {
                const content = contentList[i];
                const content_type = content.content_type;
                if (organized_content_with_messages[content_type]) {
                  dispatch(update_content({
                    uuid: content.uuid,
                    title: organized_content_with_messages[content_type].content.title,
                    description: organized_content_with_messages[content_type].content.description,
                    url: organized_content_with_messages[content_type].content.url,
                  })).then((response) => {
                    const result = response.payload;
                    if (result.status) {
                      const messages = organized_content_with_messages[content_type].messages;
                      var messages_to_update = {};
                      const messages_types = Object.keys(messageTypes);
                      for (let k = 0; k < messages_types.length; k++) {
                        messages_to_update[messages_types[k]] = messages[k];
                      }
                      for (let j = 0; j < messages.length; j++) {
                        dispatch(update_content_message({
                          society_id: selectedSociety.uuid,
                          language_code: selectedLanguage.language_code,
                          region_id: selectedRegion.uuid,
                          content_type: content_type,
                          messages: messages_to_update,
                        })).then((response) => {
                          const result = response.payload;
                          if (result.status) {
                            delete content_with_messages_to_update[content_type];
                          }
                        });
                      }
                    }
                  })
                }
              }
              if (Object.keys(content_with_messages_to_update).length != 0) {
                const new_content_types = Object.keys(content_with_messages_to_update).filter(content_type => !current_content_types.includes(content_type));
                const content_types_to_update = new_content_types.filter(content_type => Object.keys(contentTypes).includes(content_type));
                for (let i = 0; i < content_types_to_update.length; i++) {
                  const content_type = content_types_to_update[i];
                  const messages = content_with_messages_to_update[content_type].messages;
                  var messages_to_update = {};
                  const messages_types = Object.keys(messageTypes);
                  for (let k = 0; k < messages_types.length; k++) {
                    messages_to_update[messages_types[k]] = messages[k];
                  }
                  dispatch(add_content({
                    society_id: selectedSociety.uuid,
                    language_code: selectedLanguage.language_code,
                    region_id: selectedRegion.uuid,
                    content_type: content_type,
                    title: content_with_messages_to_update[content_type].content.title,
                    description: content_with_messages_to_update[content_type].content.description,
                    url: content_with_messages_to_update[content_type].content.url,
                    messages: messages_to_update,
                  })).then((response) => {
                    const result = response.payload;
                    if (result.status) {
                      handleCloseBulkDialog();
                      window.location.reload();
                    }
                  })
                }
              } else {
                handleCloseBulkDialog();
                window.location.reload();
              }
            }
          }
        } else {
          setAlertMessage('The file is not for this society');
          setAlertOpen(true);
        }
      } else {
        setAlertMessage('The file format is not correct');
        setAlertOpen(true);
      }
    } else {
      setAlertMessage('Please upload a file first');
      setAlertOpen(true);
    }
  }

  const handlePublishClick = () => {
    dispatch(publish({uuid: selectedRegion.uuid})).then((response) => {
      const result = response.payload;
      if (result.status) {
        window.location.reload();
      }
    });
  }

  const handleStopPublishClick = () => {
    dispatch(stop_publish({uuid: selectedRegion.uuid})).then((response) => {
      const result = response.payload;
      if (result.status) {
        window.location.reload();
      }
    });
  }

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('Alert');

  return (
    <>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <Grid item xs>
            <Typography variant="h3">Content</Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleAddClick} variant="contained" sx={{ fontWeight: 'bold' }} disabled={isDisabled} >Add new hazard</Button>
            <Button onClick={handleExportClick} variant="contained" sx={{ fontWeight: 'bold', marginLeft: 2 }} disabled={isDisabled || contentList.length == 0 } >Export this spreadsheet</Button>
            <Button onClick={handleOpenBulkDialog} variant="contained" sx={{ fontWeight: 'bold', marginLeft: 2 }} disabled={isDisabled} >Bulk Upload</Button>
            { pathDirect == 'ns_editor'
            ?
            <></>
            :
            <>
            <Button onClick={handlePublishClick} variant="contained" color="secondary" sx={{ fontWeight: 'bold', marginLeft: 2 }} disabled={isDisabled || selectedRegion.is_published } >Publish</Button>
            <Button onClick={handleStopPublishClick} variant="contained" color="secondary" sx={{ fontWeight: 'bold', marginLeft: 2 }} disabled={isDisabled || !selectedRegion.is_published } >Stop Publish</Button>
            </>
            }
          </Grid>
        </Grid>
        <Divider sx={{ marginBottom: 2 }} />
        <Paper sx={{ padding: 2 }} elevation={0}>
          <Grid container spacing={10} alignItems="center">
              {columns.map((column) => (
                  <Grid item xs>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }} >{column}</Typography>
                  </Grid>
              ))}
          </Grid>
        </Paper>

        {contentList.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((content, index) => (
          <ContentGrid key={index} content={content} path={pathDirect} />
        ))}

        {/* pagination*/}
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item>
            <Select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              label="Rows per page"
            >
              {[5, 10, 15].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <Pagination
              count={Math.ceil(totalRows / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Paper>
      <Dialog open={isBulkDialogOpen} onClose={handleCloseBulkDialog} sx={{ '& .MuiDialog-paper': { minWidth: '800px', maxWidth: '80%' } }}>
        <DialogTitle variant="h3" sx={{ fontWeight: 'bold', marginTop: 1 }}>Bulk Upload</DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ marginTop: 1 }}>Only permit first time update</Typography>
          <Select
              value={overwriteOption}
              onChange={handleOverwriteSelectChange}
              fullWidth
              margin="dense"
              sx={{ border: '2px solid #ced4da', borderRadius: 1, marginTop: 1 }}
          >
            {['yes', 'no'].map((option, index) => (
                <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
          </Select>
          {overwriteOption == 'no' && (
            <>
              <Typography variant="h6" sx={{ marginTop: 2 }}>Overwrite Setting</Typography>
              <Select
                  value={settingOption}
                  onChange={handleSettingSelectChange}
                  fullWidth
                  margin="dense"
                  sx={{ border: '2px solid #ced4da', borderRadius: 1, marginTop: 1 }}
              >
                {Object.keys(settingOptions).map((option, index) => (
                    <MenuItem key={index} value={option}>{settingOptions[option]}</MenuItem>
                ))}
              </Select>
            </>
          )}
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{
              marginTop: 2,
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: '#b30000',
              '&:hover': {
                backgroundColor: '#ff1a1a',
              }
            }}
          >
            Click Here to Upload a CSV File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept=".csv"
            />
          </Button>
          {selectedFile && (
            <>
              <Typography variant="h5" sx={{ marginTop: 2 }}>
                Uploaded: {selectedFile.name}
              </Typography>
              <Typography variant="h5" sx={{ marginTop: 1 }} style={{ whiteSpace: 'pre-line' }}>
                {fileInfo}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="primary" onClick={handleCloseBulkDialog} sx={{ marginRight: 1, fontWeight: 'bold' }}>CANCLE</Button>
            <Button variant="contained" color="secondary" onClick={handleBulkUploadSubmit} sx={{ marginRight: 1, fontWeight: 'bold' }}>IMPORT CONTENT</Button>
        </DialogActions>
        <Collapse in={alertOpen}>
          <Alert severity="warning" onClose={() => setAlertOpen(false)}>
            {alertMessage}
          </Alert>
        </Collapse>
      </Dialog>
    </>
  );
};

export default LargePaperWithRows;
