import { Box, Paper, Typography } from '@mui/material';
import { ICategory, createCategory } from './categorySlice';
import { useState, ChangeEvent, FormEvent } from 'react';
import { CategoryForm } from './components/CategoryForm';
import { useAppDispatch } from '../../app/hooks';
import { useSnackbar } from 'notistack';
export const CreateCategory = () => {
  const [isDisabled, setIsDisable] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [categoryState, setCategoryState] = useState<ICategory>({
    id: '',
    name: '',
    is_active: false,
    created_at: '',
    update_at: '',
    deleted_at: null,
    description: '',
  });
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCategory(categoryState));
    enqueueSnackbar('Sucesso ao criar uma categoria!', {
      variant: 'success',
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };
  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant='h4'>Criar Categoria</Typography>
          </Box>

          <CategoryForm
            category={categoryState}
            isdisabled={isDisabled}
            isLoading={false}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleToggle={handleToggle}
          />
        </Box>
      </Paper>
    </Box>
  );
};
