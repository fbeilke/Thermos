import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [blogName, setBlogName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validators = {}
    if (!email.length) validators.email = "Email is required"
    if (email && !email.includes('@')) validators.email = "Must be a valid email"
    if (!blogName.length) validators.blogName = "Blog name is required"
    if (blogName.length > 100) validators.blogName = "Blog name can be maximum of 100 characters long"
    if (!password.length) validators.password = "Password is required"
    if (!confirmPassword.length) validators.confirmPassword = "Password confirmation is required"
    if (password !== confirmPassword) validators.confirmPassword = "Confirm Password field must be the same as the Password field"
    if (!image) validators.image = "A profile picture is required"



    if (Object.keys(validators).length === 0) {
      const formData = new FormData();

      formData.append("email", email);
      formData.append("blog_name", blogName);
      formData.append("password", password);
      formData.append("profile_picture_url", image)

      setImageLoading(true);

      const serverResponse = await dispatch(thunkSignup(formData));

      if (serverResponse) {
        setErrors(serverResponse);
        setImageLoading(false);
      } else {
        closeModal();
      }
    } else {
      setErrors(validators);
    }

  };

  return (
    <div className='signup-form-container'>
      <h1 className='signup-label'>Sign Up</h1>
      {errors.server && <p className='errors'>{errors.server}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className='signup-form'>
        <div className='signup-containers'>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='signup-inputs'
          />
          <div className="floating-placeholders" style={ email ? { top: "-18px" } : null }>
            <label>Email</label>
          </div>
          <div className='signup-errors-container'>
            {errors.email && <p className='errors'>{errors.email}</p>}
          </div>
        </div>
        <div className='signup-containers'>
          <input
            type="text"
            value={blogName}
            onChange={(e) => setBlogName(e.target.value)}
            className='signup-inputs'
          />
          <div className="floating-placeholders" style={ blogName ? { top: "-10.5px" } : null }>
            <label>Blog Name</label>
          </div>
          <div className='signup-errors-container'>
            {errors.blogName && <p className='errors'>{errors.blogName}</p>}
          </div>
        </div>
        <div className='signup-containers'>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='signup-inputs'
          />
          <div className="floating-placeholders" style={ password ? { top: "-10.5px" } : null }>
            <label>Password</label>
          </div>
          <div className='signup-errors-container'>
            {errors.password && <p className='errors'>{errors.password}</p>}
          </div>
        </div>
        <div className='signup-containers'>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='signup-inputs'
          />
          <div className="floating-placeholders" style={ confirmPassword ? { top: "-10.5px" } : null }>
            <label>Confirm Password</label>
          </div>
          <div className='signup-errors-container'>
            {errors.confirmPassword && <p className='errors'>{errors.confirmPassword}</p>}
          </div>
        </div>
        <div className='add-image-signup-container'>
          <label className='add-image-signup-label'>
            <p className='hacky-gap'/>
            Add an image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className='add-image-signup-input'
            />
          </label>
          <div className='image-signup-errors-container'>
            {errors.image && <p className='errors'>{errors.image}</p>}
          </div>
        </div>
        <button className='signup-button' type="submit">Sign Up</button>
        <div className='image-loading-message-container'>
          {imageLoading && <p>Loading...</p>}
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
