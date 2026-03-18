import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  Link,
  Box,
  Typography,
  Slide,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import type { ProgressData } from '../types';
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
  data: ProgressData[];
  userName: string;
}

const gradeColor: Record<string, 'error' | 'warning' | 'success'> = {
  low: 'error',
  moderate: 'warning',
  high: 'success',
};

const columns: GridColDef[] = [
  { field: 'score', headerName: 'Score', width: 80, headerAlign: 'center', align: 'center' },
  {
    field: 'grade',
    headerName: 'Grade',
    width: 110,
    renderCell: ({ value }) =>
      value ? (
        <Chip
          label={String(value).charAt(0).toUpperCase() + String(value).slice(1)}
          color={gradeColor[value as string] ?? 'default'}
          size="small"
          variant="outlined"
        />
      ) : (
        <Typography variant="body2" color="text.disabled">—</Typography>
      ),
  },
  {
    field: 'iurl',
    headerName: 'Image',
    width: 120,
    renderCell: ({ value }) =>
      value ? (
        <Link
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ fontWeight: 600, fontSize: '0.8rem' }}
        >
          View Image
        </Link>
      ) : (
        <Typography variant="body2" color="text.disabled">—</Typography>
      ),
  },
  {
    field: 'flossing',
    headerName: 'Flossing',
    width: 100,
    renderCell: ({ value }) => (
      <Chip
        label={value ? 'Yes' : 'No'}
        color={value ? 'success' : 'default'}
        size="small"
        variant="outlined"
      />
    ),
  },
  {
    field: 'brushing',
    headerName: 'Brushing',
    width: 100,
    renderCell: ({ value }) => (
      <Chip
        label={value ? String(value).charAt(0).toUpperCase() + String(value).slice(1) : '—'}
        color={value === 'twice' ? 'success' : value === 'once' ? 'warning' : 'default'}
        size="small"
        variant="outlined"
      />
    ),
  },
  {
    field: 'mouthwash',
    headerName: 'Mouthwash',
    width: 110,
    renderCell: ({ value }) => (
      <Chip
        label={value ? 'Yes' : 'No'}
        color={value ? 'success' : 'default'}
        size="small"
        variant="outlined"
      />
    ),
  },
  { field: 'year', headerName: 'Year', width: 70, headerAlign: 'center', align: 'center' },
  { field: 'month', headerName: 'Month', width: 70, headerAlign: 'center', align: 'center' },
  { field: 'week', headerName: 'Week', width: 70, headerAlign: 'center', align: 'center' },
  { field: 'day', headerName: 'Day', width: 70, headerAlign: 'center', align: 'center' },
  { field: 'createdAt', headerName: 'Created', flex: 1, minWidth: 140 },
];

export default function ProgressDataModal({
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
      <Box sx={{ height: 4, background: 'linear-gradient(90deg, #10b981 0%, #1a73e8 100%)' }} />
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <TrendingUpRoundedIcon color="success" />
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight={700} lineHeight={1.3}>
            Progress Data
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
            getRowId={(row) => `${row.year}_${row.month}_${row.week}_${row.day}`}
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
