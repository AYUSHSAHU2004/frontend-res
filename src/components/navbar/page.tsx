"use client"
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: FilmOptionType) => option.title,
});

export default function Filter() {
  const [selectedOptions, setSelectedOptions] = React.useState<FilmOptionType[]>([]);

  const handleOnChange = (event: React.ChangeEvent<{}>, value: FilmOptionType | null) => {
    if (value) {
      setSelectedOptions([value]);
      alert(`Selected option: ${value.title}`);
    } else {
      setSelectedOptions([]);
      alert('No option selected');
    }
  };

  return (
    <Autocomplete
      id="filter-demo"
      options={topfood}
      getOptionLabel={(option) => option.title}
      filterOptions={filterOptions}
      sx={{ width: 300 }}
      onChange={handleOnChange}
      value={selectedOptions[0] || null}
      renderInput={(params) => <TextField {...params} label="Custom filter" />}
    />
  );
}

interface FilmOptionType {
  title: string;
  year: number;
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const topfood = [
  { title: 'chikenbiryani', year: 1994 },
  { title: 'vegbiryani', year: 1972 },
  { title: 'chiken masala', year: 1974 },
  { title: 'paneer', year: 2008 },
];
