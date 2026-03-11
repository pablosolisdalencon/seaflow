import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';

export const useCapacitaciones = () => {
    const queryClient = useQueryClient();

    const getAll = useQuery({
        queryKey: ['capacitaciones'],
        queryFn: async () => {
            const { data } = await api.get('/capacitaciones');
            return data;
        }
    });

    const getMatrix = useQuery({
        queryKey: ['capacitaciones-matrix'],
        queryFn: async () => {
            const { data } = await api.get('/capacitaciones/matrix');
            return data;
        }
    });

    const recordAttendance = useMutation({
        mutationFn: async (attendanceData) => {
            const { data } = await api.post('/capacitaciones/asistencia', attendanceData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['capacitaciones-matrix'] });
            queryClient.invalidateQueries({ queryKey: ['capacitaciones'] });
        }
    });

    return { getAll, getMatrix, recordAttendance };
};
