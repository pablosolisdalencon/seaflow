import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useProcedimientos = () => {
    return useQuery({
        queryKey: ['procedimientos'],
        queryFn: async () => {
            const { data } = await api.get('/procedimientos');
            return data;
        }
    });
};
