// src/access.ts
export default function (initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  console.log('Current User ' + JSON.stringify(currentUser));
  return {
    canAdmin: currentUser && currentUser.custom_role === 'siteadmin',
    canOrgAdmin: currentUser && currentUser.custom_role === 'orgadmin',
    canApproval: currentUser && currentUser.current_role === 'orgapproval',
  };
}
