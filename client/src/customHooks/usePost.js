import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; 

const usePost = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const postData = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });
      setResponse(res.data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your property has been saved successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      return res.data;
    } catch (err) {
      setError(err.message || "Something went wrong");

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Something went wrong!",
      });

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, response };
};

export default usePost;
