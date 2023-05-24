import { Box, Button, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteCategory, selectCategories } from './categorySlice';
import { Link } from 'react-router-dom';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';

export const ListCategory = () => {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const renderIsActiveCell = (row: GridRenderCellParams) => {
    return (
      <Typography color={row.value ? 'primary' : 'secondary'}>
        {row.value ? 'Ativo' : 'Inativo'}
      </Typography>
    );
  };

  const renderActionCell = (params: GridRenderCellParams) => {
    return (
      <IconButton
        onClick={() => handleDeleteCategory(params.value)}
        color='secondary'
        aria-label='delete'
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  const renderNameCell = (rowData: GridRenderCellParams) => {
    return (
      <Link
        style={{ textDecoration: 'none' }}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color='primary'>{rowData.value}</Typography>
      </Link>
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: 'isActive',
      headerName: 'Active',
      flex: 1,
      type: 'boolean',
      renderCell: renderIsActiveCell,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
    },
    {
      field: 'id',
      headerName: 'Actions',
      type: 'string',
      flex: 1,
      renderCell: renderActionCell,
    },
  ];

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString('pt-BR'),
  }));

  const handleDeleteCategory = (id: string) => {
    dispatch(deleteCategory(id));
    enqueueSnackbar('Sucesso ao deletar a categoria!', {
      variant: 'success',
    });
  };

  return (
    <Box maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          variant='contained'
          color='secondary'
          component={Link}
          to='/categories/create'
          style={{ marginBottom: '1rem' }}
        >
          Nova Categoria
        </Button>
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          pageSizeOptions={[5, 10, 50, 100]}
          components={{ Toolbar: GridToolbar }}
          disableColumnSelector={true}
          disableRowSelectionOnClick={true}
          disableColumnFilter={true}
          disableDensitySelector={true}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          rows={rows}
          columns={columns}
        />
      </Box>
    </Box>
  );
};
