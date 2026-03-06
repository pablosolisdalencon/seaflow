import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';

export const useInfas = () => {
    const queryClient = useQueryClient();

    const getAll = useQuery({
        queryKey: ['infas'],
        queryFn: async () => {
            const { data } = await api.get('/infas');
            return data;
        }
    });

    const create = useMutation({
        mutationFn: async (newItem) => {
            const { data } = await api.post('/infas', newItem);
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries(['infas'])
    });

    return { getAll, create };
};
