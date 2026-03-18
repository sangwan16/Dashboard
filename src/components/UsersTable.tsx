import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Avatar,
  Stack,
  Fade,
} from '@mui/material';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import {
  fetchAllProfileData,
  fetchProgressData,
} from '../firebase/service';
import type {
  UserInfo,
  MedicalHistory,
  DentalHistory,
  RedFlagHabits,
  ProgressData,
} from '../types';
import MedicalHistoryModal from './MedicalHistoryModal';
import DentalHistoryModal from './DentalHistoryModal';
import RedFlagHabitsModal from './RedFlagHabitsModal';
import ProgressDataModal from './ProgressDataModal';

type ModalType = 'medical' | 'dental' | 'redFlag' | 'progress' | null;

/* ------------- Stat card shown above the table ------------- */
function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        flex: '1 1 0',
        p: 2.5,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'box-shadow 0.25s, transform 0.25s',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Avatar sx={{ bgcolor: color, width: 44, height: 44 }}>{icon}</Avatar>
      <Box>
        <Typography variant="h5" fontWeight={700} lineHeight={1.2}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Paper>
  );
}

/* ------------- DataGrid shared sx ------------- */
const dataGridSx = {
  border: 'none',
  '& .MuiDataGrid-columnHeaders': {
    bgcolor: '#f8fafc',
    borderBottom: '2px solid',
    borderColor: 'divider',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'text.secondary',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
  },
  '& .MuiDataGrid-row': {
    transition: 'background 0.15s',
    '&:hover': { bgcolor: 'rgba(26,115,232,0.04)' },
  },
  '& .MuiDataGrid-cell': {
    borderColor: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: '2px solid',
    borderColor: 'divider',
  },
};

export { dataGridSx };

