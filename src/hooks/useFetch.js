import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, query) => {
    //fetching,error,loading
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const abortController = new AbortController();
        (
            async () => {
                setError(null);
                setLoading(true);
                try {
                    const response = await axios.get(url, {
                        signal: abortController.signal
                    }
                    );
                    setData(response.data);
                } catch (error) {
                    if (axios.isCancel(error)) {
                        console.log("cancelled")
                    } else {
                        setError(error.message)
                    }
                }
                setLoading(false);
            }
        )()
        return () => {
            abortController.abort();
        }
    }, [query]);

    return [data, error, loading];

}
export default useFetch;