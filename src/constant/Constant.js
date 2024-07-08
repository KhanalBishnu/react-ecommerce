const BASE_URL = 'http://localhost:8000/api'; 
const API_URLS = {
  BASE_URL,
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,
  DASHBOARD: `${BASE_URL}/dashboard`,
  //get own permission
  OwnPermission:`${BASE_URL}/permissions`,

  // user management url  
  getUserManagementData:`${BASE_URL}/dashboard/user-management`,
  getUserManagementDataStore:`${BASE_URL}/dashboard/user-management/store`,
  getUserManagementDataUpdate:`${BASE_URL}/dashboard/user-management/update`,
};

export default API_URLS;
