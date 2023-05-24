import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from '@mui/material';
import { ICategory } from '../categorySlice';
import { FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  category: ICategory;
  isdisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleToggle: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const CategoryForm = ({
  category,
  isdisabled,
  isLoading,
  handleSubmit,
  handleChange,
  handleToggle,
}: Props) => {
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name='name'
                label='Nome'
                value={category?.name}
                disabled={isdisabled}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <TextField
                required
                name='description'
                label='Descrição'
                value={category?.description}
                type='text'
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name='is_active'
                    color='secondary'
                    onChange={(e) => handleToggle(e)}
                    checked={category?.is_active}
                  />
                }
                label='Ativo'
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Box display='flex' gap={2}>
              <Button variant='contained' component={Link} to='/categories'>
                Voltar
              </Button>
              <Button
                variant='contained'
                type='submit'
                color='secondary'
                disabled={isdisabled}
              >
                Salvar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
