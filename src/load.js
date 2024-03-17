import { lazy } from 'react';


export const Login  = lazy(
    async()=>await import('./Scene/Login/index')
);

export const Register  = lazy(
    async()=>await import('./Scene/Register/index')
);

export const Home = lazy(
    async()=>await import('./Scene/Homepage/index')
);

export const Profile = lazy(
    async()=>await import('./Scene/Profile/index')
);

export const Messages = lazy(
    async()=>await import('./Scene/Messages/index')
);

export const Error = lazy(
    async()=>await import('./Scene/error/index')
);

export const Term = lazy(
    async()=>await import('./Scene/Term/index')
);

export const Email = lazy(
    async()=>await import('./Scene/HelperPage/Email')
);

export const ResetPassword = lazy(
    async()=>await import('./Scene/HelperPage/ResetPassword')
);

export const ForgetPassword = lazy(
    async()=>await import('./Scene/HelperPage/ForgetPassword')
);

// api_user

export const ApiPage = lazy(
    async()=>await import('./Scene/api_user/API/index')
);

// reviewer

export const ReviewerApiPage = lazy(
    async()=>await import('./Scene/reviewer/API/index')
);

// ns_admin

export const NsContent = lazy(
    async()=>await import('./Scene/ns_admin/Content/index')
);

export const NsAuditLog = lazy(
    async()=>await import('./Scene/ns_admin/AuditLog/index')
);

export const NsAddContent = lazy(
    async()=>await import('./Scene/ns_admin/Content/AddContent')
);

export const NsEditContent = lazy(
    async()=>await import('./Scene/ns_admin/Content/EditContent')
);

export const NsRegion = lazy(
    async()=>await import('./Scene/ns_admin/Region/index')
);

// ns_admin

export const NseContent = lazy(
    async()=>await import('./Scene/ns_editor/Content/index')
);

export const NseAuditLog = lazy(
    async()=>await import('./Scene/ns_editor/AuditLog/index')
);

export const NseAddContent = lazy(
    async()=>await import('./Scene/ns_editor/Content/AddContent')
);

export const NseEditContent = lazy(
    async()=>await import('./Scene/ns_editor/Content/EditContent')
);

export const NseRegion = lazy(
    async()=>await import('./Scene/ns_editor/Region/index')
);

// gdpc_admin

export const GdpcManageUsers = lazy(
    async()=>await import('./Scene/gdpc_admin/ManageUsers/index')
);

export const GdpcModifyUser = lazy(
    async()=>await import('./Scene/gdpc_admin/ManageUsers/ModifyUserPage')
);

export const GdpcAddUser = lazy(
    async()=>await import('./Scene/gdpc_admin/ManageUsers/AddUserPage')
);

export const GdpcApisStats = lazy(
    async()=>await import('./Scene/gdpc_admin/ApisStats/index')
);

export const GdpcManageApiUsers = lazy(
    async()=>await import('./Scene/gdpc_admin/ManageApiUsers/index')
);

export const GdpcModifyApiUser = lazy(
    async()=>await import('./Scene/gdpc_admin/ManageApiUsers/ModifyApiUserPage')
);

export const GdpcManageTerms = lazy(
    async()=>await import('./Scene/gdpc_admin/ManageTerms/index')
);

export const GdpcContent = lazy(
    async()=>await import('./Scene/gdpc_admin/Content/index')
)

export const GdpcAuditLog = lazy(
    async()=>await import('./Scene/gdpc_admin/AuditLog/index')
);

export const GdpcAddContent = lazy(
    async()=>await import('./Scene/gdpc_admin/Content/AddContent')
);

export const GdpcEditContent = lazy(
    async()=>await import('./Scene/gdpc_admin/Content/EditContent')
);

export const GdpcRegion = lazy(
    async()=>await import('./Scene/gdpc_admin/Region/index')
);