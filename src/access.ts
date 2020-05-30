// src/access.ts
export default function (initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  console.log('Current User ' + JSON.stringify(currentUser));

  return {
    canAdmin: currentUser && currentUser.custom_role === 'siteadmin',
    canOrgAdmin: currentUser && currentUser.custom_role === 'orgadmin',
    canApproval: currentUser && currentUser.custom_role === 'orgapproval',
    canBoth:
      currentUser &&
      (currentUser.custom_role === 'orgadmin' || currentUser.custom_role === 'orgapproval'),
    canBothUser:
      currentUser &&
      (currentUser.custom_role === 'orgadmin' || currentUser.custom_role === 'siteadmin'),
  };
}
