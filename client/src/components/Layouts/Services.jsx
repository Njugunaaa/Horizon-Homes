import 'animate.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Services = () => {
  const serviceList = [
    { title: 'Buy a Home', description: 'Find your dream home from our listings.', icon: 'fas fa-home' },
    { title: 'Rent a Property', description: 'Browse top-rated rentals in prime locations.', icon: 'fas fa-key' },
    { title: 'Sell Your Property', description: 'List and sell your property easily and quickly.', icon: 'fas fa-dollar-sign' }
  ];

  return (
    <section className="py-5 pt-5" style={{ marginTop: '120px' }} id="services">
      <div className="container text-center">
        <h2 className="fw-bold mb-5 animate__animated animate__fadeInDown">Our Main Focus</h2>
        <div className="row">
          {serviceList.map((service, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="p-4 bg-white rounded shadow-lg h-100 animate__animated animate__fadeInUp">
                <i className={`${service.icon} fa-2x mb-3 `}></i>
                <h4 className="fw-bold">{service.title}</h4>
                <p className="text-muted">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
