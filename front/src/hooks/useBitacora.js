import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

export const useBitacora = () => {
  const queryClient = useQueryClient();

  const getCartas = useQuery({
    queryKey: ['bitacora-cartas'],
    queryFn: async () => {
      const { data } = await api.get('/bitacora/cartas', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return data;
    }
  });

  const getAll = useQuery({
    queryKey: ['bitacora-actualizaciones'],
    queryFn: async () => {
      const { data } = await api.get('/bitacora/actualizaciones', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return data;
    }
  });

  const getActividades = useQuery({
    queryKey: ['bitacora-actividades'],
    queryFn: async () => {
      const { data } = await api.get('/bitacora/actividades', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return data;
    }
  });

  const createCarta = useMutation({
    mutationFn: async (newCarta) => {
      const { data } = await api.post('/bitacora/cartas', newCarta, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bitacora-cartas']);
    }
  });

  const createActividad = useMutation({
    mutationFn: async (newAct) => {
      const { data } = await api.post('/bitacora/actividades', newAct, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bitacora-actividades']);
    }
  });

  return { getCartas, getActividades, createCarta, createActividad };
};
