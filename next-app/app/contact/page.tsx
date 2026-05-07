export default function ContactPage() {
  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-12">
          <nav className="breadcrumb bg-light mb-30">
            <a className="breadcrumb-item text-dark" href="/">
              Home
            </a>
            <span className="breadcrumb-item active">Contact</span>
          </nav>
        </div>
      </div>
      <div className="row px-xl-5">
        {/* <div className="col-lg-7 mb-5">
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
        </div> */}
        <div className="col-lg-12 mb-12">
          <div className="bg-light p-30 mb-30">
            <iframe
              style={{ width: "100%", height: 315 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.123456789012!2d75.7128804!3d26.9093132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4b81dfbd4d93%3A0xb62fc54901c0232b!2sRangoli%20Gardens!5e0!3m2!1sen!2sin!4v1603794290143!5m2!1sen!2sin"
              frameBorder="0"
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            ></iframe>
          </div>
          <div className="bg-light p-30 mb-3">
            <p className="mb-2">
              <i className="fa fa-map-marker-alt text-primary mr-3"></i>Rangoli
              Garden, Jaipur, Rajasthan, India
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope text-primary mr-3"></i>
              mokomint.official@gmail.com
            </p>
            <p className="mb-2">
              <i className="fa fa-phone-alt text-primary mr-3"></i>+91 92512
              64027
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
