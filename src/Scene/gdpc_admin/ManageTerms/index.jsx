import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Typography, Divider, TextField, Select, MenuItem, Container } from '@mui/material';

import TermHeader from '../../../Component/ManageTerms/Header';

import BreadNav from '../../../Component/BreadNav';

import { get_all_terms_versions, get_term_by_version } from '../../../store/features/gdpc_admin.slice';

const CustomPaperComponent = () => {

  const dispatch = useDispatch();

  const [versions, setVersions] = useState([]);

  const [latestVersion, setLatestVersion] = useState('0.0');

  const [text, setText] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [selectedVersion, setSelectedVersion] = useState('current');
  const [versionDate, setVersionDate] = useState('unpublished');

  const handleTextChange = (event) => {
    setText(event.target.value);
    setCurrentText(event.target.value);
  };

  React.useEffect(() => {
    const selected = versions.find((item) => item.version === selectedVersion)
    if (selected) {
        if (selected.date) {
            setVersionDate(selected.date);
        }
    }
    if (selectedVersion === 'current') {
        setVersionDate('unpublished');
    };
  }, [selectedVersion]);

  const handleMenuChange = (event) => {
    setSelectedVersion(event.target.value);

    if (event.target.value === 'current') {
        setText(currentText);
        return;
    };

    const version = event.target.value;
    dispatch(get_term_by_version({version: version})).then((response) => {
        const result = response.payload;
        if (result.status) {
            setText(result.data);
        }
    });
  };

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const lineCount = text.split(/\n/).length;

  React.useEffect(() => {
    dispatch(get_all_terms_versions()).then((response) => {
        const result = response.payload;
        if (result.status) {
            setVersions(result.data);
        }
    });
  }, []);

  React.useEffect(() => {
    var tempVersion = '0.0';
    if (versions.length > 0) {
        for (let i = 0; i < versions.length; i++) {
            if (parseFloat(versions[i].version) > parseFloat(tempVersion)) {
                tempVersion = versions[i].version;
            }
        }
        setLatestVersion(tempVersion);
    }
  }, [versions]);

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh' }} my={2} >
        <BreadNav
            path={
                [
                    { path: '/', name: 'Home' },
                    { path: '/gdpc_admin/manage_terms', name: 'Manage Terms and Conditions' }
                ]
            }
        />
        <div style={{ marginTop: '16px' }}></div>
        <TermHeader text={text} latestVersion={latestVersion}/>
        <div style={{ marginTop: '16px' }}></div>
        <Paper style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant="h5" >current term published at: {versionDate == 'unpublished' ? 'unpublished' : new Date(versionDate).toLocaleString()}</Typography>
                <Select
                    value={selectedVersion}
                    onChange={handleMenuChange}
                    style={{ height: '40px', padding: '10px' }}
                    defaultValue='current'
                >
                    <MenuItem value="current">current</MenuItem>
                    {versions.map((item, index) => (
                        <MenuItem key={index} value={item.version}>v{item.version}</MenuItem>
                    ))}
                </Select>
            </div>

            <Divider style={{ marginBottom: '10px' }} />

            <Typography variant="body2" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                words: {wordCount} | lines: {lineCount}
            </Typography>

            <TextField
                multiline
                variant="outlined"
                value={text}
                onChange={handleTextChange}
                rows={30}
                style={{ width: '100%' }}
                disabled={selectedVersion == 'current' ? false : true}
            />
        </Paper>
    </Container>
  );
};

export default CustomPaperComponent;
