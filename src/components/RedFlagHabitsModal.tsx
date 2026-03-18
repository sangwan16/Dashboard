import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  Box,
  Typography,
  Slide,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import type { RedFlagHabits } from '../types';
import { dataGridSx } from './UsersTable';
import { forwardRef } from 'react';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  onClose: () => void;
  data: RedFlagHabits[];
  userName: string;
}

const columns: GridColDef[] = [
  {
    field: 'smoking',
    headerName: 'Smoking',
    flex: 1,
    minWidth: 100,
    renderCell: ({ value }) => (
      <Chip
        label={value ? 'Yes' : 'No'}
        color={value ? 'error' : 'success'}
        size="small"
        variant="outlined"
      />
    ),
  },
  {
    field: 'vapping',
    headerName: 'Vaping',
    flex: 1,
    minWidth: 100,
    renderCell: ({ value }) => (
      <Chip
        label={value ? 'Yes' : 'No'}
        color={value ? 'error' : 'success'}
        size="small"
        variant="outlined"
      />
    ),
  },
  {
    field: 'chewTobacco',
    headerName: 'Chew Tobacco',
    flex: 1,
    minWidth: 120,
    renderCell: ({ value }) => (
      <Chip
        label={value ? 'Yes' : 'No'}
        color={value ? 'error' : 'success'}
        size="small"
        variant="outlined"
      />
    ),
  },
  {
    field: 'alcohol',
    headerName: 'Alcohol',
    flex: 1,
    minWidth: 100,
    renderCell: ({ value }) => (
      <Chip
        label={value ? 'Yes' : 'No'}
        color={value ? 'error' : 'success'}
        size="small"
        variant="outlined"
      />
    ),
  },
  {
    field: 'others',
    headerName: 'Others',
    flex: 1.5,
    minWidth: 160,
    renderCell: ({ value }) => {
      if (!value) return <Typography variant="body2" color="text.disabled">—</Typography>;
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed.join(', ') : String(value);
      } catch {
        return String(value);
      }
    },
  },
  { field: 'createdAt', headerName: 'Created', flex: 1, minWidth: 140 },
  { field: 'updatedAt', headerName: 'Updated', flex: 1, minWidth: 140 },
];

export default function RedFlagHabitsModal({
  open,
  onClose,
  data,
  userName,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      TransitionComponent={Transition}
    >
      <Box sx={{ height: 4, background: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 100%)' }} />
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <WarningAmberRoundedIcon color="error" />
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight={700} lineHeight={1.3}>
            Red Flag Habits
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {userName}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            bgcolor: 'action.hover',
            '&:hover': { bgcolor: 'error.main', color: '#fff' },
            transition: 'all 0.2s',
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 3, pb: 3 }}>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.uid}
            pageSizeOptions={[5, 10]}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            disableRowSelectionOnClick
            rowHeight={52}
            sx={dataGridSx}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
