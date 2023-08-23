import default_img from "../components/assets/images/noimagedefault.jpg";
export const ImgService = ({ src, fallbackSrc, alt, ...props }) => {
  const handleError = (event) => {
    fallbackSrc && (event.target.src = default_img);
  };

  return <img src={src} onError={handleError} alt={alt} {...props} />;
};