/* ------------- Main component ------------- */
export default function UsersTable() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory[]>([]);
  const [dentalHistory, setDentalHistory] = useState<DentalHistory[]>([]);
  const [redFlagHabits, setRedFlagHabits] = useState<RedFlagHabits[]>([]);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [profileData, p] = await Promise.all([
          fetchAllProfileData(),
          fetchProgressData(),
        ]);
        setUsers(profileData.users);
        setMedicalHistory(profileData.medicalHistory);
        setDentalHistory(profileData.dentalHistory);
        setRedFlagHabits(profileData.redFlagHabits);
        setProgressData(p);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const openModal = (user: UserInfo, type: ModalType) => {
    setSelectedUser(user);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedUser(null);
  };

  const columns: GridColDef<UserInfo>[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 170,
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: '0.8rem',
              fontWeight: 700,
              bgcolor: 'primary.main',
            }}
          >
            {row.name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Typography variant="body2" fontWeight={600}>
            {row.name}
          </Typography>
        </Stack>
      ),
    },
    { field: 'age', headerName: 'Age', width: 80, headerAlign: 'center', align: 'center' },
    { field: 'sex', headerName: 'Sex', width: 90, headerAlign: 'center', align: 'center' },
    { field: 'city', headerName: 'City', flex: 1, minWidth: 130 },
    {
      field: 'dentalHistory',
      headerName: 'Dental',
      width: 120,
      sortable: false,
      filterable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <Button
          variant="outlined"
          size="small"
          startIcon={<HealthAndSafetyOutlinedIcon sx={{ fontSize: 16 }} />}
          onClick={() => openModal(row, 'dental')}
          sx={{
            borderColor: '#e2e8f0',
            color: 'text.secondary',
            '&:hover': {
              borderColor: 'primary.main',
              color: 'primary.main',
              bgcolor: 'rgba(26,115,232,0.06)',
            },
          }}
        >
          View
        </Button>
      ),
    },
    {
      field: 'medicalHistory',
      headerName: 'Medical',
      width: 120,
      sortable: false,
      filterable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <Button
          variant="outlined"
          size="small"
          startIcon={<MedicalServicesOutlinedIcon sx={{ fontSize: 16 }} />}
          onClick={() => openModal(row, 'medical')}
          sx={{
            borderColor: '#e2e8f0',
            color: 'text.secondary',
            '&:hover': {
              borderColor: 'primary.main',
              color: 'primary.main',
              bgcolor: 'rgba(26,115,232,0.06)',
            },
          }}
        >
          View
        </Button>
      ),
    },
    {
      field: 'redFlagHabits',
      headerName: 'Red Flags',
      width: 130,
      sortable: false,
      filterable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <Button
          variant="outlined"
          size="small"
          color="error"
          startIcon={<WarningAmberRoundedIcon sx={{ fontSize: 16 }} />}
          onClick={() => openModal(row, 'redFlag')}
          sx={{
            '&:hover': { bgcolor: 'rgba(239,68,68,0.06)' },
          }}
        >
          View
        </Button>
      ),
    },
    {
      field: 'progressData',
      headerName: 'Progress',
      width: 130,
      sortable: false,
      filterable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <Button
          variant="outlined"
          size="small"
          color="success"
          startIcon={<TrendingUpRoundedIcon sx={{ fontSize: 16 }} />}
          onClick={() => openModal(row, 'progress')}
          sx={{
            '&:hover': { bgcolor: 'rgba(16,185,129,0.06)' },
          }}
        >
          View
        </Button>
      ),
    },
  ];

  /* ---- Loading state ---- */
  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap={2}
      >
        <CircularProgress size={48} thickness={4} />
        <Typography variant="body2" color="text.secondary">
          Loading dashboard…
        </Typography>
      </Box>
    );
  }

  /* ---- Error state ---- */
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        px={3}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ maxWidth: 500, width: '100%', borderRadius: 3 }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  const selectedUid = selectedUser?.uid;

  return (
    <Fade in timeout={500}>
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              background: 'linear-gradient(135deg, #1a73e8 0%, #7c4dff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 0.5,
            }}
          >
            Users Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage patient profiles, history, and progress tracking
          </Typography>
        </Box>

        {/* Stat cards */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <StatCard
            label="Total Patients"
            value={users.length}
            icon={<PeopleAltRoundedIcon fontSize="small" />}
            color="rgba(26,115,232,0.12)"
          />
          <StatCard
            label="Medical Records"
            value={medicalHistory.length}
            icon={<MedicalServicesOutlinedIcon fontSize="small" />}
            color="rgba(124,77,255,0.12)"
          />
          <StatCard
            label="Red Flags"
            value={redFlagHabits.length}
            icon={<WarningAmberRoundedIcon fontSize="small" />}
            color="rgba(239,68,68,0.12)"
          />
          <StatCard
            label="Progress Entries"
            value={progressData.length}
            icon={<TrendingUpRoundedIcon fontSize="small" />}
            color="rgba(16,185,129,0.12)"
          />
        </Stack>

        {/* Data table */}
        <Paper
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            transition: 'box-shadow 0.3s',
            '&:hover': { boxShadow: '0 8px 30px rgba(0,0,0,0.06)' },
          }}
        >
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={users}
              columns={columns}
              getRowId={(row) => row.uid}
              pageSizeOptions={[10, 25, 50]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              disableRowSelectionOnClick
              rowHeight={56}
              sx={dataGridSx}
            />
          </Box>
        </Paper>

        {/* Modals */}
        {selectedUser && (
          <>
            <DentalHistoryModal
              open={activeModal === 'dental'}
              onClose={closeModal}
              data={dentalHistory.filter((d) => d.uid === selectedUid)}
              userName={selectedUser.name}
            />
            <MedicalHistoryModal
              open={activeModal === 'medical'}
              onClose={closeModal}
              data={medicalHistory.filter((m) => m.uid === selectedUid)}
              userName={selectedUser.name}
            />
            <RedFlagHabitsModal
              open={activeModal === 'redFlag'}
              onClose={closeModal}
              data={redFlagHabits.filter((r) => r.uid === selectedUid)}
              userName={selectedUser.name}
            />
            <ProgressDataModal
              open={activeModal === 'progress'}
              onClose={closeModal}
              data={progressData.filter((p) => p.uid === selectedUid)}
              userName={selectedUser.name}
            />
          </>
        )}
      </Box>
    </Fade>
  );
}
