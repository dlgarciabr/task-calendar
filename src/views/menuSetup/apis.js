import axios from "axios";
import { useShowSuccessMessage } from "../../hooks/messageHandler";

export const getAllActiveDirectoryGroups = async () => {
  //TODO implement recovering data from backend api
  //const response = await axios.get(`${process.env.REACT_APP_API_URL}/rule`);
  //return response.data.data;
  return [
    {
      id: 1,
      name: "NATIONS\\perfil_admin",
    },
    {
      id: 2,
      name: "NATIONS\\Usuários do domínio",
    },
    {
      id: 2,
      name: "NATIONS\\TI_DESENV_SQL",
    },
    {
      id: 2,
      name: "NATIONS\\TI",
    },
  ];
};

export const useSaveRules = () => {
  const showSuccessMessage = useShowSuccessMessage();
  return async (values) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/rule`, values);
    showSuccessMessage();
  };
};
