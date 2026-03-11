import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useDashboard = () => {
    const getKPIData = useQuery({
        queryKey: ['dashboard-kpis'],
        queryFn: async () => {
            const { data } = await api.get('/reportes/dashboard-kpis');
            return data;
        }
    });

    return { getKPIData };
};
