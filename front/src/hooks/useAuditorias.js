import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';

export const useAuditorias = () => {
    const queryClient = useQueryClient();

    const getAll = useQuery({
        queryKey: ['auditorias'],
        queryFn: async () => {
            const { data } = await api.get('/auditorias');
            return data;
        }
    });

    const createHallazgo = useMutation({
        mutationFn: async ({ auditoriaId, ...body }) => {
            const { data } = await api.post(`/auditorias/${auditoriaId}/hallazgos`, body);
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries(['auditorias'])
    });

    return { getAll, createHallazgo };
};

export const useReportes = () => {
    const queryClient = useQueryClient();

    const getAll = useQuery({
        queryKey: ['reportes'],
        queryFn: async () => {
            const { data } = await api.get('/reportes');
            return data;
        }
    });

    const updateStatus = useMutation({
        mutationFn: async ({ id, status }) => {
            const { data } = await api.put(`/reportes/${id}/status`, { status });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries(['reportes'])
    });

    return { getAll, updateStatus };
};
