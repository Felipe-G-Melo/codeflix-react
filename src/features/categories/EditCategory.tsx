import { Box, Paper, Typography } from '@mui/material';
import { ChangeEvent, useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CategoryForm } from './components/CategoryForm';
import { ICategory, selectCategoryById, updateCategory } from './categorySlice';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export const EditCategory = () => {
  const id = useParams().id || '';
  const category: ICategory = useAppSelector((state) =>
    selectCategoryById(state, id)
  );
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [categoryState, setCategoryState] = useState<ICategory>(category);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateCategory(categoryState));
    enqueueSnackbar('Sucesso ao atualizar a categoria!', {
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
            <Typography variant='h4'>Editar Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          category={categoryState}
          isdisabled={isDisabled}
          isLoading={false}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
