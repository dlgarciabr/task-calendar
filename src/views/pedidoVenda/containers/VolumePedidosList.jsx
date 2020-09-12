import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TableChartIcon from "@material-ui/icons/TableChart";
import SeachIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

import { MTableToolbar } from "material-table";

//import useStyles from "../../../App.styles";
import DataGrid from "../../../components/DataGrid";

const VolumePedidosList = () => {
  //const classes = useStyles();

  const headerComponent = () => (
    <Grid container>
      <Grid
        item
        container
        justify="space-between"
        style={{ padding: "10px 10px" }}
      >
        <Grid item>
          <Typography variant="h6">Volumes de pedidos de venda</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button color="primary" style={{ float: "right" }}>
            <TableChartIcon />
            Planilha
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        container
        spacing={3}
        justify="space-around"
        style={{ padding: "10px 10px 50px 10px" }}
        alignItems="center"
      >
        <Grid item xs={3}>
          <TextField id="standard-basic" label="Filial" fullWidth />
        </Grid>
        <Grid item xs={3}>
          <TextField id="standard-basic" label="Pedido Modtri" fullWidth />
        </Grid>
        <Grid item xs={3}>
          <TextField id="standard-basic" label="Pedido Domus" fullWidth />
        </Grid>
        <Grid item xs={3}>
          <Button color="primary" style={{ float: "right" }}>
            <CloseIcon />
            Limpar
          </Button>
          <Button color="primary" style={{ float: "right" }}>
            <SeachIcon />
            Pesquisar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );

  const columns = [
    { title: "Filial", field: "filial", sorting: false },
    { title: "Un. negócio", field: "unidadeNegocio", sorting: false },
    { title: "Pedido Modtri", field: "numeroPedidoModtri", sorting: false },
    { title: "Pedido Domus", field: "numeroPedidoDomus", sorting: false },
    { title: "Data Domus", field: "dataDomus", sorting: false },
    { title: "Cliente", field: "cliente", sorting: false },
    { title: "Tipo Frete", field: "tipoFrete", sorting: false },
    { title: "Transportadora", field: "transportadora", sorting: false },
    { title: "Volumes", field: "quantidadeVolumes", sorting: false },
  ];

  return (
    <Grid container>
      {/* <Grid item xs={12}>
        <Paper>
        <Typography variant="h5">Volumes de pedidos de venda</Typography>
        </Paper>
      </Grid> */}
      <Grid item xs={12}>
        <DataGrid
          toolbar={true}
          search={true}
          title=""
          columns={columns}
          data={[]}
          paging={false}
          components={{
            Toolbar: (props) => headerComponent(),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default VolumePedidosList;
