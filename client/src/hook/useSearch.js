import { useEffect, useState } from "react";
import axios from "axios";

const useSearch = (path) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:8800/api${path}`);
                setData(res.data);
            } catch (err) {
                setError(err);
<<<<<<< HEAD

=======
>>>>>>> 821a03b64d5427b912eb582fb6284bb6074c939e
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:8800/api${path}`);
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
};

export default useSearch;