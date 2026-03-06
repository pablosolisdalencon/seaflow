import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useBitacora = () => {
    const getAll = useQuery({
        queryKey: ['bitacora'],
        queryFn: async () => {
            const { data } = await api.get('/bitacora');
            return data;
        }
    });

    return { getAll };
};
