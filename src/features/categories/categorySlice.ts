import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ICategory {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  update_at: string;
  deleted_at: null | string;
  description: null | string;
}

export const initialState: ICategory[] = [
  {
    id: '1',
    name: 'teste',
    is_active: true,
    created_at: '22/05/2023',
    update_at: '',
    deleted_at: null,
    description: '',
  },
];

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state.splice(index, 1);
    },
  },
});

export const selectCategories = (state: RootState) => state.categories;

export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((category) => category.id === id);

  return (
    category || {
      id: '',
      name: '',
      is_active: false,
      created_at: '',
      update_at: '',
      deleted_at: null,
      description: '',
    }
  );
};

export default categoriesSlice.reducer;

export const { createCategory, updateCategory, deleteCategory } =
  categoriesSlice.actions;
