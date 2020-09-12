import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

import DataGrid from "../../../components/DataGrid";
import { DialogTitle } from "@material-ui/core";

const RolesSetupDialog = (props) => {
  const { currentRules, groups, onClose, onSave, currentMenuCode } = props;
  const [changingRules, setChangingRules] = useState([]);

  useEffect(() => {
    const rules = groups.map(({ name: groupName }) => {
      const actualRule = currentRules.find((er) => er.groupName === groupName);
      return {
        id: actualRule ? actualRule.id : null,
        groupName,
        menuCode: currentMenuCode,
        selected: actualRule !== undefined,
      };
    });
    setChangingRules(rules);
  }, [currentRules, groups, currentMenuCode]);

  const columns = [
    {
      title: "Nome do Grupo",
      field: "groupName",
      sorting: false,
      validate: ({ groupName }) => {
        const isValid = groupName !== undefined && groupName.trim() !== "";
        return isValid
          ? true
          : { isValid: false, helperText: "Preencha o nome do Grupo" };
      },
    },
  ];

  const onSelectionChange = (rows) => {
    const nextRules = [...changingRules].map((rule) => ({
      ...rule,
      selected: rows.some(
        (r2) => rule.groupName === r2.groupName && rule.menuCode === r2.menuCode
      ),
    }));
    setChangingRules([...nextRules]);
  };

  // const onRowAdd = (newRow) =>
  //   new Promise(async (resolve, reject) => {
  //     try {
  //       const newRule = {
  //         ...newRow,
  //         menuCode: currentMenuCode,
  //       };
  //       const newRules = [...changingRules, newRule];
  //       setVisibleRules([...newRules]);

  //       setAllRules((prev) => {
  //         const next = [...prev, newRule];
  //         return next;
  //       });

  //       resolve();
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });

  // const onRowUpdate = (newData, oldData) =>
  //   new Promise((resolve, reject) => {
  //     try {
  //       const editingRule = {
  //         ...newData,
  //         id: oldData.id,
  //       };

  //       const indexToChange = changingRules.findIndex(
  //         (r) => r.id === oldData.id
  //       );

  //       const changedRules = [...changingRules];

  //       changedRules[indexToChange] = editingRule;

  //       setVisibleRules([...changedRules]);

  //       setAllRules((prev) => {
  //         const next = [...prev];
  //         next.splice(indexToChange, 1, {
  //           ...editingRule,
  //           deleted: false,
  //         });
  //         return next;
  //       });

  //       resolve();
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });

  // const onRowDelete = (oldData) =>
  //   new Promise((resolve, reject) => {
  //     try {
  //       const newVisibleRules = [...changingRules];
  //       const indexToChange = changingRules.findIndex(
  //         (r) => r.groupName === oldData.groupName
  //       );
  //       newVisibleRules.splice(indexToChange, 1);
  //       setVisibleRules(newVisibleRules);

  //       setAllRules((prev) => {
  //         const next = [...prev];
  //         next.splice(indexToChange, 1, {
  //           ...prev[indexToChange],
  //           deleted: true,
  //         });
  //         return next;
  //       });

  //       resolve();
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });

  return (
    <Dialog
      aria-labelledby="roles-dialog"
      open={props.open}
      onClose={props.onClose}
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle id="roles-dialog">
        Vínculo entre menu e grupos do AD
      </DialogTitle>
      <DialogContent>
        <DataGrid
          dataObjectLabel="Grupo do AD"
          columns={columns}
          data={changingRules.map((d) => ({
            ...d,
            tableData: { checked: d.selected },
          }))}
          paging={false}
          editable={false}
          selection={true}
          onSelectionChange={onSelectionChange}
          // onRowAdd={onRowAdd}
          // onRowUpdate={onRowUpdate}
          // onRowDelete={onRowDelete}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          <CloseIcon />
          Cancelar
        </Button>
        <Button onClick={() => onSave(changingRules)} color="primary">
          <DoneIcon />
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RolesSetupDialog;
