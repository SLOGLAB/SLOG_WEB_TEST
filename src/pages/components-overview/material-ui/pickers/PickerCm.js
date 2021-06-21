import { useState } from 'react';
import isWeekend from 'date-fns/isWeekend';
// material
import { TextField, Stack } from '@material-ui/core';
import { DatePicker, StaticDatePicker, MobileDatePicker, DesktopDatePicker } from '@material-ui/lab';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

export default function PickerDate() {
  const [value, setValue] = useState(new Date());

  return (
    <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} style={{ marginTop: '65px' }}>
      <Stack spacing={3} sx={{ width: '70%' }}>
        <MobileDatePicker
          orientation="portrait"
          label="For mobile"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField fullWidth {...params} margin="normal" />}
        />
      </Stack>
    </Stack>
  );
}
