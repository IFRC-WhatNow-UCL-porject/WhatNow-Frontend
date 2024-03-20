import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Suspense } from 'react';

import { theme } from './theme';
import { Login, Register, Home, Profile, Error, Messages, Term, Email, ResetPassword, ForgetPassword, SignUpGuide, UserGuide, APIGuid } from './load';
import { NsContent, NsAuditLog, NsAddContent, NsEditContent, NsRegion } from './load';
import { NseAddContent, NseAuditLog, NseContent, NseEditContent, NseRegion } from './load';
import { ApiPage } from './load';
import { ReviewerApiPage } from './load';
import { GdpcManageUsers, GdpcModifyUser, GdpcAddUser, GdpcAddContent, GdpcApisStats, GdpcManageApiUsers, GdpcModifyApiUser, GdpcAuditLog, GdpcContent, GdpcEditContent, GdpcRegion, GdpcManageTerms } from './load';
import Navbar from './Component/Navigator/Navbar';
import Footer from './Component/Navigator/Footer';
import Waiting from './Component/Waiting';
import NotFoundDialog from './Scene/error/404';

import { userRoles } from './constant';

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="app">
          <Navbar>
            <Box className="appMain">
              <Routes>
                <Route path="/" element={<Suspense fallback={<div>waiting</div>}><Home></Home></Suspense>} />
                <Route path="/home" element={<Suspense fallback={<div>waiting</div>}><Home></Home></Suspense>} />
                <Route path="/login" element={<Suspense fallback={<div>waiting</div>}><Login></Login></Suspense>} />
                <Route path="/register" element={<Suspense fallback={<div>waiting</div>}><Register></Register></Suspense>} />
                <Route path="/profile" element={<Suspense fallback={<div>waiting</div>}><Profile></Profile></Suspense>} />
                <Route path="/whatnow_messages" element={<Suspense fallback={<div>waiting</div>}><Messages></Messages></Suspense>} />
                <Route path='/error' element={<Suspense fallback={<div>waiting</div>}><Error></Error></Suspense>} />
                <Route path='/terms_and_conditions' element={<Suspense fallback={<div>waiting</div>}><Term></Term></Suspense>} />
                <Route path='/activate' element={<Suspense fallback={<div>waiting</div>}><Email></Email></Suspense>} />
                <Route path='/reset' element={<Suspense fallback={<div>waiting</div>}><Email></Email></Suspense>} />
                <Route path='/reset_password' element={<Suspense fallback={<div>waiting</div>}><ResetPassword></ResetPassword></Suspense>} />
                <Route path='/forget_password' element={<Suspense fallback={<div>waiting</div>}><ForgetPassword></ForgetPassword></Suspense>} />
                <Route path='/sign_up_guide' element={<Suspense fallback={<div>waiting</div>}><SignUpGuide></SignUpGuide></Suspense>} />
                <Route path='/api_document' element={<Suspense fallback={<div>waiting</div>}><APIGuid></APIGuid></Suspense>} />

                <Route path="/ns_admin/content" element={<Waiting component={() => <NsContent></NsContent>} access={userRoles.NS_ADMIN} ></Waiting>} />
                <Route path="/ns_admin/content/addcontent" element={<Waiting component={() => <NsAddContent></NsAddContent>} access={userRoles.NS_ADMIN} ></Waiting>} />
                <Route path="/ns_admin/content/editcontent" element={<Waiting component={() => <NsEditContent></NsEditContent>} access={userRoles.NS_ADMIN} ></Waiting>} />
                <Route path="/ns_admin/auditlog" element={<Waiting component={() => <NsAuditLog></NsAuditLog>} access={userRoles.NS_ADMIN} ></Waiting>} />
                <Route path="/ns_admin/region" element={<Waiting component={() => <NsRegion></NsRegion>} access={userRoles.NS_ADMIN} ></Waiting>} />

                <Route path="/ns_editor/content" element={<Waiting component={() => <NseContent></NseContent>} access={userRoles.NS_EDITOR} ></Waiting>} />
                <Route path="/ns_editor/content/addcontent" element={<Waiting component={() => <NseAddContent></NseAddContent>} access={userRoles.NS_EDITOR} ></Waiting>} />
                <Route path="/ns_editor/content/editcontent" element={<Waiting component={() => <NseEditContent></NseEditContent>} access={userRoles.NS_EDITOR} ></Waiting>} />
                <Route path="/ns_editor/auditlog" element={<Waiting component={() => <NseAuditLog></NseAuditLog>} access={userRoles.NS_EDITOR} ></Waiting>} />
                <Route path="/ns_editor/region" element={<Waiting component={() => <NseRegion></NseRegion>} access={userRoles.NS_EDITOR} ></Waiting>} />

                <Route path="/api_user/my_apps" element={<Waiting component={() => <ApiPage></ApiPage>} access={userRoles.API_USER} ></Waiting>} />

                <Route path="/reviewer/my_apps" element={<Waiting component={() => <ReviewerApiPage></ReviewerApiPage>} access={userRoles.REVIEWER} ></Waiting>} />

                <Route path="/gdpc_admin/manage_users" element={<Waiting component={() => <GdpcManageUsers></GdpcManageUsers>} access={userRoles.GDPC_ADMIN} ></Waiting>} />
                <Route path="/gdpc_admin/edit_profile" element={<Waiting component={() => <GdpcModifyUser></GdpcModifyUser>} access={userRoles.GDPC_ADMIN} ></Waiting>} />
                <Route path="/gdpc_admin/add_user" element={<Waiting component={() => <GdpcAddUser></GdpcAddUser>} access={userRoles.GDPC_ADMIN} ></Waiting>} />
                <Route path="/gdpc_admin/apis_stats" element={<Waiting component={() => <GdpcApisStats></GdpcApisStats>} access={userRoles.GDPC_ADMIN} ></Waiting>} />
                <Route path="/gdpc_admin/manage_api_users" element={<Waiting component={() => <GdpcManageApiUsers></GdpcManageApiUsers>} access={userRoles.GDPC_ADMIN} ></Waiting>} />
                <Route path="/gdpc_admin/edit_api_user" element={<Waiting component={() => <GdpcModifyApiUser></GdpcModifyApiUser>} access={userRoles.GDPC_ADMIN} ></Waiting>} />
                <Route path="/gdpc_admin/content" element={<Waiting component={() => <GdpcContent></GdpcContent>} access={userRoles.GDPC_ADMIN} ></Waiting>} />
                <Route path="/gdpc_admin/content/addcontent" element={<Waiting component={() => <GdpcAddContent></GdpcAddContent>} access={userRoles.GDPC_ADMIN} ></Waiting>} />
                <Route path="/gdpc_admin/content/editcontent" element={<Waiting component={() => <GdpcEditContent></GdpcEditContent>} access={userRoles.GDPC_ADMIN} ></Waiting>} />
                <Route path="/gdpc_admin/auditlog" element={<Waiting component={() => <GdpcAuditLog></GdpcAuditLog>} access={userRoles.GDPC_ADMIN} ></Waiting>} />
                <Route path="/gdpc_admin/region" element={<Waiting component={() => <GdpcRegion></GdpcRegion>} access={userRoles.GDPC_ADMIN} ></Waiting>} />
                <Route path="/gdpc_admin/manage_terms" element={<Waiting component={() => <GdpcManageTerms></GdpcManageTerms>} access={userRoles.GDPC_ADMIN} ></Waiting>} />

                <Route path="*" element={<NotFoundDialog />} />
              </Routes>
            </Box>
          </Navbar>
          <div style={{ marginTop: '16px' }}></div>
          <Footer />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
