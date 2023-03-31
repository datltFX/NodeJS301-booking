import "./contact.css";

const Contact = () => {
  return (
    <div className="contact">
      <h1>Save time, save money!</h1>
      <span>Sign up and we'll send the best deals to you</span>
      <div className="contactInputContainer">
        <input type="text" placeholder="Your Email" />
        <button>Subcribe</button>
      </div>
    </div>
  );
};

export default Contact;
