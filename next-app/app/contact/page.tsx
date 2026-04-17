export default function ContactPage() {
  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-12">
          <nav className="breadcrumb bg-light mb-30">
            <a className="breadcrumb-item text-dark" href="/">Home</a>
            <span className="breadcrumb-item active">Contact</span>
          </nav>
        </div>
      </div>
      <div className="row px-xl-5">
        <div className="col-lg-7 mb-5">
          <div className="bg-light p-30 mb-30">
            <form>
              <div className="control-group mb-3">
                <input type="text" className="form-control" placeholder="Your Name" />
              </div>
              <div className="control-group mb-3">
                <input type="email" className="form-control" placeholder="Your Email" />
              </div>
              <div className="control-group mb-3">
                <input type="text" className="form-control" placeholder="Subject" />
              </div>
              <div className="control-group mb-3">
                <textarea className="form-control" rows={8} placeholder="Message"></textarea>
              </div>
              <div>
                <button className="btn btn-primary py-2 px-4" type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-5 mb-5">
          <div className="bg-light p-30 mb-30">
            <iframe
              style={{ width: "100%", height: 315 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
              frameBorder="0"
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            ></iframe>
          </div>
          <div className="bg-light p-30 mb-3">
            <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New York, USA</p>
            <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>info@example.com</p>
            <p className="mb-2"><i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890</p>
          </div>
        </div>
      </div>
    </div>
  );
}
