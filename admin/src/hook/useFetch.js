import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const useFetch = (path) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate()
 

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:8800/api${path}`, {
                    credentials: 'include',
                    withCredentials: true
                });
                setData(res.data);
            } catch (err) {
                navigate("/404");
            }
            setLoading(false);
        };
        fetchData();
    }, [path]);

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:8800/api${path}`, {
                credentials: 'include',
                withCredentials: true
            });
            setData(res.data);
        } catch (err) {
            navigate("/404");
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
};

export default useFetch;