import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const usePermisologia = () => {
    const getAll = useQuery({
        queryKey: ['permisologia-tierra'],
        queryFn: async () => {
            const { data } = await api.get('/permisologia/tierra');
            return data;
        }
    });

    return { getAll };
};

export const useConcesionesAcuicultura = () => {
    return useQuery({
        queryKey: ['concesiones-acuicultura'],
        queryFn: async () => {
            const { data } = await api.get('/concesiones/acuicultura');
            return data;
        }
    });
};

export const useConcesionesMaritima = () => {
    return useQuery({
        queryKey: ['concesiones-maritima'],
        queryFn: async () => {
            const { data } = await api.get('/concesiones/maritima');
            return data;
        }
    });
};
