import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useNormativas = () => {
    const getAll = useQuery({
        queryKey: ['normas'],
        queryFn: async () => {
            const { data } = await api.get('/normas');
            return data;
        }
    });

    return { getAll };
};

// Legacy support for NormaList.jsx
export const useNormas = () => {
    return useQuery({
        queryKey: ['normas'],
        queryFn: async () => {
            const { data } = await api.get('/normas');
            return data;
        }
    });
};

export const useNormativa = (id) => {
    return useQuery({
        queryKey: ['normas', id],
        queryFn: async () => {
            const { data } = await api.get(`/normas/${id}`);
            return data;
        },
        enabled: !!id
    });
};
