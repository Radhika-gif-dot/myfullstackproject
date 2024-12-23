const Avatar = ({ src, alt, fallback }) => {
    return (
      <div className="relative">
        <img
          src={src}
          // alt={alt}
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
        />
        {!src && (
          <span className="absolute inset-0 flex items-center justify-center text-white bg-gray-500 rounded-full">
            {console.log(alt)}
            {fallback || alt?.charAt(0)}
          </span>
        )}
      </div>
    );
  };
  
  export default Avatar;
  