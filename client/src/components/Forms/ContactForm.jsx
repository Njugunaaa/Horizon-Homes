import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_wj1djkp", "template_hiy11zw", form.current, {
        publicKey: "wvfLu7gEvsug5dM3G",
      })
      .then(
        () => {
          Swal.fire({
            title: "Message Sent!",
            text: "Your message has been successfully sent. We will contact you soon.",
            icon: "success",
            confirmButtonText: "OK",
          });

          form.current.reset();
        },
        (error) => {
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong. Please try again later.",
            icon: "error",
            confirmButtonText: "Close",
          });
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div
      className="container py-5"
      style={{ marginTop: "150px", marginBottom: "130px" }}
    >
      <div className="row bg-white shadow rounded p-4">
        {/* Left Side */}
        <div className="col-md-4 d-flex flex-column align-items-center border-end">
          <div className="text-center mb-4">
            <i className="fas fa-map-marker-alt fa-2x text-info-emphasis mb-2"></i>
            <h6>Address</h6>
            <p className="mb-1">Ngong road, La Maison</p>
            <p>Backstreet 54</p>
          </div>
          <div className="text-center mb-4">
            <i className="fas fa-phone-alt text-info-emphasis fa-2x  mb-2"></i>
            <h6>Phone</h6>
            <p className="mb-1">+254700234567</p>
            <p>+254709876543</p>
          </div>
          <div className="text-center">
            <i className="fas fa-envelope fa-2x text-info-emphasis mb-2"></i>
            <h6>Email</h6>
            <p className="mb-1">laMaison@gmail.com</p>
            <p>info.laMaison@gmail.com</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-md-8">
          <h4 className="mb-3 text-info-emphasis">Send us a message</h4>
          <p>
            If you have any questions or would like to get in touch, feel free
            to message us below.
          </p>

          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="user_name"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                name="user_email"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="5"
                placeholder="Your message"
                name="message"
              />
            </div>
            <button type="submit" className="btn btn-primary" value="Send">
              Send Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
