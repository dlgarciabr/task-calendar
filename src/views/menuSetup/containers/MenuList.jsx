import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import DataGrid, { actionTypes } from "../../../components/DataGrid";
import RolesSetupDialog from "../components/RolesSetupDialog";
import { useSaveRules, getAllActiveDirectoryGroups } from "../apis";
import { getAllRules } from "../../app/apis";
import { fulfillAllRules } from "../../app/ducks";

const MenuList = (props) => {
  const { menuItems } = props;
  const dispatch = useDispatch();
  const [openGroupsDialog, setOpenGroupsDialog] = useState(false);
  const [editingRules, setEditingRules] = useState([]);
  const [activeDirectoryGroups, setActiveDirectorydGroups] = useState([]);
  const [editingMenuCode, setEditingMenuCode] = useState("");

  const saveRules = useSaveRules();

  // useEffect(() => {
  //   //works like componentWillMount with empty array
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const showRolesDialog = async (rowData) => {
    const menuCode = rowData.code;
    const groups = await getAllActiveDirectoryGroups();

    const rules = await getAllRules(process.env.REACT_APP_API_URL);
    dispatch(fulfillAllRules(rules));

    setActiveDirectorydGroups(groups);
    setEditingMenuCode(menuCode);
    setEditingRules(rules.filter((rule) => rule.menuCode === menuCode));
    setOpenGroupsDialog(true);
  };

  const handleClickSaveRule = async (data) => {
    const rulesToSave = data
      .filter(({ id, selected }) => !(!id && !selected))
      .map(({ id, groupName, menuCode, selected }) => ({
        id,
        groupName,
        menuCode,
        deleted: !selected,
      }));

    setOpenGroupsDialog(false);
    await saveRules([...rulesToSave]);
  };

  const columns = [{ title: "Nome do menu", field: "label", sorting: false }];
  const actions = [
    {
      actionType: actionTypes.EDIT,
      tooltip: "Editar vinculos com grupos",
      onClick: (event, rowData) => {
        showRolesDialog(rowData);
      },
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">Setup menus</Typography>
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          columns={columns}
          data={menuItems}
          actions={actions}
          paging={false}
        />
        <RolesSetupDialog
          open={openGroupsDialog}
          currentMenuCode={editingMenuCode}
          currentRules={editingRules}
          groups={activeDirectoryGroups}
          onClose={() => setOpenGroupsDialog(false)}
          onSave={(data) => handleClickSaveRule(data)}
        />
      </Grid>
    </Grid>
  );
};

export default MenuList;
