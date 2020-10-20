import React, {useState, useEffect} from "react";
import {axiosInstance} from "../../utils/metricsUtils";
import './../../metrics.css';

const DEV_SVR = "https://dev.dummy-svr.com";
const PROD_SVR = "https://prod.dummy-svr.com";
const METRIC_ENDPOINT = "/metrics";

/* generate the query for API request */
function genQuery(timeRange, componentName, seed) {
    return `SELECT ${timeRange} WHERE c = ${componentName} AND x = ${(seed % 7) === 0 ? "true" : "false"}`;
}

/* Custom hook component to send API request and handle response */
function useFetch(props) {    
    const [data, setData] = useState();               // set the API response data
    const [error, setError] = useState(false);          // show error message if API response is error
    const [loading, setLoading] = useState(true);       // show loading text on page load

    /* get the URL on basis of env variable set for prod or dev */
    function getURL() {
        const svr = process.env.NODE_ENV === "production" ? PROD_SVR : DEV_SVR;
        return `${svr}${METRIC_ENDPOINT}`;
    }

    useEffect(() => {
        setInterval(() => {     // interval to fetch record every refresh time. setInterval need to be cleared
            let query = genQuery(props.timeRange, props.componentName, props.seed);
            let url = getURL();

            axiosInstance.post(url, query)
            .then(response => {
                setData(response);  // set the response data
                setLoading(false);  // stop the loading
            })
            .catch(axiosError => {
                setLoading(false);  // stop the loading
                setError(axiosError);

                // Error handling of POST API response
                if (error.response) {
                    console.log('Error in response: ', axiosError.response.status);   // 5xx, 4xx error
                } else if (error.request) {
                    console.log('Error in network: ', axiosError.request);
                } else {
                    console.log('Error: ', axiosError.message);
                }
            })
        }, props.refreshInterval_Secs);
    }, []);

    return {
        loading,
        data,
        error
    }
}

/* function to return the loading page */
function Loading() {
    return <h2>Loading...</h2>;
}

/* function to return the Error occurred page after API call */
function ErrorOccurred() {
    return <h2>Error occurred</h2>;
}

/* Render the component by calling custom hook */
export function Metrics(props) {
  const component = useFetch(props);    // custom hook to fetch data from POST api

  return (
    <div className="App">
        {component.loading && 
            Loading()
        }
        {component.error && 
            ErrorOccurred()
        }
        {component.data && 
            <>Hi {component.data}</>
        }
    </div>
  );
}
