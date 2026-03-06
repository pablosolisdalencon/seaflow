import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';

export const useNotificaciones = () => {
    const queryClient = useQueryClient();

    const getAll = useQuery({
        queryKey: ['notificaciones'],
        queryFn: async () => {
            const { data } = await api.get('/notificaciones');
            return data;
        }
    });

    const markAsRead = useMutation({
        mutationFn: async (id) => {
            const { data } = await api.put(`/notificaciones/${id}/read`);
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries(['notificaciones'])
    });

    return { getAll, markAsRead };
};
